"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { navLinks } from "@/data/site";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const enquiryHref = pathname === "/services/study-abroad" ? "#contact" : "/#contact";

  return (
    <header className="sticky top-0 z-50 bg-[#070D18]/86 backdrop-blur-md border-b border-gold/16">
      <div className="max-w-[1240px] mx-auto px-4 py-3 flex items-center gap-3.5">
        <Link href="/" className="flex items-center flex-none">
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
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            className="min-[860px]:hidden w-[46px] h-[46px] rounded-xl border border-gold/30 bg-transparent flex flex-col items-center justify-center gap-[5px] cursor-pointer"
          >
            <span className="w-[18px] h-[1.5px] bg-gold block" />
            <span className="w-[18px] h-[1.5px] bg-gold block" />
            <span className="w-[18px] h-[1.5px] bg-gold block" />
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div className="min-[860px]:hidden border-t border-gold/16 bg-surface px-5 pt-3.5 pb-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-cream text-base py-3 px-1 border-b border-white/5"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={enquiryHref}
            onClick={() => setMenuOpen(false)}
            className="mt-3 text-center bg-gold text-[#0A1220] py-3.5 px-5.5 rounded-full text-[13px] tracking-[0.08em] uppercase"
          >
            Free consultation
          </Link>
        </div>
      )}
    </header>
  );
}
