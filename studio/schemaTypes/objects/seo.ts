import {defineField, defineType} from 'sanity'

// How the page appears in Google results and link previews. Kept separate from the
// visible page headline so editors can change one without affecting the other.
export const seo = defineType({
  name: 'seo',
  title: 'Google & link preview',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({
      name: 'title',
      title: 'Google title',
      type: 'string',
      description:
        'The blue headline in Google results and the browser tab. The brand name "Skandiora Immigration" is added automatically. Aim for under 60 characters.',
      validation: (rule) => [
        rule.required().error('Add a Google title.'),
        rule.max(60).warning('Longer than 60 characters — Google may cut it off.'),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Google description',
      type: 'text',
      rows: 3,
      description: 'The grey text under the title in Google results. Aim for 120–155 characters.',
      validation: (rule) => [
        rule.required().error('Add a Google description.'),
        rule.max(155).warning('Longer than 155 characters — Google may cut it off.'),
        rule.min(70).warning('A little short — aim for 120–155 characters.'),
      ],
    }),
    defineField({
      name: 'shareImage',
      title: 'Link preview image (optional)',
      type: 'image',
      description:
        'Shown when this page is shared on WhatsApp, LinkedIn or Facebook. Leave empty to use the standard Skandiora image. Best size: 1200 × 630.',
    }),
  ],
})
