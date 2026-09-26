import Link from "next/link";
import { featuredServices } from "@/data/services";
import { getServices } from "@/lib/cms/content";
import ServiceCard from "./ServiceCard";
import CtaBanner from "./CtaBanner";

export default async function ServiceStack() {
  const services = await getServices();
  const primary = featuredServices(services);

  return (
    <section id="services" className="section-space px-4.5">
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

        <CtaBanner
          embedded
          body="Send us your marksheets and we will tell you honestly what is possible — admission, transfer or a fresh application abroad."
        />
      </div>
    </section>
  );
}
