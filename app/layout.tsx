import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ForteAIAssistant from "@/components/ui/ForteAIAssistant";
import JsonLd from "@/components/seo/JsonLd";
import LoadingScreen from "@/components/ui/LoadingScreen";

// Variable fonts are vendored in app/fonts so the build never depends on
// fonts.googleapis.com (that fetch is what intermittently failed on Vercel).
const inter = localFont({
  src: "./fonts/Inter-latin-var.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "300 800",
  style: "normal",
});

const playfair = localFont({
  src: "./fonts/PlayfairDisplay-latin-var.woff2",
  variable: "--font-playfair",
  display: "swap",
  weight: "600 800",
  style: "normal",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fortesiatech.com"),
  title: "Fortesia Tech Innovation | Jasa Pembuatan Website, Web App, Mobile App & SEO Indonesia",
  description:
    "Software house & partner rekayasa digital terpercaya di Indonesia. Jasa pembuatan website perusahaan, landing page konversi tinggi, aplikasi mobile Android/iOS, custom web app, dan optimasi SEO bergaransi. Cepat, aman, dan konsultasi gratis via WhatsApp +62 851-2979-2711.",
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
      "Bangun website kencang, aplikasi mobile, dan sistem digital berkinerja tinggi bersama Fortesia Tech Innovation. Konsultasi WhatsApp +62 851-2979-2711.",
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
      "Partner software house terpercaya: web app, mobile app, landing page, dan SEO Indonesia. Hubungi WhatsApp +62 851-2979-2711.",
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
    <html lang="id" className={`${inter.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')){localStorage.removeItem('theme');}var d=window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches;var o=sessionStorage.getItem('theme_override');var isDark=o?(o==='dark'):d;if(isDark){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}else{document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if('scrollRestoration'in history){history.scrollRestoration='manual';}var nav=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];if(!window.location.hash||(nav&&nav.type==='reload')){if(window.location.hash){history.replaceState(null,'',window.location.pathname+window.location.search);}var toTop=function(){window.scrollTo({top:0,left:0,behavior:'instant'});};window.scrollTo(0,0);window.addEventListener('DOMContentLoaded',toTop);window.addEventListener('load',function(){toTop();setTimeout(toTop,0);});}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {/* Skip to Content for Accessibility */}
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Lewati ke konten utama
        </a>

        {/* Schema.org Structured Data */}
        <JsonLd />

        {/* Global Loading Screen */}
        <LoadingScreen />

        {/* Global Components */}
        <Header />
        <main id="konten">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <ForteAIAssistant />
      </body>
    </html>
  );
}

