"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Star, ShieldCheck, Activity, ChevronDown, Code2 } from "lucide-react";
import Container from "@/components/ui/Container";

const ThreeHeroCanvas = dynamic(() => import("@/components/ui/ThreeHeroCanvas"), {
  ssr: false,
});

export default function Hero() {
  const waUrl =
    "https://wa.me/6285129792711?text=" +
    encodeURIComponent(
      "Halo Fortesia Tech Innovation, saya ingin konsultasi mengenai pembuatan website / aplikasi digital kami."
    );

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24" id="home">
      {/* 3D Interactive WebGL Torus Knot Background */}
      <ThreeHeroCanvas />

      {/* Subtle Grid Overlay - Confined to Hero with Smooth Bottom Fade (Matches Zeinz Woven Light Hero) */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,black_40%,transparent_90%)]"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute top-12 left-1/2 -z-10 h-[500px] w-[750px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-purple-600/20"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge Pill with Lucide Code2 Icon */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/80 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            <Code2 className="h-3.5 w-3.5 text-indigo-600 dark:text-purple-400" />
            <span>Software House &amp; Rekayasa Digital Indonesia</span>
          </div>

          {/* Main H1 Headline (Shorter, Punchier, with Playfair Display) */}
          <h1
            className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl md:text-6xl dark:text-white leading-[1.15]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Website Kencang &amp; Aplikasi Andal.
          </h1>

          {/* Value Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300">
            Hentikan kehilangan calon klien akibat website lemot.{" "}
            <strong className="font-semibold text-slate-950 dark:text-white">
              Fortesia Tech Innovation
            </strong>{" "}
            membangun landing page berkonversi tinggi, custom web app, dan aplikasi mobile yang siap menghasilkan penjualan nyata.
          </p>

          {/* Dual Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-extrabold text-[#092e16] shadow-lg shadow-emerald-500/25 hover:bg-[#20bd5a]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.65.81-.8 0.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
              </svg>
              <span>Konsultasi WhatsApp Gratis</span>
            </a>

            <a
              href="#layanan"
              className="btn-tactile inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-md hover:border-slate-400 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              <span>Lihat Layanan Kami</span>
              <ChevronDown className="h-4 w-4" />
            </a>
          </div>

          {/* Trust Metrics Bar */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-slate-700 sm:text-sm dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
              <span>
                <strong className="text-slate-950 dark:text-white">4.9 / 5.0</strong> Kepuasan Klien
              </span>
            </div>
            <div className="hidden h-3.5 w-px bg-slate-300 sm:block dark:bg-white/10" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                <strong className="text-slate-950 dark:text-white">99.8%</strong> Stabilitas Sistem
              </span>
            </div>
            <div className="hidden h-3.5 w-px bg-slate-300 sm:block dark:bg-white/10" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-cyan-400" />
              <span>
                <strong className="text-slate-950 dark:text-white">100%</strong> Hak Milik Source Code
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

