export type ServiceCategory = {
  icon?: string;
  title: string;
  items?: string[];
  body?: string;
};

export type ServiceListBlock = {
  heading: string;
  items: string[];
  /** Render each pill as a link that pre-fills the contact form's preferred destination field. */
  linkToContact?: boolean;
};

export type Faq = {
  q: string;
  a: string;
};

export type ServicePage = {
  slug: string;
  icon: string;
  navTitle: string;
  cardBody: string;
  cardPoints: string[];
  metaTitle: string;
  metaDescription: string;
  summary: string;
  eyebrow: string;
  headlineLines: string[];
  intro: string[];
  tagSections?: ServiceListBlock[];
  checklist?: ServiceListBlock;
  checklist2?: ServiceListBlock;
  categories?: ServiceCategory[];
  ribbon?: string[];
  closingHeadline?: string;
  closingBody?: string;
  disclaimer?: string;
  faqs: Faq[];
  /** Shown as one of the main service cards on the homepage and /services index. */
  featured: boolean;
  /** Slugs of related, more specialised services surfaced on this service's page. */
  relatedSlugs?: string[];
  /** A single cross-link to a sibling service that's commonly confused with this one. `note` is the lead-in question, shown before a "See our X page" link. */
  seeAlso?: { slug: string; note: string };
  /** Shows the animated scrolling flag ticker (same one used on the homepage Destinations section). */
  showFlagTicker?: boolean;
};

export function featuredServices(list: ServicePage[]): ServicePage[] {
  return list.filter((s) => s.featured);
}

export function relatedServices(list: ServicePage[], slugs: string[] | undefined): ServicePage[] {
  if (!slugs) return [];
  return slugs
    .map((slug) => list.find((s) => s.slug === slug))
    .filter((s): s is ServicePage => Boolean(s));
}

export const services: ServicePage[] = [
  {
    slug: "study-abroad",
    icon: "🎓",
    navTitle: "Student Visa",
    cardBody:
      "Study abroad, MBBS and student visa guidance for the UK, USA, Canada, Australia, New Zealand, Europe and more.",
    cardPoints: [
      "20+ destinations explored with you",
      "Course and university shortlisting",
      "SOP, documentation and student visa preparation",
    ],
    metaTitle: "Study Abroad & Student Visa Consultants in Kerala",
    metaDescription:
      "Explore study abroad and MBBS options with Skandiora in Kerala. Course guidance, admissions, student visa and arrival support. Request a free consultation.",
    summary:
      "Skandiora Immigration is a student visa and study-abroad consultancy that helps students in Kerala and across South India choose the right destination, course and university, then prepare a clear student visa application — not just process admissions.",
    eyebrow: "Student visa",
    featured: true,
    relatedSlugs: ["mbbs-abroad", "education-loan", "language-training"],
    showFlagTicker: true,
    headlineLines: [
      "Choose the right destination.",
      "Choose the right course.",
      "Choose the right guidance.",
    ],
    intro: [
      "Choosing where to study, what to study, and how to build your career is a decision that can shape your future.",
      "At Skandiora Immigration, we believe a good education decision starts with understanding you — your academic background, ambitions, preferred course, budget, eligibility and future plans.",
      "We help students and families explore suitable education pathways with clarity, transparency and personalised guidance.",
      "This includes MBBS abroad — if medicine is your goal, our dedicated MBBS Abroad guidance covers university recognition, eligibility and regulatory requirements in more depth.",
    ],
    tagSections: [
      {
        heading: "Popular destinations",
        linkToContact: true,
        items: ["UK", "USA", "Canada", "Australia", "New Zealand", "Dubai"],
      },
      {
        heading: "Europe",
        linkToContact: true,
        items: [
          "Ireland",
          "Germany",
          "France",
          "Italy",
          "Spain",
          "Poland",
          "Malta",
          "Lithuania",
          "Latvia",
          "Bulgaria",
          "Moldova",
          "Hungary",
          "Albania",
          "Cyprus",
          "Finland",
          "Sweden",
          "Switzerland",
          "Romania",
          "Bosnia",
        ],
      },
      {
        heading: "Also explore",
        linkToContact: true,
        items: ["Singapore", "Mauritius", "And other suitable destinations"],
      },
    ],
    checklist: {
      heading: "Our support",
      items: [
        "Free initial counselling",
        "Course analysis and university shortlisting",
        "Apply to 3–4 shortlisted universities",
        "SOP and document preparation",
      ],
    },
    checklist2: {
      heading: "Beyond your offer letter",
      items: [
        "Scholarship opportunity guidance",
        "Financial and education-loan guidance",
        "Student visa guidance and interview preparation",
        "Part-time work rules for your destination",
        "Pre-departure briefing",
      ],
    },
    ribbon: ["Listen", "Understand", "Explore", "Compare", "Guide", "Support"],
    closingHeadline: "The right destination isn't the same for every student.",
    closingBody:
      "We help you explore options based on your academic profile, course preference, eligibility, budget and career goals. From your first counselling session to admission, documentation, visa preparation and pre-departure support, we're here to help you move forward with greater confidence.",
    disclaimer:
      "Destination and institution suitability depends on the student's profile, eligibility, course requirements and applicable regulations.",
    faqs: [
      {
        q: "Which countries does Skandiora Immigration help students apply to?",
        a: "We help students explore study options across the UK, USA, Canada, Australia, New Zealand and Dubai, plus countries across Europe including Ireland, Germany, France, Italy, Spain and Poland, along with Singapore and Mauritius.",
      },
      {
        q: "How does Skandiora decide which destination is right for me?",
        a: "We start by understanding your academic background, ambitions, preferred course, budget, eligibility and future plans, then help you compare destinations against those factors rather than recommending whatever is popular.",
      },
      {
        q: "Do you only help with admissions, or also with visas and documentation?",
        a: "We support the full journey — from your first counselling session through admission, documentation, visa preparation and pre-departure support.",
      },
      {
        q: "Is Skandiora Immigration only for students who want to study abroad?",
        a: "No. We also help students who prefer to continue their education in India, students exploring credit transfer after a discontinued degree, and applicants for MBBS abroad specifically.",
      },
      {
        q: "Can I apply to more than one university?",
        a: "Yes — as part of our shortlisting process, we typically help you apply to 3–4 well-matched universities per intake, balancing your chances with a manageable, well-prepared application for each.",
      },
      {
        q: "Do you help with scholarships and part-time work?",
        a: "We help you explore scholarship opportunities that may be available for your shortlisted courses and universities, alongside guidance on part-time work rules at your destination and education-loan support if needed.",
      },
      {
        q: "Do you help with visa interview preparation and pre-departure briefing?",
        a: "Yes — where your destination requires a visa interview, we help you prepare alongside your documentation, and every applicant gets a pre-departure briefing before travel.",
      },
    ],
  },
  {
    slug: "mbbs-abroad",
    icon: "🩺",
    navTitle: "MBBS Abroad",
    cardBody:
      "Careful, informed guidance for aspiring doctors evaluating medical universities in Europe, Central Asia and the USA.",
    cardPoints: [
      "Recognised and accredited universities only",
      "Eligibility and regulatory guidance",
      "Pre-departure assistance",
    ],
    metaTitle: "MBBS Abroad Consultants — Skandiora Immigration",
    metaDescription:
      "MBBS abroad guidance from Skandiora Immigration's Kerala and Chennai offices — university recognition, eligibility, clinical training and regulatory requirements explained before you enrol.",
    summary:
      "Skandiora Immigration guides aspiring doctors through MBBS admissions abroad, helping families evaluate university recognition, eligibility and regulatory requirements before enrolling.",
    eyebrow: "MBBS abroad",
    featured: false,
    headlineLines: ["Your medical dream deserves careful guidance."],
    intro: [
      "For aspiring doctors, choosing a medical university abroad is a major decision — for the student and the entire family.",
      "That's why we encourage students and parents to look beyond advertisements and carefully evaluate the university, course and applicable regulatory requirements.",
    ],
    tagSections: [
      {
        heading: "Explore medical education opportunities in",
        items: ["Moldova", "Bulgaria", "Georgia", "Uzbekistan", "Tajikistan", "Kazakhstan", "USA"],
      },
    ],
    checklist: {
      heading: "Our support",
      items: [
        "Profile & eligibility guidance",
        "University option exploration",
        "Application assistance",
        "Documentation support",
        "Admission process guidance",
        "Pre-departure assistance",
      ],
    },
    checklist2: {
      heading: "Before you choose, understand",
      items: [
        "University recognition & accreditation",
        "Eligibility requirements",
        "Course structure & duration",
        "Tuition fees & other expenses",
        "Clinical training arrangements",
        "Internship requirements",
        "Applicable regulatory requirements",
      ],
    },
    closingHeadline: "A medical degree is a long-term investment.",
    closingBody: "Take the time to understand your university before you enrol.",
    disclaimer:
      "Recognition, eligibility and licensing requirements may vary by institution and destination. Students and parents should independently verify applicable requirements before enrolment.",
    faqs: [
      {
        q: "Which countries can I study MBBS in through Skandiora Immigration?",
        a: "We help aspiring doctors explore recognised medical universities in Moldova, Bulgaria, Georgia, Uzbekistan, Tajikistan, Kazakhstan and the USA.",
      },
      {
        q: "How do you help verify a medical university is genuine?",
        a: "We encourage students and parents to evaluate university recognition and accreditation, eligibility requirements, course structure, tuition and other expenses, clinical training arrangements, internship requirements and applicable regulatory requirements before enrolling — not just advertisements.",
      },
      {
        q: "Does Skandiora guarantee admission or medical licensing after an MBBS abroad?",
        a: "No. Recognition, eligibility and licensing requirements vary by institution and destination, and students and parents should independently verify applicable requirements before enrolment.",
      },
      {
        q: "What support do you provide for MBBS abroad applicants?",
        a: "Profile and eligibility guidance, university option exploration, application assistance, documentation support, admission process guidance and pre-departure assistance.",
      },
    ],
  },
  {
    slug: "study-in-india",
    icon: "🏫",
    navTitle: "Domestic Admission",
    cardBody: "Domestic admission assistance across Kerala, Tamil Nadu, Karnataka and Andhra Pradesh.",
    cardPoints: [
      "Direct and management quota seats",
      "Fee structure clarity before you commit",
      "Course and eligibility guidance",
    ],
    metaTitle: "Domestic Admission Consultants in South India — Skandiora Immigration",
    metaDescription:
      "Domestic admission assistance across Kerala, Tamil Nadu, Karnataka and Andhra Pradesh — engineering, degree, diploma, paramedical and management programmes, from Skandiora Immigration.",
    summary:
      "Skandiora Immigration provides domestic admission assistance for engineering, degree, diploma and management courses across Kerala, Tamil Nadu, Karnataka and Andhra Pradesh.",
    eyebrow: "Domestic admission",
    featured: true,
    headlineLines: ["Your future doesn't always have to take you abroad."],
    intro: [
      "International education can be an excellent option — but it isn't the only option.",
      "For students who prefer to continue their education closer to home, we provide domestic admission assistance for suitable courses and institutions.",
    ],
    tagSections: [
      {
        heading: "Explore options across",
        items: ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh"],
      },
    ],
    checklist: {
      heading: "We help candidates explore options based on",
      items: ["Academic background", "Course preference", "Eligibility", "Career goals"],
    },
    checklist2: {
      heading: "Study formats we help you explore",
      items: [
        "Full-time degree, diploma and paramedical programmes",
        "Direct and management-quota seats",
        "Distance and online education options",
      ],
    },
    closingHeadline: "The best choice is the one that fits you.",
    faqs: [
      {
        q: "Which states does Skandiora Immigration provide domestic admission assistance in?",
        a: "We assist with admissions across Kerala, Tamil Nadu, Karnataka and Andhra Pradesh.",
      },
      {
        q: "What kind of seats can you help me find in India?",
        a: "We help candidates explore direct and management-quota seats in engineering, degree, diploma, paramedical and management programmes, based on academic background, course preference, eligibility and career goals.",
      },
      {
        q: "Is studying in India a lesser option compared to studying abroad?",
        a: "Not at all — international education is an excellent option, but it isn't the only one. The best choice is the one that fits you, and for many students that means continuing their education closer to home.",
      },
      {
        q: "Do you help with distance or online degree options?",
        a: "Yes — alongside full-time domestic admissions, we help you explore distance and online education options where that better suits your goals or circumstances.",
      },
    ],
  },
  {
    slug: "credit-transfer",
    icon: "🔄",
    navTitle: "Credit Transfer",
    cardBody: "Discontinued your degree, B.Tech, diploma or PG? Explore eligible credit-transfer pathways to continue your studies.",
    cardPoints: [
      "Academic profile and credit review",
      "Recognised university options",
      "Application support end to end",
    ],
    metaTitle: "Credit Transfer Assistance in Kerala — Skandiora Immigration",
    metaDescription:
      "Explore credit transfer for interrupted Degree, Diploma, B.Tech or Master's studies with Skandiora Immigration in Kerala. Academic review and admission support.",
    summary:
      "Skandiora Immigration provides credit transfer assistance for students in Kerala and across South India whose Degree, Diploma, B.Tech or Master's studies have been interrupted by academic backlogs, pending subjects or a break in education.",
    eyebrow: "Credit transfer assistance",
    featured: true,
    headlineLines: ["Your education journey can continue."],
    intro: [
      "Your past academic progress still matters. We help you explore opportunities to transfer eligible academic credits to a university that matches your academic background and requirements, subject to its assessment and acceptance.",
      "Explore university options in South India and North India, with guidance from academic record review and credit assessment preparation to university selection, documentation and admission support.",
    ],
    checklist: {
      heading: "How we help with credit transfer",
      items: [
        "Academic record evaluation and profile review",
        "Guidance on preparing records for university credit assessment",
        "University selection across South India and North India",
        "Documentation and credit-transfer process guidance",
        "Application and admission support",
      ],
    },
    closingHeadline: "Your journey may have taken a different path. Your goal can still move forward.",
    closingBody: "Speak with our admissions team to understand your credit transfer options and take the next step towards completing your qualification.",
    disclaimer:
      "Credit transfer is subject to evaluation and acceptance by the respective university. Final decisions depend on the institution's academic policies, eligibility requirements and assessment of previous studies.",
    faqs: [
      {
        q: "What is credit transfer and who is it for?",
        a: "Credit transfer allows a university to assess credits earned during previous studies for use towards another programme. Skandiora Immigration helps students with interrupted Degree, Diploma, B.Tech or Master's studies explore suitable options, subject to the receiving university's requirements.",
      },
      {
        q: "Can I explore credit transfer if I have backlogs or pending subjects?",
        a: "You can request an academic profile review if backlogs or pending subjects have interrupted your studies. The receiving university decides which completed credits it can accept and what subjects or other requirements remain. Admission and credit acceptance are not guaranteed.",
      },
      {
        q: "Do you help with university options in South India and North India?",
        a: "Yes. We help you explore university options in South India and North India based on your academic background, previous studies and requirements. Suitable options depend on programme availability and the university's credit-transfer policies.",
      },
      {
        q: "Will all my previous credits be accepted?",
        a: "Credit transfer is subject to evaluation and acceptance by the respective university. Final decisions depend on the institution's academic policies, eligibility requirements and assessment of your previous studies.",
      },
      {
        q: "What does Skandiora Immigration help with in a credit-transfer case?",
        a: "We provide academic record review, guidance on preparing for credit assessment, university selection, documentation and admission support. The receiving university makes the final decision on eligibility and the credits it accepts.",
      },
    ],
  },
  {
    slug: "education-loan",
    icon: "💰",
    navTitle: "Education Loan Assistance",
    cardBody: "Understand your financing options and prepare a loan-ready application.",
    cardPoints: ["Documentation guidance", "Application process support", "Lender coordination"],
    metaTitle: "Education Loan Assistance in Kerala — Skandiora Immigration",
    metaDescription:
      "Plan your study-abroad or domestic education financing with documentation guidance, application support and lender coordination from Skandiora Immigration's counsellors in Kerala, Tamil Nadu and Chennai.",
    summary:
      "Skandiora Immigration helps students and families understand and prepare their education loan financing, from documentation guidance to lender coordination.",
    eyebrow: "Education loan assistance",
    featured: false,
    headlineLines: ["Plan your education.", "Understand your financing options."],
    intro: [
      "Education is an important investment.",
      "Understanding how to manage the financial side of your education can make the planning process easier for students and families.",
    ],
    checklist: {
      heading: "We provide assistance with",
      items: [
        "Documentation guidance",
        "Application process guidance",
        "Education-finance assistance",
        "Coordination support",
      ],
    },
    closingHeadline: "From planning to application,",
    closingBody: "we help you understand the process.",
    disclaimer:
      "Loan approval is subject to the respective lender's eligibility criteria, documentation requirements, terms and final decision.",
    faqs: [
      {
        q: "Does Skandiora Immigration provide education loans directly?",
        a: "We provide documentation guidance, application process guidance, education-finance assistance and coordination support to help you prepare a loan-ready application. Loan approval itself is subject to the respective lender's eligibility criteria, documentation requirements, terms and final decision.",
      },
      {
        q: "When should I start planning my education loan?",
        a: "As early as possible in your admission planning — understanding your financing options alongside your course and destination choice makes the overall process easier.",
      },
    ],
  },
  {
    slug: "language-training",
    icon: "🌐",
    navTitle: "Language Training",
    cardBody: "Structured IELTS, TOEFL, OET and German preparation to build confidence for your next step.",
    cardPoints: ["Exam-focused preparation", "Practice sessions and mock tests", "Personalised coaching"],
    metaTitle: "IELTS, TOEFL, OET & German Language Training — Skandiora Immigration",
    metaDescription:
      "Structured, exam-focused IELTS, TOEFL, OET and German language training with practice sessions, mock tests and personalised support at Skandiora Immigration's Trivandrum, Kochi and Chennai centres.",
    summary:
      "Skandiora Immigration provides structured IELTS, TOEFL, OET and German language training to help students meet the language requirements of their chosen study destination.",
    eyebrow: "Language training",
    featured: false,
    headlineLines: ["Build your language.", "Boost your confidence."],
    intro: [
      "Strong language skills can open opportunities in education, professional environments and international destinations.",
    ],
    tagSections: [
      {
        heading: "Training for",
        items: ["IELTS", "TOEFL", "OET", "German"],
      },
    ],
    checklist: {
      heading: "Our training support",
      items: [
        "Expert guidance",
        "Exam-focused preparation",
        "Practice sessions",
        "Mock tests",
        "Personalised support",
      ],
    },
    ribbon: ["Learn", "Practise", "Prepare", "Achieve"],
    closingBody:
      "Whether you're preparing for an English-language examination or developing German language skills, structured preparation can help you approach your next step with greater confidence.",
    faqs: [
      {
        q: "Which exams does Skandiora Immigration provide training for?",
        a: "We provide structured training for IELTS, TOEFL, OET and German language proficiency.",
      },
      {
        q: "What does the training include?",
        a: "Expert guidance, exam-focused preparation, practice sessions, mock tests and personalised support.",
      },
      {
        q: "Do I need language training even if I'm already confident in English?",
        a: "Most destinations and universities require a specific certified score, so structured, exam-focused preparation helps you approach the test with greater confidence regardless of your existing fluency.",
      },
    ],
  },
  {
    slug: "attestation",
    icon: "📑",
    navTitle: "Attestation",
    cardBody:
      "Clear guidance through HRD, MEA, embassy and notary attestation for education and overseas documents.",
    cardPoints: ["Documentation guidance", "Attestation process support", "Less confusion, more clarity"],
    metaTitle: "Document Attestation Assistance — Skandiora Immigration",
    metaDescription:
      "Guidance and process support for educational, personal and commercial document attestation — notary, HRD, MEA and embassy channels — from Skandiora Immigration in Kerala and Tamil Nadu.",
    summary:
      "Skandiora Immigration provides guidance and process support for educational, personal and commercial document attestation through notary, HRD, MEA and embassy channels.",
    eyebrow: "Attestation assistance",
    featured: true,
    headlineLines: ["When your documents matter,", "every step matters."],
    intro: ["Preparing documents for education and overseas purposes can sometimes feel complicated."],
    checklist: {
      heading: "We provide assistance and process guidance for",
      items: ["Documentation", "Attestation requirements", "Process guidance"],
    },
    closingHeadline: "Less confusion. More clarity.",
    closingBody: "We help you understand the documentation process and prepare for the required steps.",
    faqs: [
      {
        q: "What is document attestation and why is it needed?",
        a: "Attestation is the process of verifying educational, personal and commercial documents through notary, HRD, MEA and embassy channels so they are accepted for education and overseas purposes.",
      },
      {
        q: "What kind of support does Skandiora provide for attestation?",
        a: "Guidance and process support for documentation, attestation requirements and the overall process, so you understand each required step before you submit your documents.",
      },
    ],
  },
  {
    slug: "accommodation",
    icon: "🏠",
    navTitle: "Accommodation Assistance",
    cardBody: "Explore accommodation options suited to your destination before you travel.",
    cardPoints: ["Destination-specific options", "Guidance before you arrive", "Smoother transition abroad"],
    metaTitle: "Student Accommodation Assistance — Skandiora Immigration",
    metaDescription:
      "Explore suitable student accommodation options for your study destination before you travel, with guidance from Skandiora Immigration's counsellors in Kerala and Tamil Nadu.",
    summary:
      "Skandiora Immigration helps students explore suitable accommodation options in their study destination before they travel, easing the transition to a new city or country.",
    eyebrow: "Accommodation assistance",
    featured: false,
    headlineLines: ["Your journey doesn't end with admission."],
    intro: [
      "Moving to a new city or country is a major step.",
      "Finding suitable accommodation before you travel can make your transition easier.",
      "We assist students in exploring accommodation options according to their destination and requirements.",
    ],
    checklist: {
      heading: "Our support",
      items: [
        "Accommodation options suited to your destination and budget",
        "Guidance before you arrive",
        "Airport pickup coordination in select countries",
      ],
    },
    closingHeadline: "From admission to arrival,",
    closingBody: "we help you prepare for the next step.",
    faqs: [
      {
        q: "Does Skandiora Immigration help find accommodation abroad?",
        a: "We assist students in exploring accommodation options according to their destination and requirements before they travel.",
      },
      {
        q: "When should I start looking for accommodation?",
        a: "As soon as your admission is confirmed — finding suitable accommodation before you travel makes the transition to a new city or country easier.",
      },
      {
        q: "Do you help with airport pickup on arrival?",
        a: "In select countries, we help coordinate airport pickup as part of your arrival support. Availability depends on your destination and our partner network there.",
      },
    ],
  },
  {
    slug: "visa-assistance",
    icon: "✈️",
    navTitle: "Visa Services",
    cardBody:
      "Preparation and documentation guidance for visiting, spouse/dependent and other visa categories beyond student visas.",
    cardPoints: [
      "Application and documentation guidance",
      "Process guidance for every category",
      "Clearer, better-organised applications",
    ],
    metaTitle: "Visiting, Spouse & Dependent Visa Services — Skandiora Immigration",
    metaDescription:
      "Application and documentation guidance for visiting, spouse/dependent and other visa categories from Skandiora Immigration's Trivandrum, Kochi and Chennai offices — clearer process, better preparation.",
    summary:
      "Skandiora Immigration provides application and documentation guidance for visiting, spouse/dependent and other non-student visa categories across multiple destinations.",
    eyebrow: "Visa services",
    featured: true,
    relatedSlugs: ["accommodation"],
    headlineLines: ["From application to visa,", "we help you prepare."],
    intro: [
      "Beyond study, family and travel plans often need their own visa preparation.",
      "Preparing the right visa application and supporting documentation makes the difference between a smooth process and a stressful one.",
      "We provide assistance for eligible applicants seeking visiting, spouse/dependent and other visa categories.",
    ],
    seeAlso: { slug: "study-abroad", note: "Applying for a student visa instead?" },
    categories: [
      {
        icon: "🌍",
        title: "Visiting visa",
        body: "Guidance for eligible applicants seeking visiting or tourist visas, including documentation and application-process assistance.",
      },
      {
        icon: "💍",
        title: "Spouse / dependent visa",
        body: "Guidance and documentation assistance for eligible spouse/dependent visa applications, subject to the destination country's rules.",
      },
      {
        icon: "📋",
        title: "Other visa categories",
        body: "Depending on your destination and circumstances, we can help you understand applicable visa categories and the associated process.",
      },
    ],
    closingHeadline: "Our promise",
    closingBody: "Clearer process. Organised documentation. Better preparation.",
    disclaimer:
      "Visa approval is always subject to applicable immigration laws, eligibility requirements and the decision of the relevant authorities. Skandiora Immigration does not guarantee visa approval.",
    faqs: [
      {
        q: "What types of visas does Skandiora Immigration assist with here?",
        a: "Visiting/tourist visas, spouse/dependent visas, and other non-student visa categories depending on your destination and circumstances. Student visa guidance is covered on our separate Student Visa page.",
      },
      {
        q: "Does Skandiora Immigration guarantee visa approval?",
        a: "No. Visa approval is always subject to applicable immigration laws, eligibility requirements and the decision of the relevant authorities. We do not guarantee visa approval — our role is to help you prepare a clearer, better-organised application.",
      },
      {
        q: "What does spouse or dependent visa assistance include?",
        a: "Guidance and documentation assistance for eligible spouse/dependent visa applications, subject to the destination country's rules.",
      },
    ],
  },
];

export function getService(slug: string): ServicePage | undefined {
  return services.find((s) => s.slug === slug);
}

/** Flat, deduped list of destination names sourced from the Student Visa page's pills — drives the contact form's "Preferred destination" field. */
export const destinationOptions: string[] = Array.from(
  new Set(
    (getService("study-abroad")?.tagSections ?? [])
      .filter((block) => block.linkToContact)
      .flatMap((block) => block.items)
  )
);
