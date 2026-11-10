import React from "react";

export default function FloatingWhatsApp() {
  const waUrl =
    "https://wa.me/6285129792711?text=" +
    encodeURIComponent(
      "Halo Fortesia Tech Innovation, saya ingin konsultasi mengenai pembuatan website / aplikasi digital kami."
    );

  return (
    <aside aria-label="Kontak Cepat WhatsApp">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi langsung via WhatsApp +62 851-2979-2711"
        className="btn-tactile fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-sm font-extrabold text-[#092e16] shadow-lg shadow-emerald-900/30 transition-transform hover:-translate-y-1 hover:bg-[#20bd5a] sm:px-5 sm:py-3.5"
      >
        {/* Pulsing ring */}
        <span
          className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-35"
          aria-hidden="true"
        />

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 fill-current"
          aria-hidden="true"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.65.81-.8 0.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
        </svg>

        <span className="hidden sm:inline">Konsultasi WhatsApp</span>
        <span className="inline sm:hidden">WhatsApp</span>
      </a>
    </aside>
  );
}

