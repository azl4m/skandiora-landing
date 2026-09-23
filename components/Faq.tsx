"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/data/services";

type FaqProps = {
  items: Faq[];
  title?: string;
};

export default function FaqSection({ items, title = "Frequently asked questions" }: FaqProps) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const sectionId = useId();

  if (items.length === 0) return null;

  return (
    <section aria-labelledby={`${sectionId}-heading`} className="section-space px-4.5">
      <div className="max-w-[920px] mx-auto">
        <p className="mb-3 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.2em] text-gold"><span aria-hidden="true" className="h-px w-8 bg-gold/40" />A little clarity<span aria-hidden="true" className="h-px w-8 bg-gold/40" /></p>
        <h2 id={`${sectionId}-heading`} className="font-heading font-semibold text-[clamp(28px,3.4vw,42px)] text-cream leading-[1.15] mb-8 min-[640px]:mb-10 text-center text-pretty">
          {title}
        </h2>
        <div className="flex flex-col gap-3">
          {items.map((item, index) => {
            const isOpen = openQuestion === item.q;
            const questionId = `${sectionId}-question-${index}`;
            const answerId = `${sectionId}-answer-${index}`;

            return (
              <div key={item.q} className={`overflow-hidden rounded-[18px] border transition-colors duration-300 motion-reduce:transition-none ${isOpen ? "border-gold/45 bg-[#101A2B]" : "border-gold/15 bg-[#0B1422] hover:border-gold/35"}`}>
                <h3 className="m-0">
                  <button
                    id={questionId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenQuestion((current) => current === item.q ? null : item.q)}
                    className="group flex min-h-[76px] w-full items-center gap-3 min-[640px]:gap-5 p-4 min-[640px]:p-6 text-left cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-gold"
                  >
                    <span aria-hidden="true" className={`hidden min-[440px]:block shrink-0 text-xs tabular-nums tracking-[0.08em] ${isOpen ? "text-gold" : "text-muted"}`}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={`min-w-0 flex-1 text-[15px] min-[640px]:text-[17px] font-medium leading-relaxed transition-colors motion-reduce:transition-none ${isOpen ? "text-gold-soft" : "text-cream"}`}>{item.q}</span>
                    <span aria-hidden="true" className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 motion-reduce:transition-none ${isOpen ? "border-gold/40 bg-gold/10 text-gold-soft" : "border-gold/20 text-gold group-hover:bg-gold/10"}`}>
                      <Plus size={18} className={`transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-45" : "rotate-0"}`} />
                    </span>
                  </button>
                </h3>
                <div
                  id={answerId}
                  role="region"
                  aria-labelledby={questionId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="px-4 pb-5 min-[440px]:pl-11 min-[640px]:pl-16 min-[640px]:pr-20 min-[640px]:pb-6">
                      <p className="m-0 border-t border-gold/15 pt-4 text-[14px] min-[640px]:text-[15px] leading-[1.8] text-body-text">{item.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
