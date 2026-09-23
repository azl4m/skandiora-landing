import { ArrowRight, BookOpen, Check, FileCheck2, Files, GraduationCap, Landmark, MapPin, Route, Settings2 } from "lucide-react";
import type { ServicePage } from "@/data/services";
import { site } from "@/data/site";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import Breadcrumbs from "./Breadcrumbs";
import ContactForm from "./ContactForm";
import CtaBanner from "./CtaBanner";
import FaqSection from "./Faq";
import JsonLd from "./JsonLd";

const sectionClass = "max-w-[1240px] mx-auto px-5 min-[640px]:px-8";
const labelClass = "text-[11px] uppercase tracking-[0.2em] text-gold mb-3";
const headingClass = "font-heading text-[clamp(30px,4vw,46px)] leading-[1.12] text-cream text-pretty";
const steps = [
  { title: "Understand your academic record", body: "Tell us about your previous course, completed semesters, pending subjects and the point where your studies paused.", icon: Files },
  { title: "Explore suitable university options", body: "Compare possible pathways in South India and North India, and understand what the receiving university needs to assess your credits.", icon: Landmark },
  { title: "Prepare your next step", body: "Get documentation and application support, with clarity on the university’s decision and the requirements that remain.", icon: FileCheck2 },
];

export default function CreditTransferDetail({ service }: { service: ServicePage }) {
  const breadcrumbs = [{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: "Credit transfer" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(service.faqs)} />

      <section className="pt-7 pb-12 min-[900px]:pt-10 min-[900px]:pb-20 bg-[radial-gradient(ellipse_at_top_left,rgba(212,168,87,0.09),transparent_60%)]">
        <div className={sectionClass}>
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid min-[1000px]:grid-cols-[1.15fr_1fr] gap-10 min-[1000px]:gap-16 mt-9 items-start">
            <div className="min-w-0 min-[1000px]:pt-5">
              <p className={labelClass}>Credit transfer assistance</p>
              <h1 className="font-heading text-[clamp(42px,5.2vw,66px)] leading-[1.04] tracking-[-0.02em] text-cream max-w-[17ch] text-pretty">Your education journey <span className="text-gold-soft">can continue.</span></h1>
              <p className="font-heading text-[24px] leading-snug text-cream mt-6">{service.summary}</p>
              {service.intro.map((paragraph) => <p key={paragraph} className="mt-4 text-base leading-[1.8] text-body-text max-w-[55ch]">{paragraph}</p>)}
              <a href="#contact" className="inline-flex items-center gap-3 min-h-12 mt-6 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-[#0A1220] hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">Explore my credit transfer options <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
            <div id="contact" className="min-w-0 scroll-mt-28 min-[1000px]:pt-5">
              <p className={labelClass}>Free initial consultation</p>
              <h2 className="font-heading text-[30px] leading-tight text-cream mb-3">Start from where you are.</h2>
              <p className="text-sm leading-relaxed text-body-text mb-5">Share your name, phone number and, if you wish, your previous course. We’ll help you understand the next step.</p>
              <ContactForm variant="credit-transfer" />
              <div className="mt-6 flex gap-3 rounded-2xl border border-gold/15 bg-[#0B1422] p-5">
                <MapPin size={19} className="shrink-0 mt-0.5 text-gold" aria-hidden="true" />
                <div><p className="text-sm font-medium text-cream">Guidance close to you</p><p className="text-sm text-body-text mt-1">{site.offices.map((office) => office.city).join(" · ")}</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section-space ${sectionClass}`} aria-labelledby="credit-study-heading">
        <div className="border-y border-gold/16 py-8">
          <p className={labelClass}>Build on your previous studies</p>
          <h2 id="credit-study-heading" className="font-heading text-[28px] text-cream leading-tight mb-6">Explore options for your interrupted qualification.</h2>
          <ul className="grid grid-cols-2 min-[900px]:grid-cols-4 gap-3 min-[640px]:gap-5">
            {[["Degree", BookOpen], ["Diploma", Files], ["B.Tech", Settings2], ["Master’s", GraduationCap]].map(([label, Icon]) => {
              const CourseIcon = Icon as typeof BookOpen;
              return <li key={label as string} className="flex items-center gap-3 rounded-2xl bg-[#101A2B] border border-gold/15 px-4 py-5"><CourseIcon size={24} strokeWidth={1.5} className="text-gold shrink-0" aria-hidden="true" /><span className="text-base text-cream">{label as string}</span></li>;
            })}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-muted">Backlogs, pending subjects or a study break? Begin with an academic profile review to understand which options may fit your situation.</p>
        </div>
      </section>

      <section className={`section-space section-band ${sectionClass}`} aria-labelledby="credit-process-heading">
        <p className={labelClass}>A clearer way forward</p>
        <h2 id="credit-process-heading" className={headingClass}>How credit transfer assistance works</h2>
        <ol className="grid min-[800px]:grid-cols-3 gap-5 mt-8">
          {steps.map((step, index) => <li key={step.title} className="relative rounded-[22px] border border-gold/20 bg-[linear-gradient(145deg,#131E30,#0B1422)] p-6 min-[640px]:p-8">
            <div className="flex items-center justify-between"><step.icon size={28} strokeWidth={1.5} className="text-gold" aria-hidden="true" /><span className="font-heading text-4xl text-gold/40">0{index + 1}</span></div>
            <h3 className="font-heading text-[27px] leading-tight text-cream mt-7">{step.title}</h3>
            <p className="text-sm leading-[1.8] text-body-text mt-3">{step.body}</p>
          </li>)}
        </ol>
      </section>

      <section className={`section-space ${sectionClass}`} aria-labelledby="credit-universities-heading">
        <div className="grid min-[900px]:grid-cols-2 gap-9 min-[900px]:gap-16 items-start">
          <div>
            <p className={labelClass}>University options across India</p>
            <h2 id="credit-universities-heading" className={headingClass}>The right fit starts with your academic background.</h2>
            <p className="text-base text-body-text leading-[1.8] mt-5">Explore South Indian and North Indian university options based on your previous studies, requirements and goals. Our team helps you prepare for assessment and understand your choices.</p>
            <div className="grid min-[440px]:grid-cols-2 gap-4 mt-6">{["South India", "North India"].map((region) => <div key={region} className="flex items-center gap-3 rounded-2xl border border-gold/20 p-5"><Landmark size={23} className="text-gold shrink-0" aria-hidden="true" /><h3 className="text-base text-cream">{region}</h3></div>)}</div>
          </div>
          <div className="rounded-[22px] border border-gold/20 bg-[#101A2B] p-6 min-[640px]:p-8">
            <Route size={27} strokeWidth={1.5} className="text-gold mb-5" aria-hidden="true" />
            <h2 className="font-heading text-[28px] leading-tight text-cream">Support throughout the process</h2>
            <ul className="space-y-4 mt-5">{service.checklist?.items.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-body-text"><Check size={17} className="text-gold shrink-0 mt-0.5" aria-hidden="true" />{item}</li>)}</ul>
            <p className="mt-6 pt-5 border-t border-gold/15 text-sm leading-relaxed text-muted">{service.disclaimer}</p>
          </div>
        </div>
      </section>

      <FaqSection items={service.faqs} title="Your credit transfer questions, answered" />
      <CtaBanner title={service.closingHeadline} body={service.closingBody} href="#contact" buttonLabel="Speak with admissions" eyebrow="Your next chapter starts here" />
    </>
  );
}
