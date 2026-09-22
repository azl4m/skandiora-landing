"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import StudyEnquiryLink from "./StudyEnquiryLink";

type DestinationCardProps = {
  name: string;
  image: string;
  description: string;
  course: string;
};

export default function DestinationCard({ name, image, description, course }: DestinationCardProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animations: Animation[] = [];
    let revealed = false;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        revealed = false;
        return;
      }
      if (entry.intersectionRatio < 0.45 || revealed || reducedMotion.matches) return;
      revealed = true;
      animations.forEach((animation) => animation.cancel());
      animations = Array.from(element.children).map((child, index) => child.animate(
        [
          { transform: "translateX(calc(-100% - 24px))", opacity: 0 },
          { transform: "translateX(0)", opacity: 1 },
        ],
        { duration: 900, delay: index * 150, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
      ));
    }, { threshold: [0, 0.45] });
    const stopMotion = () => {
      if (reducedMotion.matches) animations.forEach((animation) => animation.cancel());
    };

    observer.observe(element);
    reducedMotion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", stopMotion);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  return (
    <StudyEnquiryLink course={course} destination={name} className="destination-card group relative flex flex-col justify-end aspect-[4/5] overflow-hidden rounded-[20px] border border-gold/25 bg-[#101A2B] pt-20 transition-colors duration-300 hover:border-gold/65 active:border-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold motion-reduce:transition-none">
      <Image src={image} alt="" fill sizes="(max-width: 639px) 82vw, (max-width: 999px) 46vw, 280px" className="object-cover" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/20" />
      <h3 className="absolute left-4 top-4 rounded-full border border-white/25 bg-[#07101D]/85 px-4 py-2 text-sm font-medium text-cream backdrop-blur-sm">{name}</h3>
      <div className="destination-card-description relative bg-gradient-to-t from-[#04080F] via-[#04080F]/90 to-transparent px-5 pb-5 pt-14">
        <div ref={textRef}>
          <p className="text-sm leading-relaxed text-[#EAF0FA]">{description}</p>
          <span className="mt-4 flex items-center justify-between gap-3 text-sm font-medium text-gold-soft">Enquire about medicine <ArrowRight size={17} aria-hidden="true" /></span>
        </div>
      </div>
      <span className="sr-only">Enquire about medical study in {name}</span>
    </StudyEnquiryLink>
  );
}
