import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

const PHONE_HINT = 'Include the country code, e.g. +91 89213 85573'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Company details',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'contact', title: 'Contact', default: true},
    {name: 'offices', title: 'Offices & hours'},
    {name: 'social', title: 'Social media'},
    {name: 'brand', title: 'Logo'},
  ],
  fields: [
    defineField({
      name: 'phones',
      title: 'Phone numbers',
      type: 'array',
      group: 'contact',
      description: 'Shown in the footer and contact sections.',
      of: [defineArrayMember({type: 'string', validation: (rule) => rule.regex(/^\+?[\d\s-]{8,}$/, {name: 'phone number'}).error(PHONE_HINT)})],
      validation: (rule) => rule.min(1).error('Add at least one phone number.'),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp number',
      type: 'string',
      group: 'contact',
      description: `All website enquiry forms open WhatsApp with this number, and the "Call now" buttons dial it. ${PHONE_HINT}`,
      validation: (rule) => rule.required().regex(/^\+?[\d\s-]{8,}$/, {name: 'phone number'}).error(PHONE_HINT),
    }),
    defineField({
      name: 'emails',
      title: 'Email addresses',
      type: 'array',
      group: 'contact',
      description: 'Shown in the footer, contact section and privacy policy. The first one is the main address (also given to Google).',
      of: [defineArrayMember({type: 'string', validation: (rule) => rule.email().error('Enter a valid email address, e.g. info@skandiora.in')})],
      validation: (rule) => rule.min(1).error('Add at least one email address.'),
    }),
    defineField({
      name: 'tagline',
      title: 'Short tagline',
      type: 'string',
      group: 'contact',
      description: 'Shown under the logo in the footer.',
    }),
    defineField({
      name: 'offices',
      title: 'Office locations',
      type: 'array',
      group: 'offices',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'office',
          title: 'Office',
          fields: [
            defineField({name: 'city', title: 'City', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'state', title: 'State', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'city', subtitle: 'state'}},
        }),
      ],
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening hours',
      type: 'string',
      group: 'offices',
      description: 'For example: Mon–Sat, 9:30–6:30',
    }),
    defineField({
      name: 'logo',
      title: 'Logo (emblem)',
      type: 'image',
      group: 'brand',
      description:
        'The emblem only, without the company name (the name is written next to it automatically). Use a PNG with a transparent background, at least 512 px tall. If there is empty space around the emblem, click the crop icon and crop tight around it — this keeps the logo sharp in the small header tile. It appears in the header, footer, browser tab icon, globe pins and link previews. Browsers and WhatsApp remember old icons for a while, so a new logo can take a few days to show there.',
      // Crop tool: if the image has empty space around the emblem, crop it tight so it stays sharp at small sizes.
      options: {accept: 'image/png,image/webp,image/svg+xml', hotspot: true},
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social media links',
      type: 'array',
      group: 'social',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          title: 'Social link',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'X (Twitter)', value: 'x'},
                  {title: 'Threads', value: 'threads'},
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({name: 'handle', title: 'Account name', type: 'string', description: 'e.g. @skandiora_immigration'}),
            defineField({name: 'url', title: 'Link', type: 'url', validation: (rule) => rule.required()}),
            defineField({name: 'description', title: 'Short line', type: 'string', description: 'e.g. "A closer look at Skandiora."'}),
          ],
          preview: {select: {title: 'platform', subtitle: 'handle'}},
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Company details'})},
})
