import {defineArrayMember, defineField, defineType} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'Question',
  type: 'object',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'Write it the way a parent or student would ask it, e.g. "Is MBBS in Georgia taught in English?"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      description: 'Answer the question directly in the first sentence. 2–4 sentences is ideal.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {select: {title: 'question', subtitle: 'answer'}},
})

/** A reusable "FAQs" list field. Drag to reorder. */
export const faqsField = defineField({
  name: 'faqs',
  title: 'Frequently asked questions',
  type: 'array',
  description: 'Shown in the FAQ section of this page, in this order. Drag to reorder.',
  of: [defineArrayMember({type: 'faqItem'})],
})
