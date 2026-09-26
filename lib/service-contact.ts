const whatsappServices: Record<string, string> = {
  "visa-assistance": "Hello Skandiora, I would like to request a private visa consultation. Please help me understand my options and the next steps.",
  attestation: "Hello Skandiora, I would like assistance with document attestation. Please guide me on the requirements and next steps.",
};

/** WhatsApp link with a pre-written message, for services enquired about directly on WhatsApp. */
export function serviceWhatsappHref(slug: string, phoneHref: string) {
  const message = whatsappServices[slug];
  return message ? `https://wa.me/${phoneHref.replace(/\D/g, "")}?text=${encodeURIComponent(message)}` : undefined;
}

export function pageEnquiryHref(pathname: string, phoneHref: string) {
  const slug = pathname.replace(/^\/services\//, "").replace(/\/$/, "");
  return serviceWhatsappHref(slug, phoneHref) ?? (["study-abroad", "mbbs-abroad", "study-in-india", "credit-transfer"].includes(slug) || pathname === "/" ? "#contact" : "/#contact");
}
