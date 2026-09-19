import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  service: z.string().trim().min(1),
  destination: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
  company: z.string().max(0, "Spam detected").optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
