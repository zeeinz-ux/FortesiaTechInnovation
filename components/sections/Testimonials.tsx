import React from "react";
import { Quote } from "lucide-react";
import Container from "@/components/ui/Container";

export default function Testimonials() {
  const reviews = [
    {
      quote:
        "Landing page yang dibuat Fortesia untuk kampanye iklan Google kami luar biasa cepat. Waktu loading-nya di bawah 1 detik, dan konversi calon customer via WhatsApp meningkat lebih dari 65% dibanding landing page lama kami.",
      name: "Rendra Hartono",
      role: "Founder, Retail & E-Commerce Jakarta",
      avatar: "RH",
    },
    {
      quote:
        "Sistem web dashboard internal yang mereka kembangkan membuat monitoring inventaris multi-cabang kami jadi otomatis. Komunikasi tim Fortesia sangat responsif dan tidak bertele-tele dalam menjelaskan aspek teknis.",
      name: "Dian Surya",
      role: "Operational Director, Logistik Mandiri",
      avatar: "DS",
    },
    {
      quote:
        "Sangat puas dengan pengerjaan website company profile kami. Desainnya sangat berkelas, mobile-friendly di semua tipe HP, dan ranking SEO kata kunci industri kami langsung naik ke halaman pertama Google.",
      name: "Agus Kurniawan",
      role: "Managing Partner, Konsultan Bisnis Surabaya",
      avatar: "AK",
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-purple-500/30 dark:bg-purple-500/15 dark:text-purple-300">
            Bukti Kepercayaan
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Apa Kata Mereka yang Telah Bekerja Sama?
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Keberhasilan produk digital Anda adalah tolak ukur reputasi kami.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="glass-panel flex flex-col justify-between rounded-2xl p-6 sm:p-8"
            >
              <div>
                <Quote className="h-6 w-6 text-indigo-500/40 dark:text-purple-400/40" />
                <p className="mt-3 text-sm leading-relaxed text-slate-700 italic dark:text-slate-300">
                  {rev.quote}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-200/60 pt-4 dark:border-white/5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-xs font-bold text-white">
                  {rev.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {rev.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {rev.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

