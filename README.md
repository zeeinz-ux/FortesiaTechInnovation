<p>
  <a href="https://fortesiatechinnovation.web.id">
    <img src="./public/favicon.svg" alt="Fortesia Tech Innovation" width="44" height="44" />
  </a>
</p>

# Fortesia Tech Innovation

Codebase website utama [**fortesiatechinnovation.web.id**](https://fortesiatechinnovation.web.id) — landing page, showcase kapabilitas, dan asisten konsultasi **ForteAI** untuk Fortesia Tech Innovation.

`Next.js 15` · `React 19` · `TypeScript` · `Tailwind CSS v4` · `Three.js` · `Gemini API`

[Website](https://fortesiatechinnovation.web.id) · [WhatsApp](https://wa.me/6285129792711) · [Email](mailto:fortesiatechinnovation@gmail.com)

## Stack

| Layer | Implementasi |
| :--- | :--- |
| Framework | Next.js 15 (App Router), React 19, TypeScript strict |
| Styling & Font | Tailwind CSS v4, variabel font lokal `Inter` & `Playfair Display` (`app/fonts/`) |
| Visual 3D | Three.js particle TorusKnot dengan camera scaling adaptif (`ThreeHeroCanvas`) |
| Asisten AI | Route handler `/api/assistant` → Gemini API (`gemini-3.5-flash-lite`) + fallback lokal |
| SEO & Aset | Schema.org JSON-LD (`Organization`, `ProfessionalService`, `FAQPage`), SVG self-hosted |

## Arsitektur ForteAI

Chat diproses bertingkat agar hemat token dan tetap aktif meski API key belum diset:

| Tahap | Penanganan | Sumber |
| :--- | :--- | :--- |
| 1. Quick Action | Kartu pertanyaan cepat dijawab langsung di client (0 token) | `components/ui/ForteAIChatPanel.tsx` |
| 2. Local Knowledge | Guardrail topik & FAQ standar diproses lokal di server | `lib/forteai-knowledge.ts` |
| 3. Gemini Free Tier | Pertanyaan terbuka diteruskan ke Gemini API (limit 12/mnt, 45/jam per IP) dengan fallback lokal otomatis | `app/api/assistant/route.ts` |

## Struktur Proyek

```text
app/
├── api/assistant/route.ts   # Proxy Gemini API, topic guardrail, IP rate-limiter
├── fonts/                   # Variable WOFF2 (Inter & Playfair Display)
├── globals.css              # Token tema light/dark (.dark) & animasi
├── layout.tsx               # Metadata SEO, anti-flash theme init, scroll-reset saat reload
└── page.tsx                 # Urutan section halaman
components/
├── sections/                # Header, Hero, ServicesGrid, CapabilityShowcase, FAQ, Footer
├── seo/JsonLd.tsx           # Structured data JSON-LD
└── ui/                      # Logo, ThreeHeroCanvas, ForteAIAssistant, ForteAIChatPanel, ThemeToggle
lib/
└── forteai-knowledge.ts     # System prompt & basis pengetahuan layanan
public/
├── icons/tech/              # Ikon teknologi SVG self-hosted (cache 1 tahun)
├── images/                  # Pose maskot ForteAI (idle, glide, fly)
├── favicon.svg              # Squircle monokrom F
├── logo.svg                 # Lockup brand monokrom
├── robots.txt
└── sitemap.xml
scripts/
└── fetch-tech-icons.mjs     # Sinkronisasi ikon SVG ke public/icons/tech/
```

## Menjalankan di Lokal

```bash
npm install
npm run dev          # http://localhost:3000
npx tsc --noEmit     # Verifikasi tipe TypeScript
```

Salin `.env.example` ke `.env.local` jika ingin menguji integrasi Gemini secara langsung:

```env
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.5-flash-lite
```

Tanpa `GEMINI_API_KEY`, situs dan panel chat ForteAI tetap berfungsi menggunakan balasan fallback lokal.

## Environment Variables

| Variabel | Wajib | Default | Keterangan |
| :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | Tidak | `—` | API key Google AI Studio untuk `/api/assistant` |
| `GEMINI_MODEL` | Tidak | `gemini-3.5-flash-lite` | Override model Gemini |
| `GITHUB_PAGES` | Tidak | `—` | Set `"true"` hanya untuk static export ke `./out` |

## Deployment

### Vercel

Direkomendasikan untuk produksi penuh karena mendukung route server `/api/assistant` dan header cache aset:

1. Pastikan **Production Branch** pada **Settings → Git** di Vercel diarahkan ke branch utama (`master` atau `main`).
2. Tambahkan `GEMINI_API_KEY` (dan opsional `GEMINI_MODEL`) di **Settings → Environment Variables**.
3. Push ke branch tersebut; Vercel menjalankan `npm run build` secara otomatis.

### Static Export / GitHub Pages

Build default (`npm run build`) menghasilkan server build Next.js di `.next`. Static export ke `./out` hanya aktif ketika `GITHUB_PAGES=true`:

```powershell
$env:GITHUB_PAGES="true"; npm run build
```

Workflow `.github/workflows/deploy.yml` dikonfigurasi manual (`workflow_dispatch`) agar push rutin tidak memicu static export. Pada mode static export murni, `/api/assistant` tidak berjalan sehingga ForteAI otomatis memakai fallback lokal.
