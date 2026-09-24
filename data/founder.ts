export type Founder = {
  name: string;
  role: string;
  headline: string;
  bio: string[];
  credentials: { label: string; detail: string }[];
  signoff: string;
  education: { name: string; location: string }[];
  image: {
    src: string;
    /**
     * True while a stock photo stands in for the real portrait. Placeholder
     * images are hidden from screen readers and left out of structured data,
     * so they are never presented as the founder. Set to false once replaced.
     */
    placeholder: boolean;
  };
};

export const founder: Founder = {
  name: "Ashwin R. Nair",
  role: "Founder, Skandiora Immigration",
  headline: "Personally guiding every step. Purposefully shaping every future.",
  bio: [
    "Ashwin R. Nair founded Skandiora Immigration to give students and families something often missing from admissions: time, honesty and a clear view of every option before a decision is made.",
    "With more than six years in education consultancy, he stays closely involved in each student's journey — from understanding their goals and academic background to course selection, university applications, admissions and study-abroad pathways.",
    "His own education in India and the United Kingdom shapes a practical, student-first approach: transparent advice, realistic expectations and genuine responsibility for every recommendation.",
  ],
  credentials: [
    { label: "6+ years", detail: "in education consultancy" },
    { label: "MBA", detail: "Cardiff Metropolitan University, UK" },
    { label: "Graduate", detail: "Rajagiri College of Management and Applied Sciences" },
  ],
  signoff: "At Skandiora, every student is more than an application — they're a future we help build.",
  education: [
    { name: "Cardiff Metropolitan University", location: "Cardiff, United Kingdom" },
    { name: "Rajagiri College of Management and Applied Sciences", location: "Kochi, India" },
  ],
  // Placeholder portrait from Unsplash. Replace with a real photo of the founder.
  image: {
    src: "https://images.unsplash.com/photo-1758598497628-942ad38a6dc4?q=80&w=1000&auto=format&fit=crop",
    placeholder: true,
  },
};
