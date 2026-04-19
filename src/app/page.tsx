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

const HOME_POST_LIMIT = 5;

export default function Home() {
  const allPosts = getAllPosts();
  const posts = allPosts.slice(0, HOME_POST_LIMIT);
  const hasMore = allPosts.length > HOME_POST_LIMIT;

  return (
    <div>
      {posts.map((post) => (
        <article key={post.slug} className="mb-12">
          <small
            className="block mb-2 text-sm"
            style={{ color: "var(--meta)" }}
          >
            {formatDate(post.date)} · {post.readingTime}
          </small>
          <h3
            className="text-2xl font-semibold leading-snug mb-2"
            style={{ letterSpacing: "-0.005em" }}
          >
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
      {hasMore && (
        <div className="mt-4">
          <Link
            href="/archive"
            className="no-underline text-sm font-medium"
            style={{ color: "var(--link)" }}
          >
            All posts &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
