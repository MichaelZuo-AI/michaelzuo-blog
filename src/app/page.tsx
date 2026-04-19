import { Suspense } from "react";
import { getAllPosts, getAllTags } from "@/lib/posts";
import PostIndex from "@/components/PostIndex";
import PostIndexFallback from "@/components/PostIndexFallback";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <section className="mz-intro">
        <h1 className="mz-intro-name">Michael</h1>
        <p className="mz-intro-tagline">
          Enjoy building something new and creating value for customers.
        </p>
        <p className="mz-intro-bio">
          10+ years leading engineering teams, with 4 years as the #1 leader
          (mini-CEO) of an AI Hardware Business Unit &mdash; owning strategy,
          P&amp;L, and end-to-end execution.
        </p>
        <p className="mz-intro-bio">
          Hands-on background: 10+ years in mobile engineering, 3+ years in AI
          hardware, 2+ years in autonomous driving development.
        </p>
      </section>
      <Suspense fallback={<PostIndexFallback posts={posts} tags={tags} />}>
        <PostIndex posts={posts} tags={tags} />
      </Suspense>
    </>
  );
}
