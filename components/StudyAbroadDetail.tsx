import Link from "next/link";
import { ArrowDown, ArrowRight, BriefcaseBusiness, Check, GraduationCap, HeartPulse, Hotel, Monitor, Plane, Settings2, Stethoscope } from "lucide-react";
import type { ServicePage } from "@/data/services";
import { studyCourses, studyFaqs } from "@/data/study-abroad";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import Breadcrumbs from "./Breadcrumbs";
import ContactForm from "./ContactForm";
import CardCarousel from "./CardCarousel";
import DestinationCard from "./DestinationCard";
import { featuredMbbsDestinations } from "@/data/mbbs-destinations";
import FaqSection from "./Faq";
import JsonLd from "./JsonLd";
import StudyEnquiryLink from "./StudyEnquiryLink";
import CtaBanner from "./CtaBanner";

const icons = { Stethoscope, Settings2, BriefcaseBusiness, Monitor, HeartPulse, Hotel, Plane, GraduationCap };
const primaryCta = "inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-[#0A1220] transition-colors hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";
const sectionClass = "max-w-[1240px] mx-auto px-5 min-[640px]:px-8";
const headingClass = "font-heading text-[clamp(30px,4vw,46px)] leading-[1.12] text-cream text-pretty";
const labelClass = "text-[11px] uppercase tracking-[0.2em] text-gold mb-3";

const support = [
  ["01", "Find your direction", "Compare countries, courses and universities against your qualifications, budget and future plans."],
  ["02", "Prepare your application", "Get help with admissions, supporting documents and a clear, organised application."],
  ["03", "Get ready for your visa", "Understand the documents and preparation needed for your student visa application."],
  ["04", "Prepare for life abroad", "Plan your departure with accommodation assistance and practical guidance before you travel."],
];

export default function StudyAbroadDetail({ service }: { service: ServicePage }) {
  const breadcrumbs = [{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: "Student visa & study abroad" }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(studyFaqs)} />

      <section className="pt-7 pb-12 min-[900px]:pt-10 min-[900px]:pb-20 bg-[radial-gradient(ellipse_at_top_left,rgba(212,168,87,0.09),transparent_60%)]">
        <div className={sectionClass}>
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid min-[1000px]:grid-cols-[1.1fr_1fr] gap-10 min-[1000px]:gap-16 mt-9 items-start">
            <div className="min-w-0 min-[1000px]:pt-5">
              <p className={labelClass}>Study abroad & student visa guidance</p>
              <h1 className="font-heading text-[clamp(42px,5.2vw,66px)] leading-[1.04] text-cream tracking-[-0.02em] max-w-[15ch] text-pretty">Your ambition. Your destination. <span className="text-gold-soft">Your future.</span></h1>
              <p className="text-base leading-[1.8] text-body-text mt-5 max-w-[53ch]">At Skandiora Immigrations, we provide personalised guidance for students planning to study abroad. Based on your academic profile, interests, budget, and future goals, we help you choose the right course, university, and destination.</p>
              <div className="mt-5 max-w-[53ch]">
                <p className="text-sm font-medium text-cream">Explore opportunities across:</p>
                <p className="text-base leading-[1.8] text-body-text mt-2">USA, Canada, UK, Australia, New Zealand, Ireland, Europe, Singapore, Dubai, Malaysia, and more.</p>
              </div>
              <p className="text-base leading-[1.8] text-body-text mt-5 max-w-[53ch]">From course and university selection to applications, documentation, visa guidance, scholarships, and pre-departure support, we are with you at every step.</p>
              <div className="mt-7 border-l-2 border-gold/40 pl-5 max-w-[53ch]">
                <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-gold-soft">Your next opportunity starts now.</h2>
                <p className="text-sm leading-[1.8] text-body-text mt-3">Start early to explore more courses, universities, and intake options.</p>
                <p className="text-sm leading-[1.8] text-body-text mt-2">Get your profile assessed. Explore your options. Start your application.</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-7">
                <a href="#contact" className={primaryCta}>Book Your Consultation Now <ArrowRight size={17} aria-hidden="true" /></a>
                <a href="#courses" className="inline-flex items-center gap-2 min-h-12 px-3 text-sm text-cream hover:text-gold focus-visible:outline-2 focus-visible:outline-gold">Find your course <ArrowDown size={15} aria-hidden="true" /></a>
              </div>
              <div className="mt-6 max-w-[53ch]">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-cream">Skandiora Immigrations</p>
                <p className="text-sm leading-relaxed text-muted mt-2">International Education. Thoughtfully Guided. Globally Connected.</p>
              </div>
              <ul className="mt-7 grid grid-cols-1 min-[440px]:grid-cols-2 gap-3">
                <li className="min-[440px]:col-span-2">
                  <a href="#academic-options" className="group flex items-center gap-3 rounded-2xl border border-gold/50 bg-[linear-gradient(115deg,rgba(212,168,87,0.18),rgba(212,168,87,0.04))] p-4 transition-colors hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
                    <span className="grid place-items-center w-10 h-10 shrink-0 rounded-xl bg-gold/15 text-gold-soft"><GraduationCap size={22} aria-hidden="true" /></span>
                    <span className="min-w-0 flex-1"><span className="block text-[15px] font-medium leading-snug text-gold-soft">Low marks or Plus Two not cleared?</span><span className="block mt-1 text-xs leading-relaxed text-body-text">Let’s explore your options, based on your eligibility.</span></span>
                    <ArrowRight size={17} className="shrink-0 text-gold" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="#courses" className="flex h-full items-start gap-3 rounded-2xl border border-gold/25 bg-[#101A2B] p-4 transition-colors hover:border-gold/65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
                    <Stethoscope size={20} className="shrink-0 mt-0.5 text-gold" aria-hidden="true" />
                    <span><span className="block text-sm font-medium text-cream">MBBS & beyond</span><span className="block mt-1 text-xs leading-relaxed text-body-text">Find a course that fits your ambition.</span></span>
                  </a>
                </li>
                <li>
                  <a href="#support" className="flex h-full items-start gap-3 rounded-2xl border border-gold/25 bg-[#101A2B] p-4 transition-colors hover:border-gold/65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
                    <Plane size={20} className="shrink-0 mt-0.5 text-gold" aria-hidden="true" />
                    <span><span className="block text-sm font-medium text-cream">Admission to arrival</span><span className="block mt-1 text-xs leading-relaxed text-body-text">Guidance at every step of your journey.</span></span>
                  </a>
                </li>
              </ul>
            </div>
            <div id="contact" className="min-w-0 scroll-mt-28">
              <ContactForm studyAbroad />
            </div>
          </div>
        </div>
      </section>

      <nav aria-label="Explore study abroad support" className="border-y border-gold/15 bg-[#0B1422]">
        <div className={`${sectionClass} flex flex-wrap gap-x-7 gap-y-1 py-3 text-sm text-body-text`}>
          {[["#mbbs-support", "MBBS assistance"], ["#mbbs-destinations", "MBBS destinations"], ["#courses", "Courses"], ["#support", "Our support"], ["#academic-options", "Academic options"]].map(([href, label]) => <a key={href} href={href} className="py-2 hover:text-gold focus-visible:outline-2 focus-visible:outline-gold">{label}</a>)}
        </div>
      </nav>

      <section id="mbbs-support" className={`${sectionClass} py-14 min-[900px]:py-20 scroll-mt-24`}>
        <div className="rounded-[24px] border border-gold/25 bg-[linear-gradient(125deg,#17273B,#0B1422)] p-6 min-[640px]:p-10 grid min-[900px]:grid-cols-2 gap-9 min-[900px]:gap-14">
          <div><p className={labelClass}>For future medical professionals</p><h2 className={headingClass}>MBBS abroad, with support beyond admission.</h2><p className="text-base leading-relaxed text-body-text mt-5">A move abroad is a big step for students and their families. Alongside medical course and application guidance, we help you prepare for the journey and settling in.</p><div className="flex flex-wrap gap-4 items-center mt-6"><StudyEnquiryLink course="MBBS & Medicine" className={primaryCta}>Discuss MBBS options <ArrowRight size={16} aria-hidden="true" /></StudyEnquiryLink><Link href="/services/mbbs-abroad" className="text-sm text-gold py-2 underline underline-offset-4">More about MBBS abroad</Link></div></div>
          <div className="space-y-5">
            {[["Pickup & drop-off support", "Provided for our MBBS students. Confirm the locations, timing and any charges with your counsellor before travel."], ["Accommodation assistance", "Get help exploring accommodation options and understanding the arrangements before you arrive."], ["Pre-departure guidance", "Prepare your documents and travel plans, and discuss what to expect as you begin studying abroad."]].map(([title, text]) => <div key={title} className="flex gap-3"><Check size={18} className="text-gold shrink-0 mt-1" aria-hidden="true" /><div><h3 className="text-base text-cream">{title}</h3><p className="text-sm leading-relaxed text-body-text mt-2">{text}</p></div></div>)}
          </div>
        </div>
      </section>

      <section id="mbbs-destinations" className={`${sectionClass} pb-14 min-[900px]:pb-20 scroll-mt-24`}>
        <div className="flex flex-wrap items-end justify-between gap-5 mb-7">
          <div><p className={labelClass}>Featured medical study destinations</p><h2 className={`${headingClass} max-w-[24ch]`}>Your medical dream.<br />A world of possibilities.</h2></div>
          <Link href="/services/mbbs-abroad" className="inline-flex items-center gap-2 py-2 text-sm text-gold hover:text-gold-soft">Explore MBBS guidance <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <CardCarousel label="Featured medical study destinations" itemLabel="destinations">
          {featuredMbbsDestinations.map((destination) => <DestinationCard key={destination.name} {...destination} course="MBBS & Medicine" />)}
        </CardCarousel>
        <p className="mt-5 text-sm leading-relaxed text-muted">The right university, pathway and guidance matter. Programme names, language requirements and eligibility vary by country. Select a destination to discuss your options.</p>
      </section>

      <section id="courses" className={`${sectionClass} pb-14 min-[900px]:pb-20 scroll-mt-24`}>
        <div className="flex flex-wrap items-end justify-between gap-5 mb-8">
          <div><p className={labelClass}>Your ambition, your direction</p><h2 className={headingClass}>What would you like to study?</h2></div>
          <p className="text-sm leading-relaxed text-body-text max-w-[40ch]">From medicine to management and beyond. Select an area to add it to your enquiry.</p>
        </div>
        <CardCarousel label="Study courses" itemLabel="courses">
          {studyCourses.map((course) => {
            const Icon = icons[course.icon];
            return <StudyEnquiryLink key={course.name} course={course.name} className="group rounded-[18px] border border-gold/18 bg-[#0B1422] p-5 transition-colors hover:border-gold/60 hover:bg-[#131E30] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
              <div className="flex items-center justify-between"><Icon size={23} strokeWidth={1.5} className="text-gold" aria-hidden="true" /><ArrowRight size={16} className="text-muted group-hover:text-gold" aria-hidden="true" /></div>
              <h3 className="text-lg font-medium text-cream mt-5">{course.name}</h3><p className="text-sm leading-relaxed text-body-text mt-2">{course.detail}</p>
            </StudyEnquiryLink>;
          })}
        </CardCarousel>
        <p className="text-sm text-muted mt-5">Course availability and admission depend on your qualifications and the institution’s requirements.</p>
      </section>

      <section id="support" className={`${sectionClass} pb-14 min-[900px]:pb-20 scroll-mt-24`}>
        <p className={labelClass}>More than an application</p><h2 className={`${headingClass} max-w-[22ch]`}>Support for each step of your journey.</h2>
        <div className="grid min-[640px]:grid-cols-2 min-[1100px]:grid-cols-4 gap-7 mt-10">
          {support.map(([number, title, body]) => <div key={number} className="border-t border-gold/25 pt-5"><span className="font-heading text-3xl text-gold/65">{number}</span><h3 className="text-lg text-cream mt-3 mb-2">{title}</h3><p className="text-sm leading-[1.8] text-body-text">{body}</p></div>)}
        </div>
        <div className="mt-9 rounded-2xl border border-gold/15 bg-[#0B1422] p-5 min-[640px]:p-7 flex flex-wrap items-center justify-between gap-4"><div><h3 className="text-base text-cream">Thinking beyond the classroom?</h3><p className="text-sm text-body-text leading-relaxed mt-2 max-w-[75ch]">Ask about internship assistance, scholarship opportunities and education-loan guidance. Options depend on your course, destination and eligibility; placements are not guaranteed.</p></div><a href="#contact" className="text-sm text-gold inline-flex items-center gap-2 py-2">Discuss my goals <ArrowRight size={16} aria-hidden="true" /></a></div>
      </section>

      <section id="academic-options" className={`${sectionClass} pb-14 min-[900px]:pb-20 scroll-mt-24`}>
        <div className="grid min-[900px]:grid-cols-2 gap-9 min-[900px]:gap-16 items-start">
          <div><p className={labelClass}>Start from where you are</p><h2 className={headingClass}>Low marks or an incomplete Plus Two?</h2><p className="text-base leading-[1.8] text-body-text mt-5">You can still ask for guidance. Tell us about your marks, pending subjects and goals so we can discuss realistic next steps — including whether you need to complete subjects or explore an alternative education pathway.</p><a href="#contact" className={`${primaryCta} mt-6`}>Discuss my academic profile <ArrowRight size={16} aria-hidden="true" /></a></div>
          <div className="border-l-2 border-gold/40 pl-6 py-2"><h3 className="font-heading text-2xl text-cream">An honest review comes first.</h3><ul className="space-y-4 mt-5 text-sm leading-relaxed text-body-text">{["Your completed qualifications and pending subjects", "The entry requirements for your preferred course", "Your budget, timeline and possible next steps"].map((text) => <li key={text} className="flex gap-3"><Check size={16} className="text-gold shrink-0 mt-1" aria-hidden="true" />{text}</li>)}</ul><p className="text-sm text-muted leading-relaxed mt-6">A profile review does not guarantee admission or visa eligibility. Requirements vary by institution and destination.</p></div>
        </div>
      </section>

      <section className="bg-[#0B1422] border-y border-gold/12 py-12 mb-14 min-[900px]:mb-20">
        <div className={`${sectionClass} grid min-[900px]:grid-cols-[0.85fr_1.15fr] gap-8`}>
          <div><p className={labelClass}>A simple first step</p><h2 className={headingClass}>What happens after you enquire?</h2></div>
          <ol className="space-y-5">{[["We get to know your profile", "Our team contacts you to discuss your studies, interests and budget."], ["We explore possible directions", "Discuss suitable courses and countries, and the requirements to consider."], ["You decide your next step", "Understand the process, documents and costs before making a commitment."]].map(([title, body], index) => <li key={title} className="flex gap-4"><span className="flex-none w-8 h-8 rounded-full border border-gold/30 grid place-items-center text-xs text-gold">{index + 1}</span><div><h3 className="text-base text-cream">{title}</h3><p className="text-sm text-body-text leading-relaxed mt-1">{body}</p></div></li>)}</ol>
        </div>
      </section>

      <FaqSection items={studyFaqs} title="Your study-abroad questions, answered" />

      <CtaBanner
        eyebrow="Your future deserves a conversation"
        title="Not just an admission decision. A decision about your future."
        body="You don’t have to choose everything today. Tell us where you are now, and let’s explore what could come next."
        href="#contact"
        buttonLabel="Book your consultation"
      >
        Get to know the people behind your guidance. <Link href="/about" className="text-gold underline underline-offset-4">About Skandiora</Link>
      </CtaBanner>
    </>
  );
}
