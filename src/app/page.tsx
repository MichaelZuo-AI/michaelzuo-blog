import { Suspense } from "react";
import { getAllPosts, getAllTags } from "@/lib/posts";
import PostIndex from "@/components/PostIndex";
import PostIndexFallback from "@/components/PostIndexFallback";

export default function Home() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <Suspense fallback={<PostIndexFallback posts={posts} tags={tags} />}>
      <PostIndex posts={posts} tags={tags} />
    </Suspense>
  );
}
