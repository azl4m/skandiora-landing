"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

export type SelectOption = { value: string; label: string };

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  options: readonly SelectOption[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  triggerRef?: (node: HTMLButtonElement | null) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
};

/** A controlled select with the same custom listbox on touch and desktop devices. */
export default function SelectField({
  label, name, value, options, onChange, onBlur, triggerRef, error,
  placeholder = "Choose an option", disabled = false,
}: SelectFieldProps) {
  const id = useId();
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const search = useRef({ text: "", time: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, maxHeight: 280 });
  const selected = options.findIndex((option) => option.value === value);

  function measure() {
    if (!button.current) return;
    const rect = button.current.getBoundingClientRect();
    const viewport = window.visualViewport;
    const topEdge = viewport?.offsetTop ?? 0;
    const bottomEdge = topEdge + (viewport?.height ?? window.innerHeight);
    const leftEdge = viewport?.offsetLeft ?? 0;
    const rightEdge = leftEdge + (viewport?.width ?? window.innerWidth);
    const width = Math.min(Math.max(rect.width, 260), rightEdge - leftEdge - 24);
    const below = bottomEdge - rect.bottom - 20;
    const above = rect.top - topEdge - 20;
    const upwards = below < 220 && above > below;
    const maxHeight = Math.max(60, Math.min(304, upwards ? above : below));
    const height = Math.min(maxHeight, options.length * 48 + 12);
    setPosition({
      top: upwards ? Math.max(topEdge + 12, rect.top - height - 8) : rect.bottom + 8,
      left: Math.max(leftEdge + 12, Math.min(rect.left, rightEdge - width - 12)),
      width,
      maxHeight,
    });
  }

  function show(index = Math.max(0, selected)) {
    if (disabled || !options.length) return;
    measure();
    setActive(index);
    setOpen(true);
  }

  function choose(index: number) {
    if (!options[index]) return;
    onChange(options[index].value);
    onBlur?.();
    setOpen(false);
    button.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    if (!open) return;
    function outside(event: PointerEvent) {
      const target = event.target as Node;
      if (!button.current?.contains(target) && !menu.current?.contains(target)) setOpen(false);
    }
    // Close on page movement instead of leaving a detached floating menu.
    function pageScroll(event: Event) {
      if (event.target instanceof Node && menu.current?.contains(event.target)) return;
      setOpen(false);
    }
    function close() { setOpen(false); }
    document.addEventListener("pointerdown", outside);
    window.addEventListener("scroll", pageScroll, true);
    window.addEventListener("resize", close);
    window.visualViewport?.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("scroll", pageScroll, true);
      window.removeEventListener("resize", close);
      window.visualViewport?.removeEventListener("resize", close);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const option = menu.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    const container = menu.current;
    if (!option || !container) return;
    if (option.offsetTop < container.scrollTop) container.scrollTop = option.offsetTop;
    else if (option.offsetTop + option.offsetHeight > container.scrollTop + container.clientHeight) {
      container.scrollTop = option.offsetTop + option.offsetHeight - container.clientHeight;
    }
  }, [active, open]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Tab") { setOpen(false); return; }
    if (event.key === "Escape") {
      if (open) { event.preventDefault(); event.stopPropagation(); setOpen(false); }
      return;
    }
    if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      if (event.key === "Enter" || event.key === " ") {
        if (open) choose(active); else show();
      } else if (event.key === "Home") show(0);
      else if (event.key === "End") show(options.length - 1);
      else if (!open) show(selected >= 0 ? selected : event.key === "ArrowUp" ? options.length - 1 : 0);
      else setActive((index) => (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
      return;
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      const now = Date.now();
      const character = event.key.toLocaleLowerCase();
      const query = now - search.current.time > 700 ? character : search.current.text + character;
      search.current = { text: query, time: now };
      const prefix = [...query].every((letter) => letter === character) ? character : query;
      const start = open ? active : selected;
      for (let offset = 1; offset <= options.length; offset++) {
        const index = (start + offset + options.length) % options.length;
        if (options[index].label.toLocaleLowerCase().startsWith(prefix)) { show(index); break; }
      }
    }
  }

  return (
    <div className="min-w-0 flex flex-col gap-1.5">
      <label id={`${id}-label`} htmlFor={id} className="text-xs tracking-[0.14em] uppercase text-muted">{label}</label>
      <input type="hidden" name={name} value={value} disabled={disabled} />
      <button
        ref={(node) => {
          button.current = node;
          triggerRef?.(node);
        }}
        id={id}
        type="button"
        role="combobox"
        aria-labelledby={`${id}-label`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-list` : undefined}
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        disabled={disabled}
        onClick={() => open ? setOpen(false) : show()}
        onKeyDown={onKeyDown}
        onBlur={() => { setOpen(false); onBlur?.(); }}
        className={`w-full min-w-0 min-h-[54px] flex items-center justify-between gap-3 rounded-[10px] border px-3.5 py-3.5 text-left text-base normal-case tracking-normal bg-[#0C1524] text-[#EAF0FA] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 disabled:opacity-50 disabled:cursor-not-allowed ${open ? "border-gold ring-2 ring-gold/15" : error ? "border-[#e3897f]" : "border-gold/26 hover:border-gold/60"}`}
      >
        <span className="truncate">{options[selected]?.label ?? placeholder}</span>
        <ChevronDown size={17} aria-hidden="true" className={`shrink-0 text-gold transition-transform duration-150 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
      </button>
      {error && <span id={`${id}-error`} className="text-xs text-[#e3897f]">{error}</span>}
      {open && createPortal(
        <div
          ref={menu}
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="custom-select-menu fixed z-[100] overflow-y-auto overscroll-contain rounded-[14px] border border-gold/35 bg-[#101B2D] p-1.5 shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
          style={position}
          onMouseDown={(event) => event.preventDefault()}
        >
          {options.map((option, index) => <div
            key={option.value}
            id={`${id}-option-${index}`}
            data-index={index}
            role="option"
            aria-selected={option.value === value}
            onClick={() => choose(index)}
            className={`min-h-12 flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-3 text-[15px] leading-6 tracking-normal normal-case transition-colors hover:bg-[#203047] ${index === active ? "bg-[#203047] text-[#F5F1E8]" : "text-[#B9C6D8]"} ${option.value === value ? "font-medium" : ""}`}
          >
            <span>{option.label}</span>
            {option.value === value && <Check size={16} aria-hidden="true" className="shrink-0 text-gold" />}
          </div>)}
        </div>, document.body,
      )}
    </div>
  );
}
