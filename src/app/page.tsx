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
          A Problem Solver, A World Explorers.
        </p>
      </section>
      <Suspense fallback={<PostIndexFallback posts={posts} tags={tags} />}>
        <PostIndex posts={posts} tags={tags} />
      </Suspense>
    </>
  );
}
