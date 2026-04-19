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
  const postUrl = `${config.url}/post/${slug}`;
  return {
    title: `${post.title} — ${config.name}`,
    description: post.spoiler,
    alternates: {
      canonical: postUrl,
      ...(post.hasTranslation
        ? {
            languages: {
              en: postUrl,
              "zh-Hans": postUrl,
            },
          }
        : {}),
    },
    openGraph: {
      title: post.title,
      description: post.spoiler,
      type: "article",
      publishedTime: post.date,
      authors: [config.name],
      ...(post.hasTranslation ? { locale: "en", alternateLocale: ["zh-Hans"] } : {}),
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.spoiler,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: config.name,
      url: config.url,
    },
    url: `${config.url}/post/${slug}`,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="mb-10">
        <small
          className="block mb-3 text-sm"
          style={{ color: "var(--meta)" }}
        >
          {formatDate(post.date)} · {post.readingTime}
        </small>
        {post.tags.length > 0 && (
          <div className="mz-tag-row">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/archive?tag=${encodeURIComponent(tag)}`}
                className="mz-tag-chip mz-tag-chip--sm no-underline"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </header>
      <PostContent
        title={post.title}
        titleZh={post.titleZh}
        contentHtml={post.contentHtml}
        contentHtmlZh={post.contentHtmlZh}
        hasTranslation={post.hasTranslation}
      />
      <div className="mt-16">
        <Link
          href="/archive"
          className="no-underline text-sm font-medium"
          style={{ color: "var(--link)" }}
        >
          &larr; Back to all posts
        </Link>
      </div>
    </article>
  );
}
