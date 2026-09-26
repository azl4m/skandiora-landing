import type {StructureResolver} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {BookIcon} from '@sanity/icons/Book'
import {CogIcon} from '@sanity/icons/Cog'
import {CommentIcon} from '@sanity/icons/Comment'
import {DocumentIcon} from '@sanity/icons/Document'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {HomeIcon} from '@sanity/icons/Home'
import {ImageIcon} from '@sanity/icons/Image'
import {LockIcon} from '@sanity/icons/Lock'
import {PinIcon} from '@sanity/icons/Pin'
import {UserIcon} from '@sanity/icons/User'

const single = (S: Parameters<StructureResolver>[0], type: string, title: string, icon: React.ComponentType) =>
  S.listItem().title(title).id(type).icon(icon).child(S.document().schemaType(type).documentId(type).title(title))

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Website content')
    .items([
      single(S, 'siteSettings', 'Company details', CogIcon),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              single(S, 'homePage', 'Home', HomeIcon),
              single(S, 'aboutPage', 'About', DocumentIcon),
              single(S, 'servicesPage', 'All services', DocumentIcon),
              single(S, 'destinationsPage', 'Destinations', DocumentIcon),
              single(S, 'privacyPage', 'Privacy policy', LockIcon),
            ]),
        ),
      S.listItem()
        .title('Services')
        .icon(BookIcon)
        .child(S.documentTypeList('service').title('Services').defaultOrdering([{field: 'name', direction: 'asc'}]).initialValueTemplates([])),
      S.divider(),
      single(S, 'founder', 'Founder', UserIcon),
      orderableDocumentListDeskItem({type: 'testimonial', title: 'Testimonials', icon: CommentIcon, S, context}),
      orderableDocumentListDeskItem({type: 'galleryImage', title: 'Gallery', icon: ImageIcon, S, context}),
      orderableDocumentListDeskItem({type: 'mbbsDestination', title: 'MBBS destinations', icon: PinIcon, S, context}),
    ])
