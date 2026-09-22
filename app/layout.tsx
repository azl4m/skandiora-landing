import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTABar from "@/components/MobileCTABar";
import JsonLd from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schema";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteName = "Skandiora Immigration";
const title = "Skandiora Immigration — Study Abroad, MBBS & Visa Consultants in Kochi, Trivandrum & Chennai";
const description =
  "Skandiora Immigration helps students and families in Kochi, Trivandrum and Chennai explore study-abroad, MBBS, domestic admission, credit transfer, loan, language and visa pathways with personalised, transparent guidance.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.skandiora.com"),
  title: { default: title, template: `%s | ${siteName}` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    siteName,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-[#EAF0FA]">
        <div className="max-w-full overflow-x-clip flex flex-col min-h-full">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileCTABar />
        </div>
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
