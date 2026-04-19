import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import config from "../../../site.config";
import ArchiveList from "./ArchiveList";
import ArchiveFallback from "./ArchiveFallback";

export const metadata: Metadata = {
  title: `Archive — ${config.name}`,
  description: `All posts from ${config.name}.`,
};

export default function ArchivePage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div>
      <header className="mb-10">
        <h1
          className="font-bold"
          style={{
            color: "var(--title)",
            fontSize: "2.5rem",
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
          }}
        >
          Archive
        </h1>
        <p
          className="mt-3"
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1875rem",
            lineHeight: 1.55,
          }}
        >
          Every post, grouped by year and month.
        </p>
      </header>
      <Suspense fallback={<ArchiveFallback posts={posts} tags={tags} />}>
        <ArchiveList posts={posts} tags={tags} />
      </Suspense>
    </div>
  );
}
