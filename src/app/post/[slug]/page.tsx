import Link from "next/link";
import { getAllSlugs, getPost } from "@/lib/posts";
import PostContent from "@/components/PostContent";
import type { Metadata } from "next";
import config from "../../../../site.config";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return {
    title: `${post.title} — ${config.name}`,
    description: post.spoiler,
    openGraph: {
      title: post.title,
      description: post.spoiler,
      images: [{ url: config.ogImage, width: 600, height: 600 }],
    },
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <article>
      <header className="mb-10">
        <small
          className="block mb-3 text-sm"
          style={{ color: "var(--meta)" }}
        >
          {formatDate(post.date)}
        </small>
        <h1
          className="text-4xl font-bold leading-tight tracking-tight"
          style={{ color: "var(--title)" }}
        >
          {post.title}
        </h1>
      </header>
      <PostContent
        contentHtml={post.contentHtml}
        contentHtmlZh={post.contentHtmlZh}
        hasTranslation={post.hasTranslation}
      />
      <div className="mt-16">
        <Link
          href="/"
          className="no-underline text-sm font-medium"
          style={{ color: "var(--link)" }}
        >
          &larr; Back to all posts
        </Link>
      </div>
    </article>
  );
}
