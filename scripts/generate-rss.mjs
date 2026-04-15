import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_TITLE = "Michael Zuo";
const SITE_DESCRIPTION =
  "Writing on software engineering, AI-driven development, and building things.";
const SITE_URL = "https://blog.michaelzuo.vip";

const contentDir = path.join(process.cwd(), "content");
const outDir = path.join(process.cwd(), "out");

const files = fs
  .readdirSync(contentDir)
  .filter((f) => f.endsWith(".md") && !f.endsWith(".zh.md"));

const posts = files
  .map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      title: data.title || slug,
      date: data.date ? new Date(data.date) : new Date(0),
      spoiler: data.spoiler || "",
    };
  })
  .sort((a, b) => b.date - a.date);

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const items = posts
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/post/${p.slug}</link>
      <description>${escapeXml(p.spoiler)}</description>
      <pubDate>${p.date.toUTCString()}</pubDate>
      <guid>${SITE_URL}/post/${p.slug}</guid>
    </item>`
  )
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(outDir, "feed.xml"), rss, "utf-8");
console.log(`RSS feed generated: out/feed.xml (${posts.length} posts)`);
