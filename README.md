# Fortesia Tech Innovation — Official Website

Website resmi **Fortesia Tech Innovation**, software house & partner rekayasa digital di Indonesia (pembuatan website, high-converting landing page, custom web app, aplikasi mobile Android/iOS, dan optimasi SEO).

Dibangun dengan **Next.js 15 (App Router)**, **React 19**, **TypeScript**, dan **Tailwind CSS v4**, siap di-*deploy* penuh di **Vercel** (termasuk route server untuk asisten AI).

---

## Fitur Utama

- **ForteAI Assistant (`ForteAIAssistant` + `ForteAIChatPanel`):**
  - Maskot interaktif yang berpatroli acak secara halus di dalam area layar aman, dapat di-drag langsung dengan kursor/sentuhan, serta menyapa secara kontekstual sesuai section.
  - Kolom chat dengan arsitektur hemat token: 4 kartu *Quick Action* (0 token) + pencocokan topik lokal di `lib/forteai-knowledge.ts`, lalu memanggil **Gemini API Free Tier** via `app/api/assistant/route.ts` (default `gemini-3.5-flash-lite`) dengan pembatasan topik khusus layanan Fortesia, rate-limit per IP, dan fallback lokal otomatis bila kuota habis atau API key belum diisi.
- **Hero 3D Interaktif (`ThreeHeroCanvas`):**
  - Visualisasi partikel TorusKnot berbasis Three.js dengan *cursor repel* di desktop serta penskalaan kamera dan kepadatan partikel otomatis agar tetap bersih di layar HP.
- **Identitas Visual Monokrom & Adaptive Theme:**
  - Logomark geometris `F` Pure Monochrome (`components/ui/Logo.tsx` & `public/favicon.svg`), adaptif otomatis antara Light Mode dan Dark Mode via skrip anti-flash di `app/layout.tsx` (`prefers-color-scheme` + `sessionStorage.theme_override`).
- **SEO & Jalur Konversi WhatsApp:**
  - Metadata OpenGraph/Twitter, Schema.org JSON-LD (`Organization`, `ProfessionalService`, `FAQPage`), `public/sitemap.xml`, dan `public/robots.txt`.
  - Pendekatan konsultasi tanpa daftar harga kaku; seluruh CTA mengarah ke WhatsApp **+62 851-2979-2711**.
- **Performa & Responsivitas Mobile:**
  - Font lokal ter-vendor di `app/fonts/` (`Inter` & `Playfair Display`), ikon teknologi self-hosted di `public/icons/tech/`, penyesuaian tata letak saat keyboard virtual HP terbuka (`visualViewport`), serta selalu kembali ke bagian atas halaman saat browser di-refresh.

---

## Menjalankan Proyek di Lokal

### 1. Install Dependensi
```bash
npm install
```

### 2. Konfigurasi Environment (Opsional untuk Gemini AI)
Salin `.env.example` menjadi `.env` (atau `.env.local`), lalu masukkan API key gratis dari Google AI Studio:
```env
GEMINI_API_KEY=isi_api_key_gemini_anda
GEMINI_MODEL=gemini-3.5-flash-lite
```
> **Catatan:** File `.env` / `.env*.local` otomatis diabaikan oleh `.gitignore`. Tanpa `GEMINI_API_KEY`, asisten ForteAI tetap berjalan normal menggunakan basis pengetahuan lokal.

### 3. Jalankan Development Server
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000).

### 4. Verifikasi TypeScript
```bash
npx tsc --noEmit
```

---

## Deployment

### Vercel (Direkomendasikan — Produksi Penuh)
1. Push repository ke GitHub (`master`).
2. Import proyek di dashboard **Vercel**.
3. Tambahkan **Environment Variables** pada Project Settings Vercel:
   - `GEMINI_API_KEY`
   - `GEMINI_MODEL` (opsional, default `gemini-3.5-flash-lite`)
4. Deploy — route server `/api/assistant` dan seluruh halaman berjalan penuh secara otomatis.

### Static Export / GitHub Pages (Manual Opsional)
Build default (`npm run build`) menghasilkan server build Next.js standar (`.next`). Static export ke `./out` hanya aktif apabila `GITHUB_PAGES=true` diset:
```powershell
$env:GITHUB_PAGES="true"; npm run build
```
Workflow `.github/workflows/deploy.yml` diset ke mode manual (`workflow_dispatch`) agar push ke GitHub tidak memicu build GitHub Pages yang bentrok dengan route API. *(Dalam mode static export murni, `/api/assistant` tidak berjalan sehingga ForteAI memakai balasan lokal.)*
