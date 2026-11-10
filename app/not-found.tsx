import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
      <p className="text-[11px] font-bold tracking-[0.28em] uppercase mb-4 text-indigo-600 dark:text-purple-400">
        Error 404
      </p>
      <h1
        className="text-6xl sm:text-7xl font-bold mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-center max-w-md mb-8 text-sm sm:text-base">
        Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        href="/"
        className="btn-tactile inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-xs font-bold shadow-lg shadow-indigo-500/25 hover:brightness-110 transition-all"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
