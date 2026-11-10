"use client";

import React, { useState } from "react";
import { Check, Mail, Copy, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";

export default function CTABanner() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("halo@fortesiatech.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const waUrl =
    "https://wa.me/6285893861418?text=" +
    encodeURIComponent(
      "Halo Fortesia Tech Innovation, saya ingin jadwalkan konsultasi gratis mengenai kebutuhan pembuatan produk digital kami."
    );

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/80 via-[#0e0d22] to-purple-950/70 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-indigo-950/50">
          {/* Ambient Glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Siap Mewujudkan Produk Digital Unggulan untuk Bisnis Anda?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Diskusikan kebutuhan pembuatan website, landing page, aplikasi mobile, maupun strategi SEO Anda hari ini bersama tim rekayasa Fortesia. Bebas biaya konsultasi awal dan tanpa perantara berbelit-belit.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-200 lg:justify-start">
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Konsultasi Teknis Gratis</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Analisis Kebutuhan Komprehensif</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Respon Cepat via WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3.5 sm:w-auto">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-sm font-extrabold text-[#092e16] shadow-lg shadow-emerald-500/30 hover:bg-[#20bd5a]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.65.81-.8 0.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
                </svg>
                <span>Konsultasi WhatsApp Sekarang</span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="btn-tactile flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-center text-xs font-bold text-white backdrop-blur-md hover:bg-white/15"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Email Tersalin: halo@fortesiatech.com</span>
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 text-slate-300" />
                    <span>Salin Email: halo@fortesiatech.com</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

