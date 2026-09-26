import {faqItem} from './objects/faq'
import {seo} from './objects/seo'
import {siteSettings} from './documents/site-settings'
import {aboutPage, destinationsPage, homePage, privacyPage, servicesPage} from './documents/pages'
import {service} from './documents/service'
import {founder, galleryImage, mbbsDestination, testimonial} from './documents/people-and-media'

export const schemaTypes = [
  seo,
  faqItem,
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  destinationsPage,
  privacyPage,
  service,
  founder,
  testimonial,
  galleryImage,
  mbbsDestination,
]

/** Documents that exist exactly once. They are opened directly from the menu and cannot be duplicated or deleted. */
export const SINGLETONS = ['siteSettings', 'homePage', 'aboutPage', 'servicesPage', 'destinationsPage', 'privacyPage', 'founder']

/** Service pages have fixed layouts in the website code, so editors can change them but not add or remove them. */
export const FIXED_SET = ['service']
