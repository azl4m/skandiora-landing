import { z } from "zod";

export const enquiryLimits = { name: 80, phone: 24, service: 100, destination: 80, course: 100, qualification: 100, intake: 80, language: 100, message: 1000 } as const;

export function cleanPhoneInput(value: string) {
  let digits = 0;
  return Array.from(value.trimStart()).filter((character, index) => {
    if (/\d/.test(character)) return ++digits <= 15;
    return character === "+" ? index === 0 : /[ ()-]/.test(character);
  }).join("").slice(0, enquiryLimits.phone);
}

const shortText = (label: string, limit: number) => z.string().trim()
  .max(limit, `Keep ${label} within ${limit} characters`)
  .regex(/^[\p{L}\p{M}\p{N} .,+&()/'’:%-]*$/u, `Use letters, numbers and basic punctuation for ${label}`)
  .refine((value) => !value || /[\p{L}\p{N}]/u.test(value), `Enter ${label} using letters or numbers`);

const baseEnquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(enquiryLimits.name, "Keep your name within 80 characters")
    .regex(/^[\p{L}\p{M} .’'-]+$/u, "Use letters, spaces, apostrophes, hyphens or dots for your name")
    .regex(/\p{L}/u, "Enter your name using letters"),
  phone: z.string().trim().max(enquiryLimits.phone, "Keep the phone number within 15 digits")
    .regex(/^\+?[\d ()-]+$/, "Use a phone number with an optional + country code")
    .refine((value) => { const digits = value.replace(/\D/g, "").length; return digits >= 7 && digits <= 15; }, "Enter a phone number with 7–15 digits"),
  service: shortText("the service", enquiryLimits.service).min(1, "Choose a service"),
  destination: shortText("the destination", enquiryLimits.destination).optional(),
  course: shortText("the course", enquiryLimits.course).optional(),
  qualification: shortText("your qualification", enquiryLimits.qualification).optional(),
  intake: shortText("the intake", enquiryLimits.intake).optional(),
  language: shortText("language details", enquiryLimits.language).optional(),
  message: z.string().trim().max(enquiryLimits.message, "Keep your message within 1,000 characters").optional(),
  company: z.string().max(0, "Spam detected").optional(),
});

export const enquirySchema = baseEnquirySchema.superRefine((data, ctx) => {
  if (data.service === "Domestic Admission" && !data.qualification) {
    ctx.addIssue({ code: "custom", path: ["qualification"], message: "Enter your latest qualification, e.g. Plus Two or Diploma" });
  }
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
