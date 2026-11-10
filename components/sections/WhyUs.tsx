import React from "react";
import { Boxes, Zap, KeyRound, LifeBuoy } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function WhyUs() {
  const pillars = [
    {
      num: "01",
      icon: <Boxes className="h-5 w-5 text-indigo-600 dark:text-cyan-400" />,
      title: "Bukan Template Pasaran",
      desc: "Kami menyusun kode dan desain secara khusus sesuai karakter brand dan kebutuhan fungsional Anda. Tidak ada kode sampah atau plugin berbahaya yang membebani server.",
    },
    {
      num: "02",
      icon: <Zap className="h-5 w-5 text-indigo-600 dark:text-cyan-400" />,
      title: "Kecepatan Muat < 1 Detik",
      desc: "Pengunjung internet di Indonesia tidak suka menunggu. Kami memastikan aset teroptimasi, minim dependensi, dan langsung tampil seketika saat diakses dari smartphone.",
    },
    {
      num: "03",
      icon: <KeyRound className="h-5 w-5 text-indigo-600 dark:text-cyan-400" />,
      title: "100% Hak Milik Source Code",
      desc: "Seluruh kode sumber, desain UI/UX, dan akun server diserahkan sepenuhnya kepada Anda. Tanpa ada sistem ikatan sewa sepihak (no vendor lock-in).",
    },
    {
      num: "04",
      icon: <LifeBuoy className="h-5 w-5 text-indigo-600 dark:text-cyan-400" />,
      title: "Dukungan & Garansi Purna Jual",
      desc: "Kami tidak menghilang setelah website selesai. Kami memberikan periode garansi perbaikan bug gratis serta pendampingan teknis agar operasional bisnis Anda tetap lancar.",
    },
  ];

  return (
    <section className="py-20 md:py-28" id="keunggulan">
      <Container>
        <ScrollReveal className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-purple-500/30 dark:bg-purple-500/15 dark:text-purple-300">
            Standar Keunggulan
          </div>
          <h2
            className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl dark:text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Kenapa Pelaku Bisnis Memilih Fortesia?
          </h2>
          <p className="mt-4 text-base text-slate-700 dark:text-slate-300">
            Banyak agensi membebankan biaya mahal untuk hasil template siap pakai yang lambat. Kami bekerja dengan komitmen rekayasa perangkat lunak sejati.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, idx) => (
            <ScrollReveal key={pillar.num} delay={idx * 0.08}>
              <div className="glass-panel flex h-full flex-col justify-between rounded-2xl p-6 sm:p-7">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-3xl font-black text-slate-400 dark:text-white/20">
                      {pillar.num}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 dark:bg-white/5">
                      {pillar.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
