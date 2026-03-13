import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  spoiler: string;
}

export interface Post extends PostMeta {
  contentHtml: string;
  contentHtmlZh?: string;
  hasTranslation: boolean;
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(html).process(markdown);
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
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        spoiler: data.spoiler || "",
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
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

  if (hasTranslation) {
    const zhContents = fs.readFileSync(zhPath, "utf8");
    const { content: zhContent } = matter(zhContents);
    contentHtmlZh = await markdownToHtml(zhContent);
  }

  return {
    slug,
    title: data.title,
    date: data.date,
    spoiler: data.spoiler || "",
    contentHtml,
    contentHtmlZh,
    hasTranslation,
  };
}
