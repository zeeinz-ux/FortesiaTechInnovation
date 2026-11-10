"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Mengapa Fortesia tidak mencantumkan daftar harga paket di website?",
      a: "Setiap bisnis memiliki skala, kebutuhan fungsional, dan target trafik yang berbeda. Kami sengaja tidak membuat daftar paket kaku karena sering kali menjebak klien untuk membayar fitur yang tidak mereka perlukan atau sebaliknya, mendapatkan sistem murahan dengan biaya tersembunyi di kemudian hari. Kami menganalisis kebutuhan Anda secara gratis dan memberikan estimasi anggaran yang transparan dan tepat sasaran.",
    },
    {
      q: "Berapa lama estimasi pengerjaan website atau aplikasi?",
      a: "Untuk landing page iklan konversi tinggi biasanya selesai dalam 3–7 hari kerja. Website company profile berkisar antara 1–2 minggu. Sedangkan untuk aplikasi web kustom (ERP/CRM) dan aplikasi mobile Android/iOS berkisar antara 3–8 minggu tergantung skala kompleksitas arsitektur database dan integrasi API yang dibutuhkan.",
    },
    {
      q: "Apakah saya mendapatkan akses penuh source code dan server?",
      a: "Ya, 100%! Seluruh source code, aset desain, database, dan akses hosting/server adalah milik penuh perusahaan Anda. Kami tidak menerapkan sistem lock-in atau biaya sewa tersembunyi untuk kepemilikan kode.",
    },
    {
      q: "Apakah website yang dibuat sudah otomatis ramah SEO dan kencang di HP?",
      a: "Pasti. Semua produk digital yang kami rilis dibangun dengan kode semantik HTML5, meta tag OpenGraph lengkap, Schema.org JSON-LD, serta optimasi Core Web Vitals berstandar Google untuk memastikan kecepatan muat di bawah 1 detik di koneksi seluler mana pun.",
    },
    {
      q: "Bagaimana cara memulai konsultasi pertama saya?",
      a: "Sangat mudah! Cukup klik tombol WhatsApp yang tertera atau hubungi nomor +62 851-2979-2711. Ceritakan ide atau permasalahan website/aplikasi Anda, dan tim kami akan segera membalas dengan rekomendasi solusi teknis dan estimasi langkah berikutnya.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="border-t border-slate-200/80 bg-slate-50/70 py-20 md:py-28 dark:border-white/5 dark:bg-[#07070e]/40" id="faq">
      <Container>
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-purple-500/30 dark:bg-purple-500/15 dark:text-purple-300">
            Pusat Informasi
          </div>
          <h2
            className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-4 text-base text-slate-700 dark:text-slate-300">
            Temukan jawaban langsung seputar alur kerja, harga, kepemilikan kode, dan garansi teknis kami.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={faq.q} delay={idx * 0.06}>
                <div className="glass-panel overflow-hidden rounded-xl">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left text-base font-bold text-slate-950 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-purple-400"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-indigo-600 dark:text-purple-400" : "text-slate-400"
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-200/80 px-5 pt-3 pb-5 text-sm leading-relaxed text-slate-700 dark:border-white/5 dark:text-slate-300">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
