"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

export default function CardCarousel({ children, label = "Cards", itemLabel = "cards" }: { children: ReactNode; label?: string; itemLabel?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = track.current;
    if (!element || paused) return;
    const mobile = window.matchMedia("(max-width: 639px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.6 });
    observer.observe(element);
    const timer = window.setInterval(() => {
      if (!mobile.matches || reducedMotion.matches || !visible || document.hidden || element.contains(document.activeElement)) return;
      const card = element.firstElementChild as HTMLElement | null;
      if (!card) return;
      const end = element.scrollWidth - element.clientWidth;
      element.scrollTo({ left: element.scrollLeft >= end - 2 ? 0 : Math.min(end, element.scrollLeft + card.offsetWidth + 16), behavior: "smooth" });
    }, 4500);
    return () => { window.clearInterval(timer); observer.disconnect(); };
  }, [paused]);

  function move(direction: number) {
    setPaused(true);
    const element = track.current;
    const card = element?.firstElementChild as HTMLElement | null;
    if (!element || !card) return;
    element.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  const controlClass = "inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-gold hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

  return (
    <div>
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        onPointerDown={() => setPaused(true)}
        onWheel={() => setPaused(true)}
        onFocusCapture={() => setPaused(true)}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
        }}
        className="no-scrollbar flex gap-4 overflow-x-auto overscroll-x-contain snap-x snap-mandatory p-1 -m-1 focus-visible:outline-2 focus-visible:outline-gold min-[640px]:grid min-[640px]:grid-cols-2 min-[640px]:overflow-visible min-[1000px]:grid-cols-4 [&>a]:w-[82%] [&>a]:max-w-[300px] [&>a]:shrink-0 [&>a]:snap-start min-[640px]:[&>a]:w-auto min-[640px]:[&>a]:max-w-none"
      >{children}</div>
      <div className="mt-4 flex items-center justify-between gap-3 min-[640px]:hidden">
        <span className="text-xs text-muted">Swipe to explore {itemLabel}</span>
        <div className="flex gap-2">
          <button type="button" className={controlClass} aria-label={`Previous ${itemLabel}`} onClick={() => move(-1)}><ArrowLeft size={16} aria-hidden="true" /></button>
          <button type="button" className={`${controlClass} motion-reduce:hidden`} aria-label={paused ? "Resume automatic scrolling" : "Pause automatic scrolling"} onClick={() => setPaused((value) => !value)}>{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}</button>
          <button type="button" className={controlClass} aria-label={`Next ${itemLabel}`} onClick={() => move(1)}><ArrowRight size={16} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}
