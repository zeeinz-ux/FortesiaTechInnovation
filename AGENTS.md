# AGENTS.md

Single-page Indonesian marketing site for Fortesia Tech Innovation. Next.js 15 App Router, React 19, TypeScript (strict), Tailwind CSS v4. No backend, no API routes, no database — all conversion paths go to WhatsApp.

## Commands

```bash
npm install
npm run dev                 # http://localhost:3000
npx tsc --noEmit            # the only reliable verification step
```

- `npm run build` produces a normal `.next` server build. It only static-exports to `out/` when `GITHUB_PAGES=true` is set (`next.config.ts`). The README's claim that `npm run build` always emits `/out` is wrong.
- Local static build (PowerShell): `$env:GITHUB_PAGES="true"; npm run build`.
- Do not rely on `npm run lint`: it runs `next lint` with no ESLint config checked in (interactive prompt), and `next.config.ts` sets `eslint.ignoreDuringBuilds`. There are no tests, no Prettier config, and no CI checks beyond the Pages build.

## Structure

- `app/layout.tsx` — metadata, blocking theme script, JSON-LD, and the global `Header`/`Footer`/`FloatingWhatsApp`/`LoadingScreen` shell.
- `app/page.tsx` — section order only. Page sections live in `components/sections/`; shared primitives in `components/ui/`; structured data in `components/seo/`.
- `@/*` maps to the repo root, not `src/`.
- Section `id`s are the navigation contract: `home`, `layanan`, `kapabilitas`, `keunggulan`, `alur-kerja`, `faq`, `kontak`. Adding or reordering a section requires touching `app/page.tsx`, `Header.tsx` `navLinks`, and the hand-maintained `public/sitemap.xml`.

## Gotchas

- **Theme**: dark mode is class-based (`@custom-variant dark` in `app/globals.css`), not media-based. The authoritative initializer is the inline script in `app/layout.tsx`: it follows `prefers-color-scheme`, honors `sessionStorage.theme_override`, and deletes legacy `localStorage.theme`. `public/theme.js` is unreferenced dead code. `ThemeToggle.tsx` mirrors this logic — keep the three in sync.
- **Styling**: `app/globals.css` is one large hand-written stylesheet. Colors come from CSS variables in `:root` (light) and `.dark`, plus Tailwind utilities in both `dark:` and CSS-var form. Reuse those tokens instead of new hex values. The file also contains a large vendored Uiverse theme-switch block — don't add a second copy.
- **Duplicated SEO copy**: metadata lives in `app/layout.tsx`; JSON-LD in `components/seo/JsonLd.tsx`. FAQ questions/answers exist in both `components/sections/FAQ.tsx` and `JsonLd.tsx` with different wording — update both. `public/sitemap.xml` and `public/robots.txt` are static files (no `app/sitemap.ts`).
- **Contact details are hardcoded in ~8 files**: grep `6285129792711` / `fortesiatechinnovation@gmail.com` before changing them.
- **No form backend**: the `CTABanner` contact form validates client-side then opens `wa.me` with the message prefilled. There is nothing to deploy server-side.
- **`LoadingScreen`** covers the viewport with a scripted ~0.9s progress animation on every load (not tied to real asset loading). It is skipped entirely for Lighthouse/headless/reduced-motion. Wait ~1.5s before screenshots.
- **`ThreeHeroCanvas`** is client-only three.js: 9k particles desktop / 4k mobile, capped at 30 FPS, physics disabled on mobile, and paused offscreen or on hidden tabs. It **always** mounts (do not gate it behind a WebGL probe — that made the hero look empty for users with reduced-motion or blocklisted GPUs); on software WebGL (SwiftShader/llvmpipe) and with `prefers-reduced-motion` it renders a single static frame instead of animating. That static-frame fallback is what keeps TBT near zero.
- **Tech-stack icons** are self-hosted in `public/icons/tech/*.svg` (regenerate with `node scripts/fetch-tech-icons.mjs`) and served with a 1-year immutable cache from `next.config.ts`. Do not point them back at `cdn.simpleicons.org`.
- **Fonts**: `next/font/local` with variable woff2 files vendored in `app/fonts/` (`Inter-latin-var.woff2`, `PlayfairDisplay-latin-var.woff2`), exposed as `--font-inter` / `--font-playfair`. Do **not** switch back to `next/font/google`: the build-time fetch from fonts.googleapis.com intermittently crashed Vercel builds (`Cannot read properties of null (reading '1')` in `@next/font/google/loader.js`). Use `var(--font-serif)` / `var(--font-sans)` in components, never a Google Fonts `<link>` or `@import`, and avoid self-referencing theme vars (`--font-serif: var(--font-serif)`).
- **`ScrollReveal`** is a lightweight IntersectionObserver + CSS transition. Do not reintroduce framer-motion; it added ~100 KiB to the client bundle.
- **Deploy**: `.github/workflows/deploy.yml` uploads `./out` on push to `main`/`master`, but never sets `GITHUB_PAGES=true`, so the build won't produce `out/`. Set it in the workflow env when fixing Pages deploys.
- `BLUEPRINT_RENCANA_LANDING_PAGE.md` is a gitignored local planning doc that predates the Next.js implementation (it describes a static `index.html` + vanilla JS). Trust the code over it.

## Content conventions

- All user-facing copy is Indonesian, benefit-led, and deliberately has **no price table** — pricing is handled via free WhatsApp consultation. Preserve that framing when editing copy or adding sections.
- Brand palette: violet `#8b5cf6`, indigo `#6366f1`, cyan `#38bdf8`, emerald `#10b981`; headings use Playfair Display, body uses Inter.
