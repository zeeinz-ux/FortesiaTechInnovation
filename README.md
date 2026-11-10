# 🚀 Fortesia Tech Innovation - Official Landing Page

Website landing page resmi untuk **Fortesia Tech Innovation** — Software House & Partner Rekayasa Digital di Indonesia.

Dibangun dengan arsitektur **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, serta dilengkapi dukungan **Dark Mode & Light Mode**, **SEO Terstruktur (Schema.org JSON-LD)**, dan siap di-*deploy* secara otomatis ke **GitHub Pages**.

---

## 🌟 Fitur Utama

- 🌗 **Dark Mode & Light Mode Switcher:**
  - *Dark Mode (Default):* Nuansa modern neon violet, indigo, dan obsidian dark (sesuai referensi desain).
  - *Light Mode:* Tampilan minimalis profesional, bersih, dan kontras tinggi.
  - Zero-flash blocking theme script (`/public/theme.js`) & tersimpan di `localStorage`.
- 🔍 **SEO Komprehensif Standar Google Indonesia:**
  - Riset kata kunci transaksional volume tinggi: Jasa Pembuatan Website, Landing Page Konversi Tinggi, Aplikasi Mobile Android/iOS, Custom Web App, Optimasi SEO, dan Company Profile.
  - Metadata OpenGraph, Twitter Cards, Canonical URL, `sitemap.xml`, dan `robots.txt`.
  - Structured Data (Schema.org) `Organization`, `ProfessionalService`, dan `FAQPage`.
- ⚡ **Performa Ekstrem (< 1 Detik):**
  - Menggunakan Static Site Generation (`output: 'export'`) sehingga langsung terkompilasi jadi HTML murni yang super ringan dan terbaca instan oleh Googlebot.
- 💬 **Konversi Tanpa Tabel Harga:**
  - Semua Call-to-Action diarahkan langsung ke WhatsApp resmi **+62 851-2979-2711** dengan parameter pesan pembuka otomatis.
  - Tersedia Floating WhatsApp Action Button di pojok kanan bawah.
- 📱 **100% Mobile-Friendly & Responsif:**
  - Drawer menu sentuhan satu jempol, tata letak fleksibel di semua ukuran layar smartphone dan desktop.

---

## 🛠️ Menjalankan Proyek di Komputer Lokal

### 1. Install Dependensi
```bash
npm install
```

### 2. Jalankan Server Development
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 3. Build Static Export (Siap Deploy ke GitHub Pages / Hosting)
```bash
npm run build
```
Hasil kompilasi berupa file HTML/CSS/JS statis murni akan berada di dalam folder `/out`.

---

## 🚀 Alur Deployment ke GitHub Pages

Proyek ini telah dilengkapi GitHub Actions di `.github/workflows/deploy.yml`. Cukup push kode ke branch `main`:
```bash
git add .
git commit -m "feat: landing page fortesia tech innovation"
git push origin main
```
Di repository GitHub Anda:
1. Buka tab **Settings** > **Pages**.
2. Pada bagian **Build and deployment** > **Source**, pilih **GitHub Actions**.
3. Website akan otomatis online dan ter-update setiap kali ada perubahan kode.

