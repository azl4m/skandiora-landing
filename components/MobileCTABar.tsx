"use client";

import { usePathname } from "next/navigation";
import { pageEnquiryHref } from "@/lib/service-contact";
import { site } from "@/data/site";

export default function MobileCTABar() {
  const href = pageEnquiryHref(usePathname());
  return (
    <div data-mobile-cta className="min-[620px]:hidden fixed left-0 right-0 bottom-0 z-[60] bg-[rgba(9,15,26,0.95)] backdrop-blur-md border-t border-gold/20 py-3 px-3.5 grid grid-cols-2 gap-2.5">
      <a
        href={`tel:${site.phoneHref}`}
        className="flex items-center justify-center min-h-12 border border-gold/34 rounded-full text-cream text-sm tracking-[0.06em] uppercase"
      >
        Call now
      </a>
      <a
        href={href}
        className="flex items-center justify-center min-h-12 bg-gold text-white rounded-full text-sm tracking-[0.06em] uppercase"
      >
        {href.startsWith("https://wa.me/") ? "WhatsApp us" : "Free assessment"}
      </a>
    </div>
  );
}
