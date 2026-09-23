const offices = [
  { city: "Kochi", region: "Kerala" },
  { city: "Trivandrum", region: "Kerala" },
  { city: "Chennai", region: "Tamil Nadu" },
];

export const site = {
  phone: "+91 89213 85573",
  phoneHref: "+918921385573",
  phones: [
    { label: "+91 85475 31770", href: "+918547531770" },
    { label: "+91 89213 85573", href: "+918921385573" },
  ],
  offices,
  email: "immigrationskandiora@gmail.com",
  office: `${offices.map((office) => office.city).join(" · ")} · Mon–Sat, 9:30–6:30`,
  tagline: "Education guidance. Admission support. Journey support.",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services/study-abroad", label: "Study Abroad" },
  { href: "/services/mbbs-abroad", label: "MBBS Abroad" },
  { href: "/services", label: "All Services" },
  { href: "/about", label: "About" },
];
