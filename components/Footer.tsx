import Link from "next/link";
import Logo from "./Logo";
import { site } from "@/data/site";
import { services } from "@/data/services";

const companyLinks = [
  { href: "/about", label: "About us" },
  { href: "/#process", label: "Our process" },
  { href: "/destinations", label: "Destinations" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050A12] text-[rgba(232,237,245,0.72)] px-5 pt-[clamp(44px,5vw,64px)] pb-28 min-[620px]:pb-7">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 min-[620px]:grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-8">
        <div className="min-w-0">
          <Logo mark={44} nameSize="text-[20px]" taglineSize="text-[9px]" gap="gap-3" />
          <p className="text-sm leading-[1.7] mt-4.5 max-w-[34ch]">
            {site.tagline} Admissions, credit transfer, visas and attestation under one roof.
          </p>
        </div>

        <div className="min-w-0">
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-3.5">Services</div>
          <div className="flex flex-col gap-2.5 text-sm">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="hover:text-white transition-colors">
                {s.navTitle}
              </Link>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-3.5">Company</div>
          <div className="flex flex-col gap-2.5 text-sm">
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <div className="text-xs tracking-[0.2em] uppercase text-gold mb-3.5">Contact</div>
          <div className="flex flex-col gap-2.5 text-sm">
            <a href={`tel:${site.phoneHref}`} className="hover:text-white transition-colors">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-white transition-colors">
              {site.email}
            </a>
            <span>Trivandrum · Kochi · Chennai</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto mt-[clamp(32px,4vw,48px)] pt-5 border-t border-white/12 flex flex-wrap gap-3 justify-between text-[13px] text-[rgba(232,237,245,0.5)]">
        <span>© {new Date().getFullYear()} Skandiora Immigration™. All rights reserved.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}
