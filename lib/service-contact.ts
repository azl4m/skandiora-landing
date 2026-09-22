import { site } from "@/data/site";

const whatsappServices: Record<string, string> = {
  "visa-assistance": "Hello Skandiora, I would like to request a private visa consultation. Please help me understand my options and the next steps.",
  attestation: "Hello Skandiora, I would like assistance with document attestation. Please guide me on the requirements and next steps.",
};

export function serviceWhatsappHref(slug: string) {
  const message = whatsappServices[slug];
  return message ? `https://wa.me/${site.phoneHref.replace(/\D/g, "")}?text=${encodeURIComponent(message)}` : undefined;
}

export function pageEnquiryHref(pathname: string) {
  const slug = pathname.replace(/^\/services\//, "").replace(/\/$/, "");
  return serviceWhatsappHref(slug) ?? (["study-abroad", "mbbs-abroad", "study-in-india", "credit-transfer"].includes(slug) || pathname === "/" ? "#contact" : "/#contact");
}
