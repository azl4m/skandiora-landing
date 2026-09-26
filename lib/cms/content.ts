import { cache } from "react";
import { cmsFetch } from "./client";
import { cmsImage, externalImage, type CmsImage, type SanityImageSource } from "./image";
import { site as localSite } from "@/data/site";
import { socialLinks as localSocials } from "@/data/socials";
import { services as localServices, type Faq, type ServicePage } from "@/data/services";
import { homeFaqs as localHomeFaqs } from "@/data/faq";
import { studyFaqs as localStudyFaqs } from "@/data/study-abroad";
import { founder as localFounder } from "@/data/founder";
import { galleryFrames as localGallery } from "@/data/gallery";
import { mbbsDestinations as localMbbs } from "@/data/mbbs-destinations";
import { aboutHero as localAboutHero } from "@/data/about";

/*
 * Content from Sanity, with the built-in content as a field-by-field fallback.
 * An empty field in Sanity (or Sanity being unreachable) never blanks the page.
 */

type SanityFaq = { question?: string; answer?: string };
type Seo = { title?: string; description?: string; shareImage?: SanityImageSource };

const text = (value: string | null | undefined, fallback: string) => (value && value.trim() ? value : fallback);
const list = <T,>(value: T[] | null | undefined, fallback: T[]) => (value && value.length ? value : fallback);
const faqs = (value: SanityFaq[] | null | undefined, fallback: Faq[]): Faq[] =>
  list(
    value?.filter((item): item is Required<SanityFaq> => Boolean(item.question && item.answer)).map((item) => ({ q: item.question, a: item.answer })),
    fallback,
  );

export type PageSeo = { title?: string; description?: string; shareImage?: CmsImage | null };
const seo = (value: Seo | null | undefined): PageSeo => ({
  title: value?.title || undefined,
  description: value?.description || undefined,
  shareImage: cmsImage(value?.shareImage),
});

// ── Company details ──────────────────────────────────────────────────────────

/** Company details; `logoUrl` is the emblem uploaded in Sanity, or null to use the built-in one. */
export type SiteSettings = typeof localSite & { logoUrl: string | null };
export type SocialLink = { id: string; name: string; label: string; description: string; href: string };

const toHref = (phone: string) => `+${phone.replace(/\D/g, "")}`;
const PLATFORM_NAMES: Record<string, string> = { instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn", x: "X", threads: "Threads" };

type SanitySettings = {
  phones?: string[];
  whatsapp?: string;
  emails?: string[];
  tagline?: string;
  offices?: { city?: string; state?: string }[];
  openingHours?: string;
  socialLinks?: { platform?: string; handle?: string; url?: string; description?: string }[];
  logo?: SanityImageSource;
};

export const getSettings = cache(async (): Promise<{ site: SiteSettings; socials: SocialLink[] }> => {
  const data = await cmsFetch<SanitySettings>(`*[_id == "siteSettings"][0]{phones, whatsapp, emails, tagline, offices, openingHours, socialLinks, logo}`);
  const phones = list(
    data?.phones?.filter(Boolean).map((label) => ({ label, href: toHref(label) })),
    localSite.phones,
  );
  const offices = list(
    data?.offices?.filter((office) => office.city).map((office) => ({ city: office.city as string, region: office.state ?? "" })),
    localSite.offices,
  );
  const whatsapp = data?.whatsapp ? { phone: data.whatsapp, phoneHref: toHref(data.whatsapp) } : { phone: localSite.phone, phoneHref: localSite.phoneHref };
  const hours = text(data?.openingHours, "Mon–Sat, 9:30–6:30");
  const site: SiteSettings = {
    ...localSite,
    ...whatsapp,
    phones,
    offices,
    emails: list(data?.emails?.filter(Boolean), localSite.emails),
    email: list(data?.emails?.filter(Boolean), localSite.emails)[0],
    tagline: text(data?.tagline, localSite.tagline),
    office: `${offices.map((office) => office.city).join(" · ")} · ${hours}`,
    // Built with the image URL builder so a crop set in the Studio is applied.
    logoUrl: cmsImage(data?.logo)?.src ?? null,
  };
  const socials = list(
    data?.socialLinks
      ?.filter((link) => link.platform && link.url)
      .map((link) => ({
        id: link.platform as string,
        name: PLATFORM_NAMES[link.platform as string] ?? (link.platform as string),
        label: link.handle ?? "",
        description: link.description ?? "",
        href: link.url as string,
      })),
    localSocials.map((link) => ({ ...link })),
  );
  return { site, socials };
});

// ── Services ─────────────────────────────────────────────────────────────────

type SanityService = {
  slug?: string;
  name?: string;
  cardText?: string;
  eyebrow?: string;
  headlineLines?: string[];
  summary?: string;
  intro?: string[];
  closingHeadline?: string;
  closingText?: string;
  faqs?: SanityFaq[];
  seo?: Seo;
};

export type ServiceWithSeo = ServicePage & { shareImage?: CmsImage | null };

export const getServices = cache(async (): Promise<ServiceWithSeo[]> => {
  const data = await cmsFetch<SanityService[]>(
    `*[_type == "service"]{"slug": slug.current, name, cardText, eyebrow, headlineLines, summary, intro, closingHeadline, closingText, faqs, seo}`,
  );
  const bySlug = new Map((data ?? []).map((item) => [item.slug, item]));
  return localServices.map((local) => {
    // The Study Abroad page shows its own FAQ list (not the service's), so that is what Sanity edits.
    const fallbackFaqs = local.slug === "study-abroad" ? localStudyFaqs : local.faqs;
    const cms = bySlug.get(local.slug);
    if (!cms) return { ...local, faqs: fallbackFaqs };
    return {
      ...local,
      navTitle: text(cms.name, local.navTitle),
      cardBody: text(cms.cardText, local.cardBody),
      eyebrow: text(cms.eyebrow, local.eyebrow),
      headlineLines: list(cms.headlineLines?.filter(Boolean), local.headlineLines),
      summary: text(cms.summary, local.summary),
      intro: list(cms.intro?.filter(Boolean), local.intro),
      closingHeadline: cms.closingHeadline || local.closingHeadline,
      closingBody: cms.closingText || local.closingBody,
      faqs: faqs(cms.faqs, fallbackFaqs),
      metaTitle: text(cms.seo?.title, local.metaTitle),
      metaDescription: text(cms.seo?.description, local.metaDescription),
      shareImage: cmsImage(cms.seo?.shareImage),
    };
  });
});

export async function getService(slug: string) {
  return (await getServices()).find((service) => service.slug === slug);
}

/** FAQs for the Study Abroad page (edited on the Student Visa service in Sanity). */
export async function getStudyFaqs() {
  return (await getService("study-abroad"))?.faqs ?? localStudyFaqs;
}

// ── Pages ────────────────────────────────────────────────────────────────────

type SanityPage = { heroEyebrow?: string; heroTitle?: string; heroText?: string; heroStatement?: string; faqs?: SanityFaq[]; seo?: Seo };
const pageQuery = (id: string) => `*[_id == "${id}"][0]{heroEyebrow, heroTitle, heroText, heroStatement, faqs, seo, showStats, stats, testimonialsNote}`;

export type PageContent = { eyebrow: string; title: string; text: string; faqs: Faq[]; seo: PageSeo };

function page(data: SanityPage | null, fallback: { eyebrow?: string; title: string; text: string; faqs?: Faq[] }): PageContent {
  return {
    eyebrow: text(data?.heroEyebrow, fallback.eyebrow ?? ""),
    title: text(data?.heroTitle, fallback.title),
    text: text(data?.heroText, fallback.text),
    faqs: faqs(data?.faqs, fallback.faqs ?? []),
    seo: seo(data?.seo),
  };
}

const DEFAULT_STATS = [
  { value: "20+", label: "Destinations explored" },
  { value: "4", label: "South Indian states" },
  { value: "100%", label: "Recognised institutions" },
];

export const getHomePage = cache(async () => {
  const data = await cmsFetch<SanityPage & { showStats?: boolean; stats?: { value?: string; label?: string }[]; testimonialsNote?: string }>(pageQuery("homePage"));
  return {
    ...page(data, {
      title: "Your future deserves the right decision.",
      text: "We start by understanding your academic background, ambitions, budget and eligibility — then guide you toward the destination, course and pathway that truly fits you.",
      faqs: localHomeFaqs,
    }),
    showStats: data?.showStats ?? true,
    // Once the Home page exists in Sanity, an empty note means "no note".
    testimonialsNote: data ? data.testimonialsNote || undefined : "Design preview — the names and feedback below are placeholders, not real testimonials.",
    stats: list(
      data?.stats?.filter((stat) => stat.value && stat.label).map((stat) => ({ value: stat.value as string, label: stat.label as string })),
      DEFAULT_STATS,
    ),
  };
});

export const getAboutPage = cache(async () => {
  const data = await cmsFetch<SanityPage>(pageQuery("aboutPage"));
  return {
    ...page(data, { title: localAboutHero.title, text: localAboutHero.body }),
    statement: text(data?.heroStatement, localAboutHero.statement),
  };
});

export const getServicesPage = cache(async () =>
  page(await cmsFetch<SanityPage>(pageQuery("servicesPage")), {
    eyebrow: "What we do",
    title: "Five services, one accountable team",
    text: "Every case is handled by a named counsellor who owns your file from first call to final approval — no handoffs, no surprise fees.",
  }),
);

export const getDestinationsPage = cache(async (fallbackFaqs: Faq[]) =>
  page(await cmsFetch<SanityPage>(pageQuery("destinationsPage")), {
    eyebrow: "Your global education journey starts here",
    title: "Dream big. Explore more. Choose wisely.",
    text: "Your destination should match your goals — not simply be a popular choice. Explore education opportunities across leading international destinations and discover pathways that may suit your academic profile and career aspirations.",
    faqs: fallbackFaqs,
  }),
);

import type { PolicySection } from "@/data/privacy";
export type { PolicySection };

export const getPrivacyPage = cache(async (fallback: { title: string; lastUpdated: string; sections: PolicySection[] }) => {
  const data = await cmsFetch<{ heroTitle?: string; lastUpdated?: string; sections?: { heading?: string; paragraphs?: string[] }[]; seo?: Seo }>(
    `*[_id == "privacyPage"][0]{heroTitle, lastUpdated, sections, seo}`,
  );
  const lastUpdated = data?.lastUpdated
    ? new Date(`${data.lastUpdated}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    : fallback.lastUpdated;
  return {
    title: text(data?.heroTitle, fallback.title),
    lastUpdated,
    sections: list(
      data?.sections
        ?.filter((section) => section.heading && section.paragraphs?.length)
        .map((section) => ({ heading: section.heading as string, body: (section.paragraphs as string[]).filter(Boolean) })),
      fallback.sections,
    ),
    seo: seo(data?.seo),
  };
});

// ── Founder, testimonials, gallery, MBBS destinations ────────────────────────

export type FounderContent = Omit<typeof localFounder, "image"> & { image: CmsImage & { placeholder: boolean } };

export const getFounder = cache(async (): Promise<FounderContent> => {
  const data = await cmsFetch<{
    photo?: SanityImageSource;
    name?: string;
    role?: string;
    headline?: string;
    bio?: string[];
    credentials?: { label?: string; detail?: string }[];
    signoff?: string;
    education?: { name?: string; location?: string }[];
  }>(`*[_id == "founder"][0]{photo, name, role, headline, bio, credentials, signoff, education}`);
  const photo = cmsImage(data?.photo);
  return {
    ...localFounder,
    name: text(data?.name, localFounder.name),
    role: text(data?.role, localFounder.role),
    headline: text(data?.headline, localFounder.headline),
    bio: list(data?.bio?.filter(Boolean), localFounder.bio),
    credentials: list(
      data?.credentials?.filter((item) => item.label && item.detail).map((item) => ({ label: item.label as string, detail: item.detail as string })),
      localFounder.credentials,
    ),
    signoff: text(data?.signoff, localFounder.signoff),
    education: list(
      data?.education?.filter((item) => item.name).map((item) => ({ name: item.name as string, location: item.location ?? "" })),
      localFounder.education,
    ),
    // A photo uploaded in Sanity is treated as the real portrait; the built-in one is a placeholder.
    image: photo ? { ...photo, placeholder: false } : { ...externalImage(localFounder.image.src), placeholder: localFounder.image.placeholder },
  };
});

export type Testimonial = { name: string; service: string; quote: string };

export const getTestimonials = cache(async (fallback: Testimonial[]): Promise<Testimonial[]> => {
  const data = await cmsFetch<{ name?: string; service?: string; quote?: string }[]>(
    `*[_type == "testimonial" && show != false] | order(orderRank){name, service, quote}`,
  );
  if (!data) return fallback;
  // An empty published list in Sanity means "no testimonials yet" — the section hides.
  return data.filter((item) => item.name && item.quote).map((item) => ({ name: item.name as string, service: item.service ?? "", quote: item.quote as string }));
});

export type GalleryPhoto = { id: string; caption: string; image: CmsImage | null };

export const getGallery = cache(async (): Promise<GalleryPhoto[]> => {
  const data = await cmsFetch<{ _id: string; caption?: string; photo?: SanityImageSource }[]>(
    `*[_type == "galleryImage"] | order(orderRank){_id, caption, photo}`,
  );
  const cms = (data ?? []).map((item) => ({ id: item._id, caption: item.caption ?? "", image: cmsImage(item.photo) })).filter((item) => item.image);
  if (cms.length) return cms;
  return localGallery.map((frame) => ({ id: frame.id, caption: frame.label, image: frame.src ? externalImage(frame.src) : null }));
});

export type MbbsDestination = { name: string; description: string; image: CmsImage; featured: boolean };

export const getMbbsDestinations = cache(async (): Promise<MbbsDestination[]> => {
  const data = await cmsFetch<{ country?: string; description?: string; photo?: SanityImageSource; featured?: boolean }[]>(
    `*[_type == "mbbsDestination"] | order(orderRank){country, description, photo, featured}`,
  );
  const cms = (data ?? [])
    .map((item) => ({ name: item.country ?? "", description: item.description ?? "", image: cmsImage(item.photo), featured: Boolean(item.featured) }))
    .filter((item): item is MbbsDestination => Boolean(item.name && item.image));
  if (cms.length) return cms;
  return localMbbs.map((item, index) => ({ name: item.name, description: item.description, image: externalImage(item.image), featured: index < 4 }));
});

export async function getFeaturedMbbsDestinations() {
  return (await getMbbsDestinations()).filter((item) => item.featured).slice(0, 4);
}
