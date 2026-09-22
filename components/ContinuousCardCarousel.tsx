"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";

export default function ContinuousCardCarousel({ children, label, itemLabel }: {
  children: ReactNode;
  label: string;
  itemLabel: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const original = useRef<HTMLDivElement>(null);
  const scrollLimit = useRef(0);
  const travelDirection = useRef(1);
  const hovered = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const viewport = track.current;
    const group = original.current;
    if (!viewport || !group) return;
    const measure = () => {
      scrollLimit.current = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(viewport);
    resize.observe(group);
    return () => resize.disconnect();
  }, [children]);

  useEffect(() => {
    const viewport = track.current;
    if (!viewport || paused) return;
    viewport.scrollTo({ left: viewport.scrollLeft, behavior: "instant" });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let position = viewport.scrollLeft;
    let measuredLimit = scrollLimit.current;
    let speed = 0;
    let previousTime = 0;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(viewport);

    const tick = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 48) : 0;
      previousTime = time;
      if (measuredLimit !== scrollLimit.current) {
        measuredLimit = scrollLimit.current;
        position = viewport.scrollLeft;
        speed = 0;
      }
      if (visible && !document.hidden && !reducedMotion.matches && !hovered.current && !viewport.contains(document.activeElement) && measuredLimit > 0) {
        const seconds = elapsed / 1000;
        let remaining = travelDirection.current > 0 ? measuredLimit - position : position;
        if (remaining <= 0.25) {
          travelDirection.current *= -1;
          speed = 0;
          remaining = travelDirection.current > 0 ? measuredLimit - position : position;
        }
        // Ease to a stop at each end, then accelerate back through the same
        // single set of cards. Retain fractional pixels for even movement.
        speed = Math.min(64, speed + 100 * seconds, Math.sqrt(200 * Math.max(0, remaining)));
        position = Math.max(0, Math.min(measuredLimit, position + travelDirection.current * Math.min(remaining, speed * seconds)));
        viewport.scrollLeft = position;
      } else {
        position = viewport.scrollLeft;
        speed = 0;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [paused]);

  function move(direction: number) {
    setPaused(true);
    const viewport = track.current;
    const card = original.current?.firstElementChild as HTMLElement | null;
    if (!viewport || !card) return;
    travelDirection.current = direction;
    viewport.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 16),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  const groupClass = "flex shrink-0 gap-4 [&>a]:w-[var(--carousel-card-width)] [&>a]:shrink-0";
  const controlClass = "inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-gold hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

  return (
    <div className="@container min-w-0" onPointerEnter={(event) => { if (event.pointerType === "mouse") hovered.current = true; }} onPointerLeave={() => { hovered.current = false; }}>
      <div
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onPointerDown={() => setPaused(true)}
        onWheel={() => setPaused(true)}
        onFocusCapture={() => setPaused(true)}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        className="no-scrollbar flex gap-4 overflow-x-auto overscroll-x-contain scroll-auto p-1 -m-1 [--carousel-card-width:min(82cqw,300px)] min-[640px]:[--carousel-card-width:280px] min-[1100px]:[--carousel-card-width:296px] focus-visible:outline-2 focus-visible:outline-gold"
      >
        <div ref={original} className={groupClass}>{children}</div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs leading-relaxed text-muted">Swipe or use the arrows to explore {itemLabel}</span>
        <div className="flex shrink-0 gap-2">
          <button type="button" className={controlClass} aria-label={`Previous ${itemLabel}`} onClick={() => move(-1)}><ArrowLeft size={16} aria-hidden="true" /></button>
          <button type="button" className={`${controlClass} motion-reduce:hidden`} aria-label={paused ? "Resume automatic scrolling" : "Pause automatic scrolling"} onClick={() => setPaused((value) => !value)}>{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}</button>
          <button type="button" className={controlClass} aria-label={`Next ${itemLabel}`} onClick={() => move(1)}><ArrowRight size={16} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  );
}
