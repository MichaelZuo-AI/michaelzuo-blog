import Link from "next/link";
import { getAllSlugs, getPost } from "@/lib/posts";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: `${post.title} — Michael Zuo`,
    description: post.spoiler,
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article>
      <header className="text-center mb-10">
        <h1
          className="text-[36px] font-black leading-tight mb-3"
          style={{ color: "var(--title)" }}
        >
          {post.title}
        </h1>
        <div
          className="flex items-center justify-center gap-3 text-sm"
          style={{ color: "var(--meta)" }}
        >
          <time>{formatDate(post.date)}</time>
          <span>&middot;</span>
          <span>{post.wordCount.toLocaleString()} words</span>
          <span>&middot;</span>
          <span>{post.readingTime} min read</span>
        </div>
      </header>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="no-underline text-sm hover:opacity-70 transition-opacity"
          style={{ color: "var(--link)" }}
        >
          &larr; Back to all posts
        </Link>
      </div>
    </article>
  );
}
