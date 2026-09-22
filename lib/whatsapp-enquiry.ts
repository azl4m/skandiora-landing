import type { WhatsAppEnquiryInput } from "./enquiry-schema";

export function whatsappEnquiryUrl(phone: string, data: WhatsAppEnquiryInput) {
  const message = [
    "Hello Skandiora Immigration, I would like a free consultation.",
    "",
    `Name: ${data.name}`,
    ...(data.phone ? [`Phone / WhatsApp: ${data.phone}`] : []),
    `Service: ${data.service}`,
    ...(data.course ? [`Course: ${data.course}`] : []),
    ...(data.service === "Credit Transfer" && !data.destination ? [] : [`Preferred destination: ${data.destination || "Not sure yet"}`]),
    ...(data.qualification ? [`Education qualification: ${data.qualification}`] : []),
    ...(data.intake ? [`Preferred intake: ${data.intake}`] : []),
    ...(data.language ? [`Language / test details: ${data.language}`] : []),
    ...(data.message ? ["", `My qualification / question: ${data.message}`] : []),
  ].join("\n");

  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
