import {defineArrayMember, defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons/Comment'
import {ImageIcon} from '@sanity/icons/Image'
import {PinIcon} from '@sanity/icons/Pin'
import {UserIcon} from '@sanity/icons/User'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

const photo = (description: string, required = true) =>
  defineField({
    name: 'photo',
    title: 'Photo',
    type: 'image',
    description,
    options: {hotspot: true},
    validation: required ? (rule) => rule.required() : undefined,
  })

export const founder = defineType({
  name: 'founder',
  title: 'Founder',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      ...photo('A natural, professional portrait. After uploading, click the crop icon to choose the focus point so the face is never cut off.', false),
    }),
    defineField({name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'role', title: 'Role', type: 'string', description: 'e.g. Founder, Skandiora Immigration'}),
    defineField({name: 'headline', title: 'Personal line', type: 'string', description: 'The italic line under the name.'}),
    defineField({
      name: 'bio',
      title: 'Biography paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 4})],
    }),
    defineField({
      name: 'credentials',
      title: 'Highlights',
      type: 'array',
      description: 'The three small boxes under the biography. The first one is also shown on the photo.',
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'credential',
          title: 'Highlight',
          fields: [
            defineField({name: 'label', title: 'Main text', type: 'string', description: 'e.g. 6+ years, MBA', validation: (rule) => rule.required().max(20)}),
            defineField({name: 'detail', title: 'Detail', type: 'string', description: 'e.g. Cardiff Metropolitan University, UK', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'detail'}},
        }),
      ],
    }),
    defineField({name: 'signoff', title: 'Closing line', type: 'text', rows: 2}),
    defineField({
      name: 'education',
      title: 'Universities attended',
      type: 'array',
      description: 'Not shown on the page — helps Google understand the founder’s background.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'school',
          fields: [
            defineField({name: 'name', title: 'University / college', type: 'string'}),
            defineField({name: 'location', title: 'Location', type: 'string'}),
          ],
          preview: {select: {title: 'name', subtitle: 'location'}},
        }),
      ],
    }),
  ],
  preview: {select: {title: 'name', media: 'photo'}},
})

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'testimonial'}),
    defineField({
      name: 'show',
      title: 'Show on website',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to hide this testimonial without deleting it.',
    }),
    defineField({name: 'name', title: 'Name', type: 'string', description: 'The real student’s or parent’s name. Genuine testimonials only, and only with their permission — the section appears on the website once at least one is shown.', validation: (rule) => rule.required()}),
    defineField({name: 'service', title: 'What they came to us for', type: 'string', description: 'e.g. MBBS abroad guidance', validation: (rule) => rule.required()}),
    defineField({
      name: 'quote',
      title: 'What they said',
      type: 'text',
      rows: 4,
      description: 'Use their real words. 1–3 sentences reads best.',
      validation: (rule) => rule.required().max(320),
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'service', show: 'show'},
    prepare: ({title, subtitle, show}) => ({title: show === false ? `${title} (hidden)` : title, subtitle}),
  },
})

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery photo',
  type: 'document',
  icon: ImageIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'galleryImage'}),
    defineField({
      name: 'show',
      title: 'Show on website',
      type: 'boolean',
      initialValue: true,
      description: 'Turn off to hide this photo without deleting it. The gallery section only appears when at least one photo is shown.',
    }),
    photo('Use real photos only — your offices, team and students (with their permission). Tall (portrait) photos fit the gallery frames best.'),
    defineField({
      name: 'caption',
      title: 'What the photo shows',
      type: 'string',
      description: 'e.g. "Counselling session" — read aloud by screen readers and used by Google.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'caption', media: 'photo', show: 'show'},
    prepare: ({title, media, show}) => ({title: show === false ? `${title} (hidden)` : title, media}),
  },
})

export const mbbsDestination = defineType({
  name: 'mbbsDestination',
  title: 'MBBS destination',
  type: 'document',
  icon: PinIcon,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'mbbsDestination'}),
    defineField({name: 'country', title: 'Country', type: 'string', validation: (rule) => rule.required()}),
    photo('A landscape or landmark photo of the country. Portrait photos fit the cards best.'),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'text',
      rows: 3,
      description: 'Shown on the card. One or two sentences.',
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: 'featured',
      title: 'Show on the Study Abroad page',
      type: 'boolean',
      initialValue: false,
      description: 'The Study Abroad page shows up to 4 featured destinations. All destinations always appear on the MBBS Abroad page.',
      validation: (rule) =>
        rule.custom(async (value, context) => {
          if (!value) return true
          const client = context.getClient({apiVersion: '2026-02-01'})
          const id = context.document?._id?.replace(/^drafts\./, '')
          const others = await client.fetch<number>(
            'count(*[_type == "mbbsDestination" && featured == true && !(_id in [$id, "drafts." + $id])])',
            {id},
          )
          return others < 4 || 'Only 4 destinations can be featured. Turn one off first.'
        }),
    }),
  ],
  preview: {
    select: {title: 'country', featured: 'featured', media: 'photo'},
    prepare: ({title, featured, media}) => ({title, subtitle: featured ? 'Featured on Study Abroad page' : undefined, media}),
  },
})
