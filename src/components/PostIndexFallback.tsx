import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function groupByYearThenMonth(posts: PostMeta[]) {
  const years = new Map<number, Map<string, PostMeta[]>>();
  for (const post of posts) {
    const d = new Date(post.date);
    const y = d.getFullYear();
    const m = d.toLocaleDateString("en-US", { month: "long" });
    if (!years.has(y)) years.set(y, new Map());
    const months = years.get(y)!;
    if (!months.has(m)) months.set(m, []);
    months.get(m)!.push(post);
  }
  return [...years.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, months]) => ({
      year,
      months: [...months.entries()].sort((a, b) => {
        const da = new Date(a[1][0].date).getTime();
        const db = new Date(b[1][0].date).getTime();
        return db - da;
      }),
    }));
}

export default function PostIndexFallback({
  posts,
  tags,
}: {
  posts: PostMeta[];
  tags: string[];
}) {
  const grouped = groupByYearThenMonth(posts);
  return (
    <>
      {tags.length > 0 && (
        <nav aria-label="Filter by tag" className="mz-tag-bar mb-12">
          <span className="mz-tag-chip mz-tag-chip--active">all</span>
          {tags.map((tag) => (
            <span key={tag} className="mz-tag-chip">
              {tag}
            </span>
          ))}
        </nav>
      )}
      {grouped.map(({ year, months }) => (
        <section key={year} className="mb-16">
          <h2 className="mz-year-kicker">{year}</h2>
          {months.map(([month, monthPosts]) => (
            <div key={month} className="mb-10">
              <h3 className="mz-month-kicker">{month}</h3>
              {monthPosts.map((post) => (
                <article key={post.slug} className="mb-8">
                  <small
                    className="block mb-2 text-sm"
                    style={{ color: "var(--meta)" }}
                  >
                    {formatDate(post.date)} &middot; {post.readingTime}
                  </small>
                  <h4
                    className="text-2xl font-semibold leading-snug mb-2"
                    style={{ letterSpacing: "-0.005em" }}
                  >
                    <Link
                      href={`/post/${post.slug}`}
                      className="no-underline"
                      style={{ color: "var(--title)" }}
                    >
                      {post.title}
                    </Link>
                  </h4>
                  <p
                    className="text-base leading-relaxed mb-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {post.spoiler}
                  </p>
                  {post.tags.length > 0 && (
                    <div className="mz-tag-row">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="mz-tag-chip mz-tag-chip--sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          ))}
        </section>
      ))}
    </>
  );
}
