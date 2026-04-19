import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const TAG_HERO_CLASS: Record<string, string> = {
  "ai-engineering": "mz-hero--sage",
  agents: "mz-hero--terracotta",
  career: "mz-hero--lavender",
  "design-systems": "mz-hero--rose",
};

export default function PostCard({ post }: { post: PostMeta }) {
  const primary = post.tags[0];
  const heroClass = primary ? TAG_HERO_CLASS[primary] ?? "mz-hero--neutral" : "mz-hero--neutral";
  const initial = post.title.charAt(0).toUpperCase();

  return (
    <Link href={`/post/${post.slug}`} className="mz-card-link no-underline">
      <article className="mz-card">
        <div className={`mz-card-hero ${heroClass}`} aria-hidden="true">
          <span className="mz-card-initial">{initial}</span>
        </div>
        <div className="mz-card-body">
          <small className="mz-card-meta">
            {formatDate(post.date)} &middot; {post.readingTime}
          </small>
          <h3 className="mz-card-title">{post.title}</h3>
          <p className="mz-card-spoiler">{post.spoiler}</p>
          {primary && <div className="mz-card-tag">{primary}</div>}
        </div>
      </article>
    </Link>
  );
}
