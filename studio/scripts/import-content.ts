/**
 * One-time import of the website's current content into Sanity.
 *
 *   npx sanity exec scripts/import-content.ts              # import
 *   npx sanity exec scripts/import-content.ts -- --dry-run # preview only, writes nothing
 *
 * Needs SANITY_API_WRITE_TOKEN (an Editor token) in the website's .env.local.
 * Safe to re-run: existing documents are never overwritten or duplicated.
 */
import {readFileSync, existsSync} from 'node:fs'
import {resolve} from 'node:path'
import {createClient, type SanityClient} from '@sanity/client'
import {LexoRank} from 'lexorank'

import {site} from '../../data/site'
import {socialLinks} from '../../data/socials'
import {services} from '../../data/services'
import {homeFaqs} from '../../data/faq'
import {studyFaqs} from '../../data/study-abroad'
import {founder} from '../../data/founder'
import {galleryFrames} from '../../data/gallery'
import {mbbsDestinations} from '../../data/mbbs-destinations'
import {aboutHero} from '../../data/about'
import {destinationFaqs} from '../../data/destinations'
import {privacyPolicy} from '../../data/privacy'

const DRY_RUN = process.argv.includes('--dry-run')

function readEnvToken() {
  if (process.env.SANITY_API_WRITE_TOKEN) return process.env.SANITY_API_WRITE_TOKEN
  // Run from the studio/ folder; the token lives in the website’s .env.local one level up.
  const envFile = resolve(process.cwd(), '..', '.env.local')
  if (!existsSync(envFile)) return undefined
  const line = readFileSync(envFile, 'utf8')
    .split(/\r?\n/)
    .find((entry) => entry.startsWith('SANITY_API_WRITE_TOKEN='))
  return line?.slice('SANITY_API_WRITE_TOKEN='.length).trim().replace(/^["']|["']$/g, '')
}

const token = readEnvToken()
if (!token && !DRY_RUN) {
  console.error('Missing SANITY_API_WRITE_TOKEN. Add it to the website’s .env.local (see the setup guide), or use --dry-run.')
  process.exit(1)
}

const client: SanityClient = createClient({
  projectId: 'n2374y3w',
  dataset: 'production',
  apiVersion: '2026-02-01',
  token,
  useCdn: false,
})

// ── Helpers ──────────────────────────────────────────────────────────────────

let keyCounter = 0
const key = () => `k${(keyCounter++).toString(36).padStart(6, '0')}`
const withKeys = <T extends object>(items: T[]) => items.map((item) => ({_key: key(), ...item}))
const faqs = (items: {q: string; a: string}[]) => withKeys(items.map(({q, a}) => ({_type: 'faqItem', question: q, answer: a})))
const seo = (title: string, description: string) => ({_type: 'seo', title, description})

const uploaded = new Map<string, string>()
async function image(url: string, label: string) {
  if (DRY_RUN) return {_type: 'image', asset: {_type: 'reference', _ref: `image-dry-run-${label}`}}
  let assetId = uploaded.get(url)
  if (!assetId) {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Could not download ${label} (${response.status}): ${url}`)
    const asset = await client.assets.upload('image', Buffer.from(await response.arrayBuffer()), {
      filename: `${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`,
    })
    assetId = asset._id
    uploaded.set(url, assetId)
    console.log(`  ↑ uploaded photo: ${label}`)
  }
  return {_type: 'image', asset: {_type: 'reference', _ref: assetId}}
}

/** LexoRank values used by the drag-to-reorder lists. */
function ranks(count: number) {
  let rank = LexoRank.min()
  return Array.from({length: count}, () => (rank = rank.genNext().genNext()).toString())
}

const summary: string[] = []

async function createSingleton(doc: {_id: string; _type: string; [field: string]: unknown}) {
  if (DRY_RUN) {
    summary.push(`would create ${doc._type} (${doc._id})`)
    return
  }
  const exists = await client.fetch<boolean>('defined(*[_id == $id][0]._id)', {id: doc._id})
  if (exists) {
    summary.push(`kept existing ${doc._id}`)
    return
  }
  await client.createIfNotExists(doc)
  summary.push(`created ${doc._id}`)
}

async function hasAny(type: string) {
  if (DRY_RUN) return false
  return (await client.fetch<number>('count(*[_type == $type])', {type})) > 0
}

// ── Content ──────────────────────────────────────────────────────────────────

async function run() {
  console.log(DRY_RUN ? 'Dry run — nothing will be written.\n' : 'Importing current website content into Sanity…\n')

  await createSingleton({
    _id: 'siteSettings',
    _type: 'siteSettings',
    phones: site.phones.map((phone) => phone.label),
    whatsapp: site.phone,
    emails: site.emails,
    tagline: site.tagline,
    offices: withKeys(site.offices.map((office) => ({_type: 'office', city: office.city, state: office.region}))),
    openingHours: 'Mon–Sat, 9:30–6:30',
    socialLinks: withKeys(
      socialLinks.map((link) => ({_type: 'socialLink', platform: link.id, handle: link.label, url: link.href, description: link.description})),
    ),
  })

  // Logo: added to Company details only if none has been uploaded yet.
  const hasLogo = DRY_RUN ? false : await client.fetch<boolean>('defined(*[_id == "siteSettings"][0].logo.asset)')
  if (hasLogo) summary.push('kept existing logo')
  else if (DRY_RUN) summary.push('would upload the logo')
  else {
    const file = readFileSync(resolve(process.cwd(), '..', 'assets', 'brand', 'logo-emblem.png'))
    const asset = await client.assets.upload('image', file, {filename: 'skandiora-logo-emblem.png'})
    await client.patch('siteSettings').set({logo: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}}).commit()
    summary.push('uploaded the logo to Company details')
  }

  await createSingleton({
    _id: 'homePage',
    _type: 'homePage',
    heroTitle: 'Your future deserves the right decision.',
    heroText:
      'We start by understanding your academic background, ambitions, budget and eligibility — then guide you toward the destination, course and pathway that truly fits you.',
    showStats: true,
    stats: withKeys([
      {_type: 'stat', value: '20+', label: 'Destinations explored'},
      {_type: 'stat', value: '4', label: 'South Indian states'},
      {_type: 'stat', value: '100%', label: 'Recognised institutions'},
    ]),
    testimonialsNote: 'Design preview — the names and feedback below are placeholders, not real testimonials.',
    faqs: faqs(homeFaqs),
    seo: seo(
      'Study Abroad, MBBS & Visa Consultants in Kochi, Trivandrum & Chennai',
      'Study abroad, MBBS abroad, admissions, credit transfer and visa guidance from Skandiora Immigration in Kochi, Trivandrum and Chennai. Free assessment.',
    ),
  })

  await createSingleton({
    _id: 'aboutPage',
    _type: 'aboutPage',
    heroTitle: aboutHero.title,
    heroStatement: aboutHero.statement,
    heroText: aboutHero.body,
    seo: seo(
      'About Us — Our Approach to Education Guidance',
      'Skandiora Immigration offers student-first education guidance for study in India and abroad. Meet our founder and discover how we help families choose a course, institution and country — from Kochi, Trivandrum and Chennai.',
    ),
  })

  await createSingleton({
    _id: 'servicesPage',
    _type: 'servicesPage',
    heroEyebrow: 'What we do',
    heroTitle: 'Five services, one accountable team',
    heroText:
      'Every case is handled by a named counsellor who owns your file from first call to final approval — no handoffs, no surprise fees.',
    seo: seo(
      'Education Guidance Services',
      "Explore Skandiora Immigration's services in Kochi, Trivandrum and Chennai: study abroad, MBBS, domestic admissions, credit transfer, attestation and visa guidance.",
    ),
  })

  await createSingleton({
    _id: 'destinationsPage',
    _type: 'destinationsPage',
    heroEyebrow: 'Your global education journey starts here',
    heroTitle: 'Dream big. Explore more. Choose wisely.',
    heroText:
      'Your destination should match your goals — not simply be a popular choice. Explore education opportunities across leading international destinations and discover pathways that may suit your academic profile and career aspirations.',
    faqs: faqs(destinationFaqs),
    seo: seo(
      'Study Destinations Worldwide',
      "Explore study-abroad destinations with Skandiora Immigration's counsellors in Kochi, Trivandrum and Chennai — options matched to your profile, interests and budget.",
    ),
  })

  await createSingleton({
    _id: 'privacyPage',
    _type: 'privacyPage',
    heroTitle: privacyPolicy.title,
    lastUpdated: privacyPolicy.lastUpdatedIso,
    sections: withKeys(privacyPolicy.sections.map((section) => ({_type: 'policySection', heading: section.heading, paragraphs: section.body}))),
    seo: seo(
      'Privacy Policy',
      'How Skandiora Immigration handles your information: the website stores nothing, and enquiry forms simply open WhatsApp with your message pre-filled.',
    ),
  })

  await createSingleton({
    _id: 'founder',
    _type: 'founder',
    // The current portrait is a stock placeholder, so no photo is imported: upload the real one in the Studio.
    name: founder.name,
    role: founder.role,
    headline: founder.headline,
    bio: founder.bio,
    credentials: withKeys(founder.credentials.map((item) => ({_type: 'credential', label: item.label, detail: item.detail}))),
    signoff: founder.signoff,
    education: withKeys(founder.education.map((item) => ({_type: 'school', name: item.name, location: item.location}))),
  })

  // Services: matched by page address so re-running never duplicates them.
  for (const service of services) {
    const existing = DRY_RUN ? null : await client.fetch<string | null>('*[_type == "service" && slug.current == $slug][0]._id', {slug: service.slug})
    if (existing) {
      summary.push(`kept existing service ${service.slug}`)
      continue
    }
    const doc = {
      _type: 'service',
      name: service.navTitle,
      slug: {_type: 'slug', current: service.slug},
      cardText: service.cardBody,
      eyebrow: service.eyebrow,
      headlineLines: service.headlineLines,
      summary: service.summary,
      intro: service.intro,
      closingHeadline: service.closingHeadline,
      closingText: service.closingBody,
      faqs: faqs(service.slug === 'study-abroad' ? studyFaqs : service.faqs),
      seo: seo(service.metaTitle, service.metaDescription),
    }
    if (DRY_RUN) summary.push(`would create service ${service.slug}`)
    else {
      await client.create(doc)
      summary.push(`created service ${service.slug}`)
    }
  }

  // Lists: only imported when empty, so re-running never duplicates entries.
  if (await hasAny('testimonial')) summary.push('kept existing testimonials')
  else {
    const samples = [
      {name: 'Sample profile 01', service: 'Study abroad guidance', quote: 'Having someone explain the course and destination options clearly made the next step feel easier to understand.'},
      {name: 'Sample profile 02', service: 'Domestic admissions', quote: 'We appreciated a conversation that considered the course, location and budget together, with room to ask our questions.'},
      {name: 'Sample profile 03', service: 'MBBS abroad guidance', quote: 'It helped to discuss the different study pathways and understand what we should check before choosing a university.'},
      {name: 'Sample profile 04', service: 'Credit transfer guidance', quote: 'Discussing my previous studies helped me understand which questions to ask and what documents to prepare next.'},
    ]
    const order = ranks(samples.length)
    for (const [index, sample] of samples.entries()) {
      if (!DRY_RUN) await client.create({_type: 'testimonial', orderRank: order[index], show: true, ...sample})
    }
    summary.push(`${DRY_RUN ? 'would create' : 'created'} ${samples.length} sample testimonials`)
  }

  if (await hasAny('galleryImage')) summary.push('kept existing gallery')
  else {
    const frames = galleryFrames.filter((frame) => frame.src)
    const order = ranks(frames.length)
    for (const [index, frame] of frames.entries()) {
      const photo = await image(frame.src as string, frame.label)
      if (!DRY_RUN) await client.create({_type: 'galleryImage', orderRank: order[index], caption: frame.label, photo})
    }
    summary.push(`${DRY_RUN ? 'would create' : 'created'} ${frames.length} gallery photos`)
  }

  if (await hasAny('mbbsDestination')) summary.push('kept existing MBBS destinations')
  else {
    const order = ranks(mbbsDestinations.length)
    for (const [index, destination] of mbbsDestinations.entries()) {
      const photo = await image(destination.image, destination.name)
      if (!DRY_RUN)
        await client.create({
          _type: 'mbbsDestination',
          orderRank: order[index],
          country: destination.name,
          description: destination.description,
          photo,
          featured: index < 4,
        })
    }
    summary.push(`${DRY_RUN ? 'would create' : 'created'} ${mbbsDestinations.length} MBBS destinations (first 4 featured)`)
  }

  console.log('\n' + summary.map((line) => `  • ${line}`).join('\n'))
  console.log(DRY_RUN ? '\nDry run complete.' : '\nDone. Open the Studio to review the content.')
}

run().catch((error) => {
  console.error('\nImport failed:', error instanceof Error ? error.message : error)
  process.exit(1)
})
