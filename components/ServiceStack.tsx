import Link from "next/link";
import { featuredServices, services } from "@/data/services";
import ServiceCard from "./ServiceCard";

export default function ServiceStack() {
  const primary = featuredServices(services);

  return (
    <section id="services" className="px-4.5 py-[clamp(52px,8vw,110px)]">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 min-[620px]:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 items-end mb-[clamp(32px,4vw,52px)]">
          <div className="min-w-0">
            <div className="text-xs tracking-[0.24em] uppercase text-gold">What we do</div>
            <h2 className="font-heading font-semibold text-[clamp(32px,4.4vw,52px)] text-cream leading-[1.1] mt-3.5">
              Five services, one accountable team
            </h2>
          </div>
          <p className="text-base leading-[1.7] text-body-text max-w-[46ch] m-0">
            Every case is handled by a named counsellor who owns your file from first call to
            final approval — no handoffs, no surprise fees.
          </p>
        </div>

        <div className="grid grid-cols-1 min-[620px]:grid-cols-2 min-[980px]:grid-cols-3 gap-5">
          {primary.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center">
          <Link
            href="/services"
            className="text-sm tracking-[0.04em] text-muted hover:text-gold transition-colors"
          >
            Also: MBBS abroad, education loans, language training & accommodation →
          </Link>
        </div>

        <div className="mt-6 [background:linear-gradient(160deg,#0E1A2C,#070D18)] rounded-[26px] p-[clamp(28px,4vw,52px)] grid grid-cols-1 min-[620px]:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[clamp(20px,4vw,48px)] items-center text-[#E8EDF5]">
          <div className="min-w-0">
            <h3 className="font-heading font-semibold text-[clamp(28px,3.4vw,40px)] text-white m-0 mb-3 leading-[1.15]">
              Not sure which path fits you?
            </h3>
            <p className="text-base leading-[1.7] text-[rgba(232,237,245,0.78)] m-0 max-w-[46ch]">
              Send us your marksheets and we will tell you honestly what is possible —
              admission, transfer or a fresh application abroad.
            </p>
          </div>
          <Link
            href="/#contact"
            className="justify-self-start bg-gold text-[#12243C] py-4 px-7.5 rounded-full text-[13px] tracking-[0.08em] uppercase hover:bg-white hover:text-[#F5F1E8] transition-colors"
          >
            Talk to a counsellor
          </Link>
        </div>
      </div>
    </section>
  );
}
