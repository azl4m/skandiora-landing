export type PolicySection = { heading: string; body: string[] };

/** Built-in privacy policy text; also the starting content imported into Sanity. */
export const privacyPolicy: { title: string; lastUpdated: string; lastUpdatedIso: string; sections: PolicySection[] } = {
  title: "Your privacy, in plain words.",
  lastUpdated: "25 September 2026",
  lastUpdatedIso: "2026-09-25",
  sections: [
  {
    heading: "The short version",
    body: [
      "This website does not collect or store your personal information. There are no accounts, no databases of enquiries and no tracking cookies.",
    ],
  },
  {
    heading: "Our enquiry forms",
    body: [
      "When you fill in a form on this website, your details stay in your own browser. They are used only to prepare a WhatsApp message to our team.",
      "Submitting the form opens WhatsApp with that message already written. Nothing is sent to us until you choose to press send in WhatsApp.",
    ],
  },
  {
    heading: "When you contact us",
    body: [
      "Information you send us by WhatsApp, phone or email — such as your name, phone number, academic details or documents — is used only to respond to your enquiry and to guide you.",
      "We do not sell your details or share them for marketing. Where an application needs your information to be shared, for example with a university, lender or authority, we do so only with your agreement.",
    ],
  },
  {
    heading: "WhatsApp",
    body: [
      "WhatsApp is operated by Meta. Messages you send us through WhatsApp are also covered by WhatsApp’s own privacy policy.",
    ],
  },
  {
    heading: "Cookies and tracking",
    body: [
      "We do not use analytics, advertising or tracking cookies. Like any website, our hosting provider may record standard technical information, such as IP addresses, to keep the site secure and working.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can ask us at any time what information we hold from your conversations with us, or ask us to delete it, using the contact details below.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "If we change how we handle information — for example, if we start using analytics — we will update this page and the date at the top.",
    ],
  },
],
};
