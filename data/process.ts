export type Step = {
  no: string;
  title: string;
  body: string;
};

export const steps: Step[] = [
  {
    no: "01",
    title: "Understand",
    body: "We begin by understanding you — your academic background, goals, preferences and plans.",
  },
  {
    no: "02",
    title: "Explore",
    body: "We help you explore suitable courses, destinations and institution options.",
  },
  {
    no: "03",
    title: "Compare",
    body: "We encourage you to consider eligibility, recognition, fees, course requirements and other important factors.",
  },
  {
    no: "04",
    title: "Guide",
    body: "We provide guidance through the application and documentation process.",
  },
  {
    no: "05",
    title: "Support",
    body: "We assist with admission, visa preparation and related student services.",
  },
  {
    no: "06",
    title: "Prepare",
    body: "We help you prepare for the next stage — from pre-departure planning to your transition into student life.",
  },
];

export type Assurance = {
  stat: string;
  label: string;
};

export const assurances: Assurance[] = [
  { stat: "Named", label: "counsellor owns your file from start to finish" },
  { stat: "Verifiable", label: "certificates from recognised universities only" },
  { stat: "No hidden", label: "fees — full cost shared before you pay" },
  { stat: "Mon–Sat", label: "support, including post-arrival queries" },
];
