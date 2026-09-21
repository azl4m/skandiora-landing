import type { Faq } from "./services";

export const studyCourses = [
  { name: "MBBS & Medicine", detail: "Explore medical study pathways and arrival support.", icon: "Stethoscope" },
  { name: "Engineering", detail: "Find a specialisation that fits your ambitions.", icon: "Settings2" },
  { name: "Management", detail: "Explore business, management and MBA options.", icon: "BriefcaseBusiness" },
  { name: "IT & Computing", detail: "Compare computing and technology programmes.", icon: "Monitor" },
  { name: "Healthcare", detail: "Discuss nursing and allied health study options.", icon: "HeartPulse" },
  { name: "Hospitality", detail: "Explore hospitality and tourism programmes.", icon: "Hotel" },
  { name: "Aviation", detail: "Find aviation programmes suited to your profile.", icon: "Plane" },
  { name: "Other programmes", detail: "Have something else in mind? Tell us your goal.", icon: "GraduationCap" },
] as const;

export const studyFaqs: Faq[] = [
  { q: "Which courses can I enquire about?", a: "We help you explore a broad range of courses, including MBBS and medicine, engineering, management, IT, healthcare, hospitality, aviation and other professional programmes. Share your preferred subject so we can review course availability and entry requirements against your profile." },
  { q: "Can I get guidance if my Plus Two marks are low or I have not passed?", a: "Yes. You can request a profile review with low marks, pending subjects or an incomplete Plus Two qualification. We will discuss your academic record and whether completing subjects or an alternative education pathway is appropriate. An enquiry does not establish eligibility for overseas admission or a student visa; each institution and destination has its own requirements." },
  { q: "Do you provide pickup and drop-off for MBBS students?", a: "Yes. We provide pickup and drop-off support for our MBBS students, along with pre-departure guidance and accommodation assistance. Ask us to confirm the locations, schedule, arrangements and any charges for your chosen destination before booking travel." },
  { q: "Can you help with accommodation and internships?", a: "We provide accommodation assistance and help students explore internship opportunities relevant to their course. Availability, costs and eligibility vary by destination, institution and provider. Internship assistance is not a guaranteed placement." },
  { q: "Which destinations can I discuss with your team?", a: "You can explore the UK, USA, Canada, Australia, New Zealand, Dubai and destinations across Europe, as well as Singapore, Mauritius and other suitable options. The right choice depends on your qualifications, budget, intended course and the applicable requirements." },
  { q: "What happens after I request a consultation?", a: "The form opens WhatsApp with your enquiry details prefilled. Review the message and tap Send to contact our team. We then discuss your qualifications, course interests, budget and preferred destination, and explain the next steps. You can enquire even if you have not chosen a country or course." },
  { q: "Is the initial consultation free?", a: "Yes, the initial consultation is free. Ask our team for a breakdown of any later counselling or application service charges, tuition, visa, travel and accommodation costs before making a commitment." },
  { q: "Does Skandiora guarantee admission or visa approval?", a: "No. We help with course and university selection, applications, documentation, student visa preparation and pre-departure guidance. Admission decisions belong to institutions, and visa decisions belong to the relevant authorities." },
];
