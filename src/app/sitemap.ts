import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import config from "../../site.config";

export const dynamic = "force-static";

const BASE_URL = config.url || "https://michaelzuo.vip";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/post/${post.slug}`,
    lastModified: post.date,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      priority: 1.0,
    },
    ...postEntries,
  ];
}
