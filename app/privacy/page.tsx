import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { shareMetadata } from "@/lib/share-image";
import { site } from "@/data/site";

const breadcrumbItems = [{ href: "/", label: "Home" }, { label: "Privacy policy" }];

const description =
  "How Skandiora Immigration handles your information: the website stores nothing, and enquiry forms simply open WhatsApp with your message pre-filled.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: "/privacy" },
  ...shareMetadata("Privacy Policy | Skandiora Immigration", description, "/privacy"),
};

const LAST_UPDATED = "25 September 2026";

const sections = [
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
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <PageHero
        breadcrumbs={breadcrumbItems}
        eyebrow="Privacy policy"
        title="Your privacy, in plain words."
        intro={[`Last updated ${LAST_UPDATED}.`]}
      />

      <section className="section-space px-4.5">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-[760px]">
            {sections.map((section, index) => (
              <div key={section.heading} className={index === 0 ? "" : "mt-9 pt-9 border-t border-gold/16"}>
                <h2 className="font-heading font-semibold text-[clamp(24px,2.6vw,30px)] leading-[1.2] text-cream m-0">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-[1.8] text-body-text mt-4 mb-0">{paragraph}</p>
                ))}
              </div>
            ))}

            <div className="mt-12 rounded-[18px] border border-gold/20 bg-surface p-6 min-[640px]:p-8">
              <h2 className="font-heading font-semibold text-[clamp(22px,2.4vw,28px)] leading-[1.2] text-cream m-0">Questions about your information?</h2>
              <p className="text-base leading-[1.8] text-body-text mt-3 mb-0">Contact Skandiora Immigration — offices in {site.offices.map((office) => office.city).join(", ")}.</p>
              <ul className="list-none p-0 m-0 mt-4 flex flex-col gap-2 text-base">
                <li>
                  Email: <a href={`mailto:${site.email}`} className="break-all underline underline-offset-4" style={{ color: "var(--gold)" }}>{site.email}</a>
                </li>
                <li>
                  Phone:{" "}
                  {site.phones.map((phone, index) => (
                    <span key={phone.href}>
                      {index > 0 && " / "}
                      <a href={`tel:${phone.href}`} className="underline underline-offset-4" style={{ color: "var(--gold)" }}>{phone.label}</a>
                    </span>
                  ))}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
