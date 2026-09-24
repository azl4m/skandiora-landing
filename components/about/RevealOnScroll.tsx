"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement for the About page: marks `[data-reveal]` elements
 * inside `rootId` as revealed when they scroll into view, and counts
 * `[data-count]` numbers up from zero. Without JavaScript, or with reduced
 * motion, everything is simply shown.
 */
export default function RevealOnScroll({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const counters = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
    const frames = new Set<number>();
    const timers = new Set<number>();

    const count = (element: HTMLElement) => {
      const end = Number(element.dataset.count);
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 900);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.round(end * eased)).padStart(2, "0");
        if (progress < 1) frames.add(requestAnimationFrame(tick));
      };
      element.textContent = "00";
      frames.add(requestAnimationFrame(tick));
      // rAF pauses in background tabs; make sure the final value always lands.
      timers.add(window.setTimeout(() => { element.textContent = String(end).padStart(2, "0"); }, 1200));
    };

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.dataset.revealed = "true";
        element.querySelectorAll<HTMLElement>("[data-count]").forEach(count);
        if (element.hasAttribute("data-count")) count(element);
        observer.unobserve(element);
      }
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

    root.dataset.revealReady = "true";
    targets.forEach((target) => observer.observe(target));
    counters.filter((counter) => !counter.closest("[data-reveal]")).forEach((counter) => observer.observe(counter));

    return () => {
      observer.disconnect();
      frames.forEach(cancelAnimationFrame);
      timers.forEach((timer) => window.clearTimeout(timer));
      counters.forEach((counter) => { counter.textContent = String(counter.dataset.count).padStart(2, "0"); });
      delete root.dataset.revealReady;
      targets.forEach((target) => { target.dataset.revealed = "true"; });
    };
  }, [rootId]);

  return null;
}
