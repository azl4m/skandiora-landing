import type { Faq } from "@/data/services";

type FaqProps = {
  items: Faq[];
  title?: string;
};

export default function FaqSection({ items, title = "Frequently asked questions" }: FaqProps) {
  return (
    <section className="px-4.5 pb-[clamp(52px,8vw,96px)]">
      <div className="max-w-[840px] mx-auto">
        <h2 className="font-heading font-semibold text-[clamp(26px,3.2vw,38px)] text-cream leading-[1.15] mb-8 text-center">
          {title}
        </h2>
        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <div key={item.q} className="rounded-[16px] bg-[#101A2B] border border-gold/16 p-6">
              <h3 className="text-[17px] font-medium text-cream m-0 mb-2.5">{item.q}</h3>
              <p className="text-[15px] leading-[1.7] text-body-text m-0">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
