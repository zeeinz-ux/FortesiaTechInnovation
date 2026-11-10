import React from "react";
import Container from "@/components/ui/Container";

export default function Hero() {
  const waUrl =
    "https://wa.me/6285893861418?text=" +
    encodeURIComponent(
      "Halo Fortesia Tech Innovation, saya ingin konsultasi mengenai pembuatan website / aplikasi digital kami."
    );

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background Radial Glow */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -z-10 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[100px] dark:bg-purple-600/20"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge Pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-purple-500/30 dark:bg-purple-500/15 dark:text-purple-300">
            <span className="text-sm">✨</span>
            <span>Partner Software House &amp; Rekayasa Digital Indonesia</span>
          </div>

          {/* Main H1 Headline */}
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
            Bangun <span className="text-gradient">Website Kencang</span> &amp; Aplikasi Andal yang Menghasilkan Penjualan.
          </h1>

          {/* Value Subtitle (Bebas AI Slop) */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Hentikan kehilangan calon klien akibat website lemot atau aplikasi yang sering bermasalah.{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              Fortesia Tech Innovation
            </strong>{" "}
            membangun landing page konversi tinggi, custom web app, aplikasi mobile Android &amp; iOS, serta optimasi SEO terukur dengan arsitektur kode modern.
          </p>

          {/* Dual Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-extrabold text-[#092e16] shadow-lg shadow-emerald-500/20 hover:bg-[#20bd5a]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.65.81-.8 0.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
              </svg>
              <span>Konsultasi WhatsApp Gratis</span>
            </a>

            <a
              href="#layanan"
              className="btn-tactile inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur-md hover:border-slate-400 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              <span>Lihat Layanan Kami</span>
              <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Trust Metrics Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="text-amber-500">★★★★★</span>
              <span>
                Kepuasan Klien <strong className="text-slate-900 dark:text-white">4.9 / 5.0</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500" />
              <span>
                <strong className="text-slate-900 dark:text-white">99.8%</strong> Sistem Stabil &amp; Kencang
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-cyan-500">✓</span>
              <span>
                <strong className="text-slate-900 dark:text-white">100% Hak Milik</strong> Source Code
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-purple-500">⚡</span>
              <span>Tanpa Biaya Tersembunyi</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Card (Inspired by the Nexora Dark Dashboard Screenshot) */}
        <div className="mx-auto mt-14 max-w-5xl">
          <div className="glass-panel overflow-hidden rounded-2xl p-6 sm:p-8">
            {/* Window Topbar */}
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-indigo-300">
                FORTESIA HIGH-PERFORMANCE ENGINE
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                ● Live Production Ready
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-white/[0.02]">
                <div className="text-xs text-slate-500 dark:text-slate-400">Google PageSpeed Score</div>
                <div className="my-1 text-2xl font-black text-emerald-600 sm:text-3xl dark:text-emerald-400">
                  100 / 100
                </div>
                <div className="text-xs font-medium text-emerald-600/80 dark:text-emerald-300">
                  Lolos Core Web Vitals
                </div>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-white/[0.02]">
                <div className="text-xs text-slate-500 dark:text-slate-400">Waktu Muat (FCP)</div>
                <div className="my-1 text-2xl font-black text-indigo-600 sm:text-3xl dark:text-cyan-400">
                  0.38 Detik
                </div>
                <div className="text-xs font-medium text-indigo-600/80 dark:text-cyan-300">
                  Akses Cepat di Semua HP
                </div>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-white/[0.02]">
                <div className="text-xs text-slate-500 dark:text-slate-400">SEO Search Visibility</div>
                <div className="my-1 text-2xl font-black text-purple-600 sm:text-3xl dark:text-purple-400">
                  A+ Grade
                </div>
                <div className="text-xs font-medium text-purple-600/80 dark:text-purple-300">
                  Schema.org &amp; Semantic HTML
                </div>
              </div>
            </div>

            {/* Terminal Line Mockup */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-900 px-4 py-3 font-mono text-xs text-slate-300">
              <div>
                <span className="text-purple-400">fortesia-engine:~$</span> deploy --prod --seo=true --speed=100
              </div>
              <span className="font-bold text-emerald-400">✓ Production Verified</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

