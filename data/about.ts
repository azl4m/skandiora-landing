// Used by the home page About teaser.
export const vision =
  "To make families look beyond the admission — and see the person, the possibilities, and the consequences behind every education choice.";

// Placeholder editorial photography from Unsplash. Replace with owned images when available.
const photo = (id: string, width = 1600) => `https://images.unsplash.com/photo-${id}?q=80&w=${width}&auto=format&fit=crop`;

export const aboutHero = {
  eyebrow: "About us",
  title: "Education decisions are personal.",
  statement: "We look beyond the application to understand the person behind it.",
  body: "Every student arrives with a different story, ambition, circumstance, and definition of success. Our approach begins there.",
  caption: "Look beyond the application",
  image: { src: photo("1427504494785-3a9ca7044f45"), alt: "A student with a backpack walking between tall library shelves" },
};

export const visionMission = {
  label: "Vision & mission",
  title: "What we stand for.",
  vision: "Every education decision made with clarity — for the student, not just the admission.",
  mission: "To understand each student first, explain their options in India and abroad honestly, and guide them through every step that follows — admission, visa, finance and settling in.",
};

export const approach = {
  label: "Our approach",
  intro: "We begin with understanding, then help families make informed choices.",
  steps: [
    {
      number: 1,
      title: "Understand",
      body: "Start with the student's academic journey, goals, circumstances, and expectations.",
      tags: ["Academic journey", "Ambitions", "Strengths", "Circumstances", "Finances", "Future pathways"],
    },
    { number: 2, title: "Explore", body: "Explore suitable courses, institutions, countries, and alternative pathways based on the student's situation." },
    { number: 3, title: "Prepare", body: "Support the practical steps that follow — admission, visa, attestation, education loans, language preparation and accommodation." },
  ],
};

export const howWeHelp = {
  label: "How we help",
  title: "Education first. Support for the whole journey.",
  body: "Alongside education guidance, we help with the practical side of moving forward — including visit, spouse, family and dependent visas for families.",
};

export const paths = {
  label: "India & abroad",
  title: "More than one path can lead forward.",
  body: "Whether the next step is in India or abroad, we believe the right decision begins with understanding the options clearly.",
  options: [
    {
      label: "India",
      body: "Courses, institutions and pathways within India.",
      href: "/services/study-in-india",
      linkLabel: "Study in India",
      image: { src: photo("1524230507669-5ff97982bb5e", 1300), alt: "The pink sandstone facade of the Hawa Mahal in Jaipur against a clear sky" },
    },
    {
      label: "Abroad",
      body: "International education, country options and the practical requirements involved.",
      href: "/services/study-abroad",
      linkLabel: "Study abroad",
      image: { src: photo("1503917988258-f87a78e3c995", 1300), alt: "Paris rooftops along the Seine with the Eiffel Tower in the distance" },
    },
  ],
};

export const closing = {
  eyebrow: "Your next step",
  title: "Start with the student. Then find the right path.",
  body: "Have a question about what comes next? Begin with a conversation.",
  primary: { label: "Talk to us", href: "/#contact" },
  secondary: { label: "Explore our approach", href: "#approach" },
};

export const officeLocations = ["Kochi", "Trivandrum", "Chennai"];
