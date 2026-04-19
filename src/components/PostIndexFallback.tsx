import type { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

export default function PostIndexFallback({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags: string[];
}) {
  return (
    <>
      {tags.length > 0 && (
        <nav aria-label="Filter by tag" className="mz-tag-bar mb-10">
          <span className="mz-tag-chip mz-tag-chip--active">all</span>
          {tags.map((tag) => (
            <span key={tag} className="mz-tag-chip">
              {tag}
            </span>
          ))}
        </nav>
      )}
      <div className="mz-grid">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
