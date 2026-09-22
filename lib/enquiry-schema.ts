import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  service: z.string().trim().min(1),
  destination: z.string().trim().max(80).optional(),
  course: z.string().trim().max(100).optional(),
  qualification: z.string().trim().max(200, "Keep your qualification within 200 characters").optional(),
  intake: z.string().trim().max(100, "Keep your intake within 100 characters").optional(),
  language: z.string().trim().max(200, "Keep your language details within 200 characters").optional(),
  message: z.string().trim().max(2000).optional(),
  company: z.string().max(0, "Spam detected").optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const whatsappEnquirySchema = enquirySchema.extend({
  phone: enquirySchema.shape.phone.optional(),
});

export type WhatsAppEnquiryInput = z.infer<typeof whatsappEnquirySchema>;
