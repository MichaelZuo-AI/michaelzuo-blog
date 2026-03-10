import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michael Zuo",
  description: "Writing on software engineering, AI-driven development, and building things.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var saved = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (saved === 'dark' || (!saved && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <header className="flex items-center justify-between mb-12">
            <Link
              href="/"
              className="text-[28px] font-black no-underline"
              style={{ color: "var(--link)" }}
            >
              Michael Zuo
            </Link>
            <ThemeToggle />
          </header>
          <main>{children}</main>
          <footer
            className="mt-16 pt-8 border-t text-sm"
            style={{ color: "var(--meta)", borderColor: "var(--meta)" }}
          >
            <p>
              Built with Next.js
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
