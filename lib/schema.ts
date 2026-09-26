import type { Faq, ServicePage } from "@/data/services";
import type { SiteSettings, SocialLink } from "@/lib/cms/content";

type Founder = { name: string; bio: string[]; image: { src: string; placeholder: boolean }; education: { name: string; location: string }[] };

import { SITE_URL } from "@/lib/site-url";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema(site: SiteSettings, socialLinks: SocialLink[]) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Skandiora Immigration",
    url: SITE_URL,
    sameAs: socialLinks.map((social) => social.href),
    description:
      "Skandiora Immigration helps students and families explore study-abroad, MBBS, domestic admission, credit transfer, loan, language and visa pathways with personalised, transparent guidance.",
    telephone: site.phones.map((phone) => phone.href),
    contactPoint: site.phones.map((phone) => ({ "@type": "ContactPoint", telephone: phone.href, contactType: "Admissions enquiries" })),
    email: site.email,
    areaServed: "IN",
    location: site.offices.map((office) => ({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: office.city,
        addressRegion: office.region,
        addressCountry: "IN",
      },
    })),
  };
}

export function breadcrumbSchema(items: { href?: string; label: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function serviceSchema(service: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.navTitle,
    description: service.metaDescription,
    serviceType: service.navTitle,
    provider: {
      "@type": "EducationalOrganization",
      name: "Skandiora Immigration",
      url: SITE_URL,
    },
    areaServed: "IN",
    url: absoluteUrl(`/services/${service.slug}`),
  };
}

export function founderSchema(founder: Founder) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    jobTitle: "Founder",
    description: founder.bio[0],
    url: absoluteUrl("/about"),
    ...(founder.image.placeholder ? {} : { image: founder.image.src }),
    worksFor: { "@type": "EducationalOrganization", name: "Skandiora Immigration", url: absoluteUrl("/") },
    alumniOf: founder.education.map((school) => ({ "@type": "CollegeOrUniversity", name: school.name, address: school.location })),
    knowsAbout: ["Education consultancy", "Study abroad", "University admissions", "MBBS abroad"],
  };
}
