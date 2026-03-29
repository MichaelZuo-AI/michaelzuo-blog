import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const BASE_URL = "https://michaelzuo.vip";
const CONTENT_DIR = join(process.cwd(), "content");
const OUT_DIR = join(process.cwd(), "out");

if (!existsSync(OUT_DIR)) {
  console.error("Error: out/ directory not found. Run `next build` first.");
  process.exit(1);
}

const files = readdirSync(CONTENT_DIR).filter(
  (f) => f.endsWith(".md") && !f.endsWith(".zh.md")
);

const posts = files.map((file) => {
  const raw = readFileSync(join(CONTENT_DIR, file), "utf-8");
  const { data } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  return { slug, date: data.date || null };
});

const today = new Date().toISOString().split("T")[0];

const urls = [
  `  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${today}</lastmod>
    <priority>1.0</priority>
  </url>`,
  ...posts.map(
    (p) => `  <url>
    <loc>${BASE_URL}/post/${p.slug}</loc>${p.date ? `\n    <lastmod>${p.date}</lastmod>` : ""}
    <priority>0.8</priority>
  </url>`
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync(join(OUT_DIR, "sitemap.xml"), sitemap, "utf-8");
console.log(`Sitemap generated with ${urls.length} URLs → out/sitemap.xml`);
