import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michael Zuo",
  description: "Writing on software engineering, AI-driven development, and building things.",
  openGraph: {
    title: "Michael Zuo",
    description: "Writing on software engineering, AI-driven development, and building things.",
    images: [{ url: "https://michaelzuo.vip/og-image.png", width: 600, height: 600 }],
  },
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
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "7f5ba72b27094b788fd87ebf15f14729"}'
        />
      </head>
      <body className="antialiased">
        <div className="max-w-[720px] mx-auto px-6 py-12">
          <header className="flex items-center justify-between mb-16">
            <Link
              href="/"
              className="text-xl font-semibold no-underline tracking-tight"
              style={{ color: "var(--title)" }}
            >
              Michael Zuo
            </Link>
            <ThemeToggle />
          </header>
          <main>{children}</main>
          <footer
            className="mt-20 pt-8 border-t text-sm"
            style={{ color: "var(--meta)", borderColor: "var(--border-light)" }}
          >
            <p>Where Michael Thinks</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
