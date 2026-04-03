import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1
        className="text-4xl font-bold tracking-tight mb-4"
        style={{ color: "var(--title)" }}
      >
        404
      </h1>
      <p
        className="text-lg mb-8"
        style={{ color: "var(--text-secondary)" }}
      >
        This page could not be found.
      </p>
      <Link
        href="/"
        className="no-underline text-sm font-medium"
        style={{ color: "var(--link)" }}
      >
        &larr; Back to all posts
      </Link>
    </div>
  );
}
