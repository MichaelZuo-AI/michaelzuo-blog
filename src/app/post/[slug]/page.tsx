import Link from "next/link";
import { getAllSlugs, getPost } from "@/lib/posts";
import type { Metadata } from "next";

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
    title: `${post.title} — Michael Zuo`,
    description: post.spoiler,
    openGraph: {
      images: [{ url: "https://michaelzuo.vip/og-image.png", width: 630, height: 630 }],
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
      <header className="mb-8">
        <h1
          className="text-[40px] font-black leading-tight mb-2"
          style={{ color: "var(--title)" }}
        >
          {post.title}
        </h1>
        <small style={{ color: "var(--meta)" }}>
          {formatDate(post.date)}
        </small>
      </header>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <div className="mt-12">
        <Link
          href="/"
          className="no-underline font-bold"
          style={{ color: "var(--link)" }}
        >
          &larr; Back to all posts
        </Link>
      </div>
    </article>
  );
}
