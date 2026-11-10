import React from "react";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://fortesiatech.com/#organization",
        "name": "Fortesia Tech Innovation",
        "url": "https://fortesiatech.com/",
        "logo": "https://fortesiatech.com/logo.svg",
        "description":
          "Software house dan partner rekayasa perangkat lunak terpercaya di Indonesia: jasa pembuatan website perusahaan, landing page konversi tinggi, web app kustom, aplikasi mobile Android & iOS, dan optimasi SEO.",
        "telephone": "+6285129792711",
        "email": "fortesiatechinnovation@gmail.com",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+6285129792711",
          "contactType": "Customer Service",
          "areaServed": "ID",
          "availableLanguage": ["Indonesian", "English"]
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://fortesiatech.com/#service",
        "name": "Fortesia Tech Innovation - Jasa Pembuatan Website & Software House",
        "url": "https://fortesiatech.com/",
        "image": "https://fortesiatech.com/logo.svg",
        "priceRange": "$$",
        "telephone": "+6285129792711",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "ID"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Katalog Layanan Digital Fortesia",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Jasa Pembuatan Website & Web Portal"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Jasa Pembuatan Landing Page Konversi Tinggi"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Pengembangan Custom Web Application (ERP, CRM, SaaS)"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Jasa Pembuatan Aplikasi Mobile Android & iOS"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Jasa Optimasi SEO Indonesia"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Jasa Pembuatan Company Profile Korporat"
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://fortesiatech.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Mengapa Fortesia Tech Innovation tidak mencantumkan daftar harga paket di website?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Karena setiap bisnis memiliki kebutuhan fitur, skala arsitektur, dan target pengguna yang unik. Kami menghindari skema paket murah dengan biaya tersembunyi. Kami menganalisis kebutuhan sistem Anda secara objektif melalui konsultasi gratis agar anggaran Anda optimal hanya untuk fitur yang berdampak."
            }
          },
          {
            "@type": "Question",
            "name": "Berapa lama estimasi pengerjaan website atau aplikasi?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Untuk landing page konversi tinggi berkisar 3-7 hari kerja. Website company profile berkisar 1-2 minggu. Sementara aplikasi web custom dan aplikasi mobile berkisar 3-8 minggu tergantung kompleksitas integrasi database."
            }
          },
          {
            "@type": "Question",
            "name": "Apakah saya mendapatkan akses penuh terhadap source code dan server?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ya, 100%! Seluruh kode program, akun repositori, dan akses hosting/server diserahkan sepenuhnya kepada Anda tanpa ada vendor lock-in."
            }
          },
          {
            "@type": "Question",
            "name": "Apakah website yang dibuat sudah otomatis ramah SEO dan kencang di HP?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pasti. Semua produk yang kami bangun menggunakan kode semantik HTML5, meta tag OpenGraph lengkap, Schema.org JSON-LD, serta optimasi Core Web Vitals berstandar Google untuk memastikan kecepatan muat di bawah 1 detik di koneksi seluler mana pun."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

