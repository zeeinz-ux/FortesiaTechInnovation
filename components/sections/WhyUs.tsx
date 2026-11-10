import React from "react";
import Container from "@/components/ui/Container";

export default function WhyUs() {
  const pillars = [
    {
      num: "01",
      title: "Bukan Template Pasaran",
      desc: "Kami menyusun kode dan desain secara khusus sesuai karakter brand dan kebutuhan fungsional Anda. Tidak ada kode sampah atau plugin berbahaya yang membebani server.",
    },
    {
      num: "02",
      title: "Kecepatan Muat < 1 Detik",
      desc: "Pengunjung internet di Indonesia tidak suka menunggu. Kami memastikan aset teroptimasi, minim dependensi, dan langsung tampil seketika saat diakses dari smartphone.",
    },
    {
      num: "03",
      title: "100% Hak Milik Source Code",
      desc: "Seluruh kode sumber, desain UI/UX, dan akun server diserahkan sepenuhnya kepada Anda. Tanpa ada sistem ikatan sewa sepihak (no vendor lock-in).",
    },
    {
      num: "04",
      title: "Dukungan & Garansi Purna Jual",
      desc: "Kami tidak menghilang setelah website selesai. Kami memberikan periode garansi perbaikan bug gratis serta pendampingan teknis agar operasional bisnis Anda tetap lancar.",
    },
  ];

  return (
    <section className="py-20 md:py-28" id="keunggulan">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-700 dark:border-purple-500/30 dark:bg-purple-500/15 dark:text-purple-300">
            Standar Keunggulan
          </div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Kenapa Pelaku Bisnis Memilih <span className="text-gradient">Fortesia</span>?
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Banyak agensi membebankan biaya mahal untuk hasil template siap pakai yang lambat. Kami bekerja dengan komitmen rekayasa perangkat lunak sejati.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="glass-panel rounded-2xl p-6 sm:p-7">
              <div className="mb-4 text-4xl font-black text-indigo-600/30 dark:text-purple-500/30">
                {pillar.num}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {pillar.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

