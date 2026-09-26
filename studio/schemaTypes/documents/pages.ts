import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons/Document'
import {HomeIcon} from '@sanity/icons/Home'
import {LockIcon} from '@sanity/icons/Lock'
import {faqsField} from '../objects/faq'

const groups = [
  {name: 'page', title: 'On the page', default: true},
  {name: 'google', title: 'Google & sharing'},
]

const heroFields = ({eyebrow = true, textTitle = 'Text under the headline'} = {}) => [
  ...(eyebrow
    ? [
        defineField({
          name: 'heroEyebrow',
          title: 'Small label above the headline',
          type: 'string',
          group: 'page',
          description: 'The short gold text above the big headline.',
        }),
      ]
    : []),
  defineField({
    name: 'heroTitle',
    title: 'Headline',
    type: 'string',
    group: 'page',
    description: 'The big headline at the top of the page. Keep it short — ideally under 8 words.',
    validation: (rule) => rule.required().max(90),
  }),
  defineField({
    name: 'heroText',
    title: textTitle,
    type: 'text',
    rows: 3,
    group: 'page',
    validation: (rule) => rule.max(400).warning('Long intros are rarely read — try to keep it to 2–3 lines.'),
  }),
]

const seoField = defineField({name: 'seo', title: 'Google & link preview', type: 'seo', group: 'google'})
const pageFaqs = {...faqsField, group: 'page'}

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: HomeIcon,
  groups,
  fields: [
    ...heroFields({eyebrow: false}),
    defineField({
      name: 'showStats',
      title: 'Show the numbers under the headline',
      type: 'boolean',
      group: 'page',
      initialValue: true,
      description: 'Turn off to hide the three numbers (for example while they are being confirmed).',
    }),
    defineField({
      name: 'stats',
      title: 'Numbers under the headline',
      type: 'array',
      group: 'page',
      hidden: ({document}) => document?.showStats === false,
      description: 'Only use numbers you can stand behind.',
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          title: 'Number',
          fields: [
            defineField({name: 'value', title: 'Number', type: 'string', description: 'e.g. 20+', validation: (rule) => rule.required().max(8)}),
            defineField({name: 'label', title: 'Label', type: 'string', description: 'e.g. Destinations explored', validation: (rule) => rule.required().max(40)}),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
    }),
    defineField({
      name: 'testimonialsNote',
      title: 'Note under the testimonials heading',
      type: 'string',
      group: 'page',
      description: 'Optional. While the testimonials are samples, this explains that. Clear it once real testimonials are added.',
    }),
    pageFaqs,
    seoField,
  ],
  preview: {prepare: () => ({title: 'Home page'})},
})

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  icon: DocumentIcon,
  groups,
  fields: [
    ...heroFields({eyebrow: false, textTitle: 'Text under the headline'}),
    defineField({
      name: 'heroStatement',
      title: 'Italic line under the headline',
      type: 'string',
      group: 'page',
      description: 'The larger italic sentence between the headline and the text.',
    }),
    seoField,
  ],
  preview: {prepare: () => ({title: 'About page'})},
})

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'All services page',
  type: 'document',
  icon: DocumentIcon,
  groups,
  fields: [...heroFields(), seoField],
  preview: {prepare: () => ({title: 'All services page'})},
})

export const destinationsPage = defineType({
  name: 'destinationsPage',
  title: 'Destinations page',
  type: 'document',
  icon: DocumentIcon,
  groups,
  fields: [...heroFields(), pageFaqs, seoField],
  preview: {prepare: () => ({title: 'Destinations page'})},
})

export const privacyPage = defineType({
  name: 'privacyPage',
  title: 'Privacy policy',
  type: 'document',
  icon: LockIcon,
  groups,
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Headline',
      type: 'string',
      group: 'page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last updated',
      type: 'date',
      group: 'page',
      description: 'Change this whenever you edit the policy.',
      options: {dateFormat: 'D MMMM YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      group: 'page',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'policySection',
          title: 'Section',
          fields: [
            defineField({name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'paragraphs',
              title: 'Paragraphs',
              type: 'array',
              of: [defineArrayMember({type: 'text', rows: 3})],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: {select: {title: 'heading'}},
        }),
      ],
    }),
    seoField,
  ],
  preview: {prepare: () => ({title: 'Privacy policy'})},
})
