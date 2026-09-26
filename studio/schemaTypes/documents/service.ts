import {defineArrayMember, defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons/Book'
import {faqsField} from '../objects/faq'

type Doc = {slug?: {current?: string}} | undefined

// Each service page has its own layout; only show the fields that layout actually displays.
const slugOf = (document: unknown) => (document as Doc)?.slug?.current ?? ''
const hideOn =
  (...slugs: string[]) =>
  ({document}: {document?: unknown}) =>
    slugs.includes(slugOf(document))
const showOnlyOn =
  (...slugs: string[]) =>
  ({document}: {document?: unknown}) =>
    !slugs.includes(slugOf(document))

const WITH_HEADLINE = ['mbbs-abroad', 'education-loan', 'language-training', 'accommodation', 'visa-assistance', 'attestation']

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: BookIcon,
  groups: [
    {name: 'card', title: 'Service card', default: true},
    {name: 'page', title: 'Service page'},
    {name: 'faqs', title: 'FAQs'},
    {name: 'google', title: 'Google & sharing'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Service name',
      type: 'string',
      group: 'card',
      description: 'Used on service cards, the footer menu and page breadcrumbs.',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'slug',
      title: 'Page address',
      type: 'slug',
      group: 'card',
      readOnly: true,
      description: 'The web address of this service page. Fixed — ask your developer if it needs to change.',
    }),
    defineField({
      name: 'cardText',
      title: 'Card description',
      type: 'text',
      rows: 3,
      group: 'card',
      description: 'The short text on this service’s card (home page and "All services" page).',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Small label above the headline',
      type: 'string',
      group: 'page',
      hidden: hideOn('study-abroad', 'credit-transfer'),
    }),
    defineField({
      name: 'headlineLines',
      title: 'Headline',
      type: 'array',
      group: 'page',
      description: 'The big headline at the top of the page. Each line is shown on its own row.',
      hidden: showOnlyOn(...WITH_HEADLINE),
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'summary',
      title: 'One-sentence summary',
      type: 'text',
      rows: 3,
      group: 'page',
      description: 'A single clear sentence near the top of the page saying what this service is. Google and AI assistants often quote it.',
      hidden: hideOn('study-abroad'),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction paragraphs',
      type: 'array',
      group: 'page',
      hidden: hideOn('study-abroad'),
      of: [defineArrayMember({type: 'text', rows: 3})],
    }),
    defineField({
      name: 'closingHeadline',
      title: 'Closing banner headline',
      type: 'string',
      group: 'page',
      description: 'The heading of the banner near the bottom of the page.',
      hidden: hideOn('study-abroad'),
    }),
    defineField({
      name: 'closingText',
      title: 'Closing banner text',
      type: 'text',
      rows: 3,
      group: 'page',
      hidden: hideOn('study-abroad'),
    }),
    {...faqsField, group: 'faqs'},
    defineField({name: 'seo', title: 'Google & link preview', type: 'seo', group: 'google'}),
  ],
  preview: {select: {title: 'name', subtitle: 'slug.current'}, prepare: ({title, subtitle}) => ({title, subtitle: subtitle ? `/services/${subtitle}` : undefined})},
})
