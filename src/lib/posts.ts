import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  spoiler: string;
  wordCount: number;
  readingTime: number;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function countWords(text: string): number {
  return text
    .replace(/[#*`>\-|_\[\](){}]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const wordCount = countWords(content);

      return {
        slug,
        title: data.title,
        date: data.date,
        spoiler: data.spoiler || "",
        wordCount,
        readingTime: Math.max(1, Math.round(wordCount / 200)),
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export async function getPost(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  const wordCount = countWords(content);

  return {
    slug,
    title: data.title,
    date: data.date,
    spoiler: data.spoiler || "",
    wordCount,
    readingTime: Math.max(1, Math.round(wordCount / 200)),
    contentHtml,
  };
}
