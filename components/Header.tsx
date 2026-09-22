"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Logo from "./Logo";
import { navLinks } from "@/data/site";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const pathname = usePathname();
  const enquiryHref = ["/services/study-abroad", "/services/credit-transfer"].includes(pathname) ? "#contact" : "/#contact";

  function closeMenu() {
    setMenuOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    if (!menuOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 860px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        toggleRef.current?.focus({ preventScroll: true });
      }
      if (event.key === "Tab") {
        const links = menuRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
        const first = toggleRef.current;
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === first && last) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last && first) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#070D18]/86 backdrop-blur-md border-b border-gold/16">
      <div className="max-w-[1240px] mx-auto px-4 py-3 flex items-center gap-3.5">
        <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center flex-none">
          <Logo />
        </Link>

        <nav className="ml-auto flex items-center gap-7">
          <div className="hidden min-[860px]:flex items-center gap-7">
            <div className="flex gap-7 text-sm tracking-[0.02em]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#B9C6D8] hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href={enquiryHref}
              className="bg-gold text-[#0A1220] px-5.5 py-3 rounded-full text-[13px] tracking-[0.08em] uppercase hover:text-white transition-colors"
            >
              Free consultation
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            className="min-[860px]:hidden relative w-[46px] h-[46px] rounded-xl border border-gold/30 bg-transparent flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span aria-hidden="true" className={`absolute w-[18px] h-[1.5px] bg-gold transition-transform duration-300 motion-reduce:transition-none ${menuOpen ? "rotate-45" : "-translate-y-[6px]"}`} />
            <span aria-hidden="true" className={`absolute w-[18px] h-[1.5px] bg-gold transition-opacity duration-200 motion-reduce:transition-none ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span aria-hidden="true" className={`absolute w-[18px] h-[1.5px] bg-gold transition-transform duration-300 motion-reduce:transition-none ${menuOpen ? "-rotate-45" : "translate-y-[6px]"}`} />
          </button>
        </nav>
      </div>

      <div
        id={menuId}
        ref={menuRef}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`absolute inset-x-0 top-full min-[860px]:hidden transition-[visibility] duration-300 motion-reduce:transition-none ${menuOpen ? "visible" : "invisible"}`}
      >
        <div aria-hidden="true" onClick={closeMenu} className={`absolute inset-x-0 top-0 h-dvh bg-black/40 backdrop-blur-[3px] transition-opacity duration-300 motion-reduce:transition-none ${menuOpen ? "opacity-100" : "opacity-0"}`} />
        <nav aria-label="Mobile navigation" className={`relative ml-auto mr-4 mt-3 w-[calc(100%-2rem)] max-w-[380px] origin-top-right max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain rounded-[24px] border border-gold/25 bg-[linear-gradient(145deg,#131E30,#0B1422_70%)] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.55)] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${menuOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-95 opacity-0"}`}>
          <div className="flex items-center justify-between px-3 pt-3 pb-4 border-b border-white/8 mb-2">
            <p className="text-[10px] uppercase tracking-[0.22em] text-gold">Explore Skandiora</p>
            <span aria-hidden="true" className="h-px w-10 bg-gold/40" />
          </div>
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`group flex items-center gap-3 min-h-13 py-3 px-3 rounded-xl text-base transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-gold motion-reduce:transition-none ${pathname === link.href ? "bg-gold/10 text-gold-soft" : "text-cream hover:bg-white/5 active:bg-white/5 hover:text-gold-soft"}`}
            >
              <span aria-hidden="true" className="text-[10px] tabular-nums tracking-wider text-muted">{String(index + 1).padStart(2, "0")}</span>
              <span className="flex-1">{link.label}</span>
              <ChevronRight size={16} aria-hidden="true" className="text-gold/65 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </Link>
          ))}
          <div className="mt-3 border-t border-white/8 px-1 pt-4 pb-1">
          <Link
            href={enquiryHref}
            onClick={closeMenu}
            className="flex items-center justify-center gap-3 min-h-12 text-center bg-gold text-[#0A1220] py-3.5 px-5 rounded-full text-[12px] font-medium tracking-[0.08em] uppercase hover:bg-gold-soft transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold motion-reduce:transition-none"
          >
            Free consultation
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
