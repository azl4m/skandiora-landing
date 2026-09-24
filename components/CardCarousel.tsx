"use client";

import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./CardCarousel.module.css";

type CardCarouselProps = {
  children: ReactNode;
  label?: string;
  itemLabel?: string;
  /** CSS width of each card, e.g. "min(78cqw, 340px)". `cqw` is relative to the carousel width. */
  slideWidth?: string;
  /** Autoplay delay in ms. Pass 0 to disable autoplay. */
  interval?: number;
  startIndex?: number;
};

/**
 * Centre-focused carousel: the card nearest the middle is shown at full size,
 * neighbours shrink and fade based on their live distance from centre.
 * Each card is wrapped in an element carrying `data-active`, so cards can opt
 * into active styling with `[data-active="true"] > .card` in their own CSS.
 */
export default function CardCarousel({
  children,
  label = "Cards",
  itemLabel = "cards",
  slideWidth = "min(78cqw, 320px)",
  interval = 2800,
  startIndex,
}: CardCarouselProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const initial = Math.max(0, Math.min(count - 1, startIndex ?? (count > 2 ? 1 : 0)));

  const viewport = useRef<HTMLDivElement>(null);
  const activeRef = useRef(initial);
  const frame = useRef(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [active, setActive] = useState(initial);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const slideAt = (index: number) => viewport.current?.children[index] as HTMLElement | undefined;

  const update = useCallback(() => {
    const element = viewport.current;
    if (!element || !element.children.length) return;
    const items = Array.from(element.children) as HTMLElement[];
    const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : items[0].offsetWidth;
    const center = element.scrollLeft + element.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    items.forEach((item, index) => {
      const distance = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center) / step;
      // Ease the falloff so the focused card grows smoothly as it nears centre.
      const focus = Math.max(0, 1 - distance);
      item.style.setProperty("--focus", (focus * focus * (3 - 2 * focus)).toFixed(4));
      if (distance < best) { best = distance; nearest = index; }
    });
    if (nearest !== activeRef.current) {
      activeRef.current = nearest;
      setActive(nearest);
    }
  }, []);

  const goTo = useCallback((index: number, smooth = true) => {
    const element = viewport.current;
    const item = element?.children[index] as HTMLElement | undefined;
    if (!element || !item) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollTo({ left: item.offsetLeft + item.offsetWidth / 2 - element.clientWidth / 2, behavior: smooth && !reduce ? "smooth" : "instant" });
  }, []);

  useLayoutEffect(() => {
    goTo(activeRef.current, false);
    update();
  }, [goTo, update, count]);

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(query.matches);
    syncMotion();
    query.addEventListener("change", syncMotion);
    const visibility = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    visibility.observe(element);
    const resize = new ResizeObserver(() => { goTo(activeRef.current, false); update(); });
    resize.observe(element);
    return () => {
      query.removeEventListener("change", syncMotion);
      visibility.disconnect();
      resize.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [goTo, update]);

  function onScroll() {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(update);
  }

  function endDrag(pointerId: number) {
    const element = viewport.current;
    const state = drag.current;
    drag.current = null;
    if (!element || !state?.moved) return;
    if (element.hasPointerCapture(pointerId)) element.releasePointerCapture(pointerId);
    suppressClick.current = true;
    const delta = element.scrollLeft - state.left;
    const step = (slideAt(1)?.offsetLeft ?? 0) - (slideAt(0)?.offsetLeft ?? 0) || 1;
    // A short flick still advances one card; longer drags settle on the nearest.
    let target = activeRef.current;
    if (Math.abs(delta) > 40 && Math.abs(delta) < step / 2) target += Math.sign(delta);
    goTo(Math.max(0, Math.min(count - 1, target)));
    let settled = false;
    const release = () => { if (!settled) { settled = true; setDragging(false); } };
    element.addEventListener("scrollend", release, { once: true });
    window.setTimeout(release, 700);
  }

  const autoplay = interval > 0 && count > 1 && !reducedMotion;
  const running = autoplay && inView && !hovered && !focused && !dragging;

  return (
    <div
      className={styles.root}
      style={{ "--slide-w": slideWidth } as CSSProperties}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocus={(event) => { if ((event.target as HTMLElement).matches(":focus-visible")) setFocused(true); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}
    >
      <div
        ref={viewport}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        data-dragging={dragging}
        className={styles.viewport}
        onScroll={onScroll}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(Math.max(0, Math.min(count - 1, activeRef.current + (event.key === "ArrowRight" ? 1 : -1))));
          }
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft, moved: false };
        }}
        onPointerMove={(event) => {
          const state = drag.current;
          if (!state) return;
          const dx = event.clientX - state.x;
          if (!state.moved && Math.abs(dx) > 6) {
            state.moved = true;
            setDragging(true);
            event.currentTarget.setPointerCapture(event.pointerId);
          }
          if (state.moved) event.currentTarget.scrollLeft = state.left - dx;
        }}
        onPointerUp={(event) => endDrag(event.pointerId)}
        onPointerCancel={(event) => endDrag(event.pointerId)}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (!suppressClick.current) return;
          suppressClick.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            data-active={index === active}
            className={`${styles.slide} group/slide`}
            onFocus={(event) => { if (index !== activeRef.current && (event.target as HTMLElement).matches(":focus-visible")) goTo(index); }}
            onClickCapture={(event) => {
              // Tapping a side card brings it to the centre instead of opening it.
              if (index === activeRef.current) return;
              event.preventDefault();
              event.stopPropagation();
              goTo(index);
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className={styles.dots} role="group" aria-label={`Choose ${itemLabel}`}>
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={styles.dot}
              aria-label={`Show ${itemLabel} ${index + 1} of ${count}`}
              aria-current={index === active}
              onClick={() => goTo(index)}
            >
              {index === active && (
                <span
                  key={active}
                  aria-hidden="true"
                  className={styles.progress}
                  data-static={!autoplay}
                  style={{ animationDuration: `${interval}ms`, animationPlayState: running ? "running" : "paused" }}
                  onAnimationEnd={() => goTo((activeRef.current + 1) % count)}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
