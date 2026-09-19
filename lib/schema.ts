import type { Faq, ServicePage } from "@/data/services";
import { site } from "@/data/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.skandiora.com";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema() {
  const officeCities = ["Trivandrum", "Kochi", "Chennai"];
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Skandiora Immigration",
    url: SITE_URL,
    description:
      "Skandiora Immigration helps students and families explore study-abroad, MBBS, domestic admission, credit transfer, loan, language and visa pathways with personalised, transparent guidance.",
    telephone: site.phoneHref,
    email: site.email,
    areaServed: "IN",
    location: officeCities.map((city) => ({
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: city,
        addressRegion: "Kerala",
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
