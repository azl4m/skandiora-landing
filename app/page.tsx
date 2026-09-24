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
import { faqSchema } from "@/lib/schema";
import { homeFaqs } from "@/data/faq";

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />
      <Hero />
      <ValueStrip />
      <Intro />
      <ServiceStack />
      <Destinations />
      <Courses />
      <Process />
      <Gallery />
      <About />
      <Testimonials />
      <SocialConnect />
      <FaqSection items={homeFaqs} title="Common questions about Skandiora Immigration" />
      <Contact />
    </>
  );
}
