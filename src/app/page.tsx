import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      {posts.map((post) => (
        <article
          key={post.slug}
          className="mb-12 pb-12 border-b last:border-b-0"
          style={{ borderColor: "color-mix(in srgb, var(--meta), transparent 70%)" }}
        >
          <h2 className="text-[24px] font-bold leading-snug mb-2">
            <Link
              href={`/post/${post.slug}`}
              className="no-underline hover:opacity-70 transition-opacity"
              style={{ color: "var(--title)" }}
            >
              {post.title}
            </Link>
          </h2>
          <div
            className="flex items-center gap-3 text-sm mb-3"
            style={{ color: "var(--meta)" }}
          >
            <time>{formatDate(post.date)}</time>
            <span>&middot;</span>
            <span>{post.wordCount.toLocaleString()} words</span>
            <span>&middot;</span>
            <span>{post.readingTime} min read</span>
          </div>
          <p className="leading-relaxed" style={{ color: "var(--text)" }}>
            {post.spoiler}
          </p>
          <Link
            href={`/post/${post.slug}`}
            className="inline-block mt-3 text-sm no-underline hover:opacity-70 transition-opacity"
            style={{ color: "var(--link)" }}
          >
            Read Full &rarr;
          </Link>
        </article>
      ))}
    </div>
  );
}
