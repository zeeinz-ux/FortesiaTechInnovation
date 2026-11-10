/**
 * Downloads the tech-stack icons from Simple Icons (CC0 1.0) into
 * `public/icons/tech/` so the site never hits cdn.simpleicons.org at runtime.
 *
 * Usage: node scripts/fetch-tech-icons.mjs
 */
import fs from "node:fs";
import path from "node:path";

const slugs = [
  "nextdotjs","react","typescript","tailwindcss","javascript","html5","css","bootstrap","vite",
  "nodedotjs","python","fastapi","laravel","express","postman",
  "flutter","dart","android","swift","firebase",
  "postgresql","redis","supabase","mysql","mongodb","prisma",
  "docker","cloudflare","vercel","linux","git","github",
];

const outDir = path.join("public", "icons", "tech");
fs.mkdirSync(outDir, { recursive: true });

for (const slug of slugs) {
  const res = await fetch(`https://cdn.simpleicons.org/${slug}`);
  if (!res.ok) {
    console.error(`skip ${slug} (${res.status})`);
    continue;
  }
  const svg = (await res.text()).replace(/>\s+</g, "><").trim();
  fs.writeFileSync(path.join(outDir, `${slug}.svg`), svg, "utf8");
  console.log(`saved ${slug}.svg (${svg.length} bytes)`);
}

// AWS was removed from Simple Icons (trademark), so use a neutral cloud glyph.
fs.writeFileSync(
  path.join(outDir, "amazonwebservices.svg"),
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>',
  "utf8"
);
console.log("saved amazonwebservices.svg (cloud fallback)");
