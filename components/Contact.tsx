import { site } from "@/data/site";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="section-space section-band px-4.5">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 min-[620px]:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[clamp(32px,5vw,56px)]">
        <div className="min-w-0">
          <div className="text-xs tracking-[0.24em] uppercase text-gold">Get in touch</div>
          <h2 className="font-heading font-semibold text-[clamp(30px,4.2vw,50px)] text-cream leading-[1.12] mt-3.5 mb-4.5">
            Free profile assessment
          </h2>
          <p className="text-base leading-[1.7] text-body-text max-w-[46ch] mb-7">
            Share your qualification and where you want to go. We will reply with eligible
            universities, timelines and the exact documents needed.
          </p>
          <div className="flex flex-col gap-3.5">
            <div className="flex gap-3 items-baseline">
              <span className="text-xs tracking-[0.16em] uppercase text-muted min-w-[74px]">
                Phone
              </span>
              <div className="flex flex-col gap-2">
                {site.phones.map((phone) => <a key={phone.href} href={`tel:${phone.href}`} className="text-[17px] text-cream hover:text-gold transition-colors">{phone.label}</a>)}
              </div>
            </div>
            <div className="flex gap-3 items-baseline">
              <span className="text-xs tracking-[0.16em] uppercase text-muted min-w-[74px]">
                Email
              </span>
              <a href={`mailto:${site.email}`} className="text-[17px] text-cream hover:text-gold transition-colors">
                {site.email}
              </a>
            </div>
            <div className="flex gap-3 items-baseline">
              <span className="text-xs tracking-[0.16em] uppercase text-muted min-w-[74px]">
                Offices
              </span>
              <span className="text-[17px] text-[#B9C6D8]">{site.office}</span>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
