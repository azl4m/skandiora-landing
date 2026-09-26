import Hero from "@/components/Hero";
import ValueStrip from "@/components/ValueStrip";
import Intro from "@/components/Intro";
import ServiceStack from "@/components/ServiceStack";
import Destinations from "@/components/Destinations";
import Courses from "@/components/Courses";
import Process from "@/components/Process";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import FaqSection from "@/components/Faq";
import Contact from "@/components/Contact";
import SocialConnect from "@/components/SocialConnect";
import Testimonials from "@/components/Testimonials";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import { faqSchema } from "@/lib/schema";
import { getHomePage } from "@/lib/cms/content";
import { pageMetadata } from "@/lib/cms/metadata";

export async function generateMetadata(): Promise<Metadata> {
  // Without a Google title set in Sanity, the home page keeps the site-wide default from the layout.
  const { seo } = await getHomePage();
  return seo.title ? pageMetadata(seo, { title: seo.title, description: seo.description ?? "", path: "/", absoluteTitle: true, brandFirst: true }) : {};
}

export default async function Home() {
  const home = await getHomePage();
  return (
    <>
      <JsonLd data={faqSchema(home.faqs)} />
      <Hero title={home.title} text={home.text} stats={home.showStats ? home.stats : []} />
      <ValueStrip />
      <Intro />
      <ServiceStack />
      <Destinations />
      <Courses />
      <Process />
      <Gallery />
      <About />
      <Testimonials note={home.testimonialsNote} />
      <SocialConnect />
      <FaqSection items={home.faqs} title="Common questions about Skandiora Immigration" />
      <Contact />
    </>
  );
}
