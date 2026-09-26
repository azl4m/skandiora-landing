import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getPrivacyPage, getSettings } from "@/lib/cms/content";
import { pageMetadata } from "@/lib/cms/metadata";
import { privacyPolicy } from "@/data/privacy";

const breadcrumbItems = [{ href: "/", label: "Home" }, { label: "Privacy policy" }];

const description =
  "How Skandiora Immigration handles your information: the website stores nothing, and enquiry forms simply open WhatsApp with your message pre-filled.";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPrivacyPage(privacyPolicy);
  return pageMetadata(seo, { title: "Privacy Policy", description, path: "/privacy" });
}

export default async function PrivacyPage() {
  const [policy, { site }] = await Promise.all([getPrivacyPage(privacyPolicy), getSettings()]);
  const sections = policy.sections;
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <PageHero
        breadcrumbs={breadcrumbItems}
        eyebrow="Privacy policy"
        title={policy.title}
        intro={[`Last updated ${policy.lastUpdated}.`]}
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
