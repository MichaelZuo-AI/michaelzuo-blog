import { Suspense } from "react";
import { getAllPosts, getAllTags } from "@/lib/posts";
import PostIndex from "@/components/PostIndex";
import PostIndexFallback from "@/components/PostIndexFallback";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const latest = posts[0];

  return (
    <>
      <section className="mz-intro">
        <div className="mz-intro-copy">
          <p className="mz-eyebrow">blog.michaelzuo.vip</p>
          <h1 className="mz-intro-name">Michael thinks in public.</h1>
          <p className="mz-intro-tagline">
            Notes on AI systems, software engineering, and the operating taste
            required to ship real work with agents.
          </p>
        </div>
        <div className="mz-terminal-hero" aria-label="Site status">
          <div className="mz-terminal-topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="mz-terminal-lines">
            <p><span>$</span> load latest-thinking</p>
            <p><span>ok</span> {posts.length} posts indexed</p>
            <p><span>ok</span> {tags.length} topic filters online</p>
            {latest && (
              <p><span>new</span> {latest.title}</p>
            )}
          </div>
        </div>
      </section>
      <Suspense fallback={<PostIndexFallback posts={posts} tags={tags} />}>
        <PostIndex posts={posts} tags={tags} />
      </Suspense>
    </>
  );
}
