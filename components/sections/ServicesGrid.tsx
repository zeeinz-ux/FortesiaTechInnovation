import React from "react";
import Container from "@/components/ui/Container";

export default function ServicesGrid() {
  const services = [
    {
      title: "Jasa Pembuatan Website & Web Portal",
      desc: "Bangun website bisnis modern yang profesional, ringan, dan mudah dikelola. Dirancang dengan UI/UX eksklusif untuk membangun kredibilitas brand Anda di hadapan mitra dan calon pembeli.",
      tags: ["Web Perusahaan", "Portal Berita", "Katalog Online"],
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      waMessage: "Website Bisnis & Portal",
    },
    {
      title: "High-Converting Landing Page",
      desc: "Landing page berorientasi konversi tinggi yang dibuat khusus untuk kampanye iklan Google Ads, TikTok Ads, dan Meta Ads. Loading di bawah 1 detik agar tidak ada calon leads yang mental sebelum membaca penawaran.",
      tags: ["Konversi Iklan", "Ultra Fast Load", "Direct WA CTA"],
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      waMessage: "Landing Page Konversi Tinggi",
    },
    {
      title: "Custom Web Application",
      desc: "Digitalisasikan operasional internal perusahaan dengan sistem web aplikasi yang aman dan fleksibel. Mulai dari dashboard analytics, ERP kustom, CRM, sistem absensi, hingga inventory gudang.",
      tags: ["ERP / CRM", "SaaS Platform", "Database Complex"],
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
      waMessage: "Custom Web Application (ERP/CRM)",
    },
    {
      title: "Aplikasi Mobile Android & iOS",
      desc: "Pengembangan aplikasi mobile lintas platform (Cross-Platform Flutter / React Native) dengan performa setara native. Antarmuka mulus 60 FPS, konsumsi baterai efisien, dan siap rilis ke Play Store & App Store.",
      tags: ["Flutter & Dart", "Play Store & App Store", "Push Notification"],
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="2">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
      waMessage: "Aplikasi Mobile Android & iOS",
    },
    {
      title: "Layanan Optimasi SEO Indonesia",
      desc: "Raih posisi puncak di hasil pencarian Google tanpa ketergantungan iklan berbayar terus-menerus. Meliputi riset kata kunci komersial, optimasi teknis Core Web Vitals, Schema.org, dan audit On-Page terstruktur.",
      tags: ["Technical SEO", "Keyword Research ID", "Schema Markup"],
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      ),
      waMessage: "Jasa Optimasi SEO",
    },
    {
      title: "Website Company Profile Korporat",
      desc: "Tampilkan identitas, visi, portofolio, dan legalitas perusahaan Anda secara berkelas. Standar terbaik untuk memenangkan tender B2B, meyakinkan calon investor, dan membangun reputasi korporasi di tingkat nasional.",
      tags: ["Profil Korporasi", "Tender & B2B Ready", "Desain Elegan"],
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
      ),
      waMessage: "Website Company Profile Korporat",
    },
  ];

  return (
    <section className="py-20 md:py-28" id="layanan">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-purple-500/30 dark:bg-purple-500/15 dark:text-purple-300">
            Katalog Layanan Digital
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Solusi Rekayasa Digital untuk Pertumbuhan Bisnis
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Kami tidak menjual website template instan yang berat dan pasaran. Setiap baris kode dirancang spesifik untuk mendukung model bisnis, brand identity, dan performa konversi Anda.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => {
            const waHref =
              "https://wa.me/6285893861418?text=" +
              encodeURIComponent(
                `Halo Fortesia Tech Innovation, saya tertarik untuk konsultasi mengenai pembuatan ${item.waMessage}. Bagaimana estimasi timeline dan alurnya?`
              );

            return (
              <article
                key={item.title}
                className="glass-panel flex flex-col justify-between rounded-2xl p-6 sm:p-8"
              >
                <div>
                  <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 transition-transform group-hover:scale-105 dark:bg-purple-500/15 dark:text-purple-400">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-200/60 pt-5 dark:border-white/5">
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    <span>Konsultasikan Layanan Ini</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

