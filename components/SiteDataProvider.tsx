"use client";

import { createContext, useContext, type ReactNode } from "react";

/** Editable content that client components need; loaded on the server in the root layout. */
export type SiteData = {
  /** WhatsApp number in +<digits> form; also used for "Call now" buttons. */
  phoneHref: string;
  /** Logo uploaded in Sanity, or null for the built-in one. */
  logoUrl: string | null;
  services: { slug: string; navTitle: string }[];
  mbbsCountries: string[];
};

const SiteDataContext = createContext<SiteData | null>(null);

export function SiteDataProvider({ value, children }: { value: SiteData; children: ReactNode }) {
  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const value = useContext(SiteDataContext);
  if (!value) throw new Error("useSiteData must be used inside <SiteDataProvider>");
  return value;
}
