"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";
import type { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

export default function PostIndex({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags: string[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeTag = searchParams.get("tag");

  const filtered = useMemo(
    () => (activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts),
    [posts, activeTag],
  );

  const setTag = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) params.set("tag", tag);
    else params.delete("tag");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <>
      {tags.length > 0 && (
        <nav aria-label="Filter by tag" className="mz-tag-bar mb-10">
          <button
            type="button"
            className={`mz-tag-chip${!activeTag ? " mz-tag-chip--active" : ""}`}
            onClick={() => setTag(null)}
          >
            all
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`mz-tag-chip${activeTag === tag ? " mz-tag-chip--active" : ""}`}
              onClick={() => setTag(tag === activeTag ? null : tag)}
            >
              {tag}
            </button>
          ))}
        </nav>
      )}

      {filtered.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>
          No posts tagged <code className="mz-tag-inline">{activeTag}</code>.
        </p>
      ) : (
        <div className="mz-grid">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
