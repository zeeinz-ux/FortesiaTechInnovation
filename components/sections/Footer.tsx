import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-slate-100/60 pt-16 pb-12 dark:border-white/5 dark:bg-[#050509]">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand Info */}
          <div>
            <a href="#" className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Fortesia Tech Innovation"
                className="h-9 w-auto"
                width="190"
                height="44"
              />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <strong>Fortesia Tech Innovation</strong> adalah mitra rekayasa perangkat lunak dan agensi digital terpercaya di Indonesia yang berdedikasi membangun website berkecepatan tinggi, aplikasi mobile andal, dan strategi SEO organik yang menghasilkan leads nyata.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">
              Navigasi Cepat
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#layanan" className="transition-colors hover:text-indigo-600 dark:hover:text-purple-400">
                  Layanan Kami
                </a>
              </li>
              <li>
                <a href="#kapabilitas" className="transition-colors hover:text-indigo-600 dark:hover:text-purple-400">
                  Kapabilitas Sistem
                </a>
              </li>
              <li>
                <a href="#keunggulan" className="transition-colors hover:text-indigo-600 dark:hover:text-purple-400">
                  Mengapa Fortesia
                </a>
              </li>
              <li>
                <a href="#alur-kerja" className="transition-colors hover:text-indigo-600 dark:hover:text-purple-400">
                  Alur Kerja
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-indigo-600 dark:hover:text-purple-400">
                  Tanya Jawab (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services (SEO Anchor Links) */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">
              Layanan Utama
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a href="#layanan" className="transition-colors hover:text-indigo-600 dark:hover:text-purple-400">
                  Jasa Pembuatan Website
                </a>
              </li>
              <li>
                <a href="#layanan" className="transition-colors hover:text-indigo-600 dark:hover:text-purple-400">
                  Jasa Bikin Landing Page
                </a>
              </li>
              <li>
                <a href="#layanan" className="transition-colors hover:text-indigo-600 dark:hover:text-purple-400">
                  Jasa Aplikasi Mobile Android &amp; iOS
                </a>
              </li>
              <li>
                <a href="#layanan" className="transition-colors hover:text-indigo-600 dark:hover:text-purple-400">
                  Custom Web Application
                </a>
              </li>
              <li>
                <a href="#layanan" className="transition-colors hover:text-indigo-600 dark:hover:text-purple-400">
                  Jasa Optimasi SEO Indonesia
                </a>
              </li>
              <li>
                <a href="#layanan" className="transition-colors hover:text-indigo-600 dark:hover:text-purple-400">
                  Jasa Company Profile Perusahaan
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase dark:text-white">
              Kontak Resmi
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-emerald-500" />
                <a
                  href="https://wa.me/6285893861418"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-purple-400"
                >
                  +62 858-9386-1418
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-indigo-500 dark:text-cyan-400" />
                <a
                  href="mailto:fortesiatechinnovation@gmail.com"
                  className="font-medium text-slate-800 hover:text-indigo-600 dark:text-slate-200 dark:hover:text-purple-400"
                >
                  fortesiatechinnovation@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                <span>
                  Melayani Klien Seluruh Indonesia (Jakarta, Surabaya, Bandung, Bali &amp; Remote)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/80 pt-8 text-xs text-slate-500 dark:border-white/5 dark:text-slate-400">
          <div>
            &copy; {currentYear} <strong>Fortesia Tech Innovation</strong>. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#layanan" className="hover:underline">Layanan</a>
            <span>•</span>
            <a href="#keunggulan" className="hover:underline">Keunggulan</a>
            <span>•</span>
            <a href="#faq" className="hover:underline">FAQ</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

