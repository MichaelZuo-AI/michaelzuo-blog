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
        <article key={post.slug} className="mb-12">
          <small
            className="block mb-2 text-sm"
            style={{ color: "var(--meta)" }}
          >
            {formatDate(post.date)}
          </small>
          <h3 className="text-2xl font-semibold leading-snug mb-2 tracking-tight">
            <Link
              href={`/post/${post.slug}`}
              className="no-underline transition-colors"
              style={{ color: "var(--title)" }}
            >
              {post.title}
            </Link>
          </h3>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {post.spoiler}
          </p>
        </article>
      ))}
    </div>
  );
}
