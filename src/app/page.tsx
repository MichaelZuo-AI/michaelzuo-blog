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
        <article key={post.slug} className="mb-10">
          <h3 className="text-[28px] font-black leading-tight mb-1">
            <Link
              href={`/post/${post.slug}`}
              className="no-underline transition-transform inline-block hover:scale-[1.005]"
              style={{ color: "var(--title)" }}
            >
              {post.title}
            </Link>
          </h3>
          <small
            className="block mb-2"
            style={{ color: "var(--meta)" }}
          >
            {formatDate(post.date)}
          </small>
          <p style={{ color: "var(--text)" }}>{post.spoiler}</p>
        </article>
      ))}
    </div>
  );
}
