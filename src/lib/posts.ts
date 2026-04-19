import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  spoiler: string;
  readingTime: string;
  tags: string[];
}

export interface Post extends PostMeta {
  contentHtml: string;
  contentHtmlZh?: string;
  titleZh?: string;
  hasTranslation: boolean;
}

function normalizeTags(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((t): t is string => typeof t === "string" && t.trim().length > 0);
}

function calculateReadingTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight, { detect: true })
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md") && !name.endsWith(".zh.md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        spoiler: data.spoiler || "",
        readingTime: calculateReadingTime(content),
        tags: normalizeTags(data.tags),
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAllTags(): string[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md") && !name.endsWith(".zh.md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export async function getPost(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const contentHtml = await markdownToHtml(content);

  const zhPath = path.join(postsDirectory, `${slug}.zh.md`);
  const hasTranslation = fs.existsSync(zhPath);
  let contentHtmlZh: string | undefined;
  let titleZh: string | undefined;

  if (hasTranslation) {
    const zhContents = fs.readFileSync(zhPath, "utf8");
    const { data: zhData, content: zhContent } = matter(zhContents);
    contentHtmlZh = await markdownToHtml(zhContent);
    titleZh = zhData.title;
  }

  return {
    slug,
    title: data.title,
    date: data.date,
    spoiler: data.spoiler || "",
    readingTime: calculateReadingTime(content),
    tags: normalizeTags(data.tags),
    contentHtml,
    contentHtmlZh,
    titleZh,
    hasTranslation,
  };
}
