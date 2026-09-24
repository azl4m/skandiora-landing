"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { steps } from "@/data/process";
import styles from "./ProcessJourney.module.css";

export default function ProcessJourney() {
  const container = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const measure = () => {
      const origin = element.getBoundingClientRect();
      const cards = Array.from(element.querySelectorAll("li")).map((card) => card.getBoundingClientRect());
      setPaths(cards.slice(0, -1).map((card, index) => {
        const next = cards[index + 1];
        if (Math.abs(next.top - card.top) < 2) {
          const y = card.top - origin.top + card.height / 2;
          return `M ${card.right - origin.left} ${y} L ${next.left - origin.left} ${y}`;
        }
        const x1 = card.left - origin.left + card.width / 2;
        const x2 = next.left - origin.left + next.width / 2;
        const bottom = card.bottom - origin.top;
        const top = next.top - origin.top;
        const middle = (bottom + top) / 2;
        return `M ${x1} ${bottom} L ${x1} ${middle} L ${x2} ${middle} L ${x2} ${top}`;
      }));
    };
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    element.querySelectorAll("li").forEach((card) => resize.observe(card));
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    const initialFrame = requestAnimationFrame(() => { measure(); onVisibility(); });
    if (!("IntersectionObserver" in window)) {
      const fallbackFrame = requestAnimationFrame(() => { setStarted(true); setVisible(true); });
      return () => { cancelAnimationFrame(initialFrame); cancelAnimationFrame(fallbackFrame); resize.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
    }
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setStarted(true);
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    observer.observe(element);
    return () => {
      cancelAnimationFrame(initialFrame);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <div ref={container} className={`${styles.journey} ${started ? styles.started : ""}`} style={{ "--journey-play-state": visible && tabVisible ? "running" : "paused" } as CSSProperties}>
    <svg className={styles.connectors} aria-hidden="true" focusable="false">
      {paths.map((path, index) => <g key={index}>
        <path d={path} className={styles.track} />
        <path d={path} pathLength={1} className={styles.progress} style={{ animationDelay: `${index * 1.5 + 0.8}s` }} />
      </g>)}
    </svg>
    <ol className={styles.grid}>
      {steps.map((step, index) => <li key={step.no} className={styles.card} style={{ animationDelay: `${index * 1.5}s` }}>
        <span className="font-heading font-semibold text-[34px] min-[640px]:text-[44px] text-gold/70 leading-none">{step.no}</span>
        <h3 className="text-base min-[640px]:text-lg font-medium text-cream mt-3 mb-2">{step.title}</h3>
        <p className="text-[13px] min-[640px]:text-sm leading-[1.65] text-body-text">{step.body}</p>
      </li>)}
    </ol>
  </div>;
}
