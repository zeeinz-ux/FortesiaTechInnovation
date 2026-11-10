import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import JsonLd from "@/components/seo/JsonLd";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fortesiatech.com"),
  title: "Fortesia Tech Innovation | Jasa Pembuatan Website, Web App, Mobile App & SEO Indonesia",
  description:
    "Software house & partner rekayasa digital terpercaya di Indonesia. Jasa pembuatan website perusahaan, landing page konversi tinggi, aplikasi mobile Android/iOS, custom web app, dan optimasi SEO bergaransi. Cepat, aman, dan konsultasi gratis via WhatsApp +62 858-9386-1418.",
  keywords: [
    "jasa pembuatan website",
    "jasa bikin landing page",
    "jasa pembuatan aplikasi mobile android ios",
    "jasa web app custom",
    "software house indonesia",
    "jasa seo indonesia",
    "jasa company profile perusahaan",
    "jasa web developer jakarta",
    "jasa bikin web surabaya bandung",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fortesia Tech Innovation | Jasa Pembuatan Website, Web App & Mobile App Indonesia",
    description:
      "Bangun website kencang, aplikasi mobile, dan sistem digital berkinerja tinggi bersama Fortesia Tech Innovation. Konsultasi WhatsApp +62 858-9386-1418.",
    url: "https://fortesiatech.com",
    siteName: "Fortesia Tech Innovation",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "Fortesia Tech Innovation - Software House & Digital Studio Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortesia Tech Innovation | Jasa Pembuatan Website, Web App & Mobile App",
    description:
      "Partner software house terpercaya: web app, mobile app, landing page, dan SEO Indonesia. Hubungi WhatsApp +62 858-9386-1418.",
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={jakartaSans.variable} suppressHydrationWarning>
      <body className="min-h-screen antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* Blocking theme script: loads before interactive to prevent theme flash */}
        <Script src="/theme.js" strategy="beforeInteractive" />

        {/* Skip to Content for Accessibility */}
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Lewati ke konten utama
        </a>

        {/* Schema.org Structured Data */}
        <JsonLd />

        {/* Global Components */}
        <Header />
        <main id="konten">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

