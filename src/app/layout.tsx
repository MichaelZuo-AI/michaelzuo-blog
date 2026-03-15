import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import config from "../../site.config";
import "./globals.css";

export const metadata: Metadata = {
  ...(config.url ? { metadataBase: new URL(config.url) } : {}),
  title: config.name,
  description: config.description,
  openGraph: {
    title: config.name,
    description: config.description,
    images: [{ url: config.ogImage, width: 600, height: 600 }],
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
        {config.cloudflareAnalyticsToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${config.cloudflareAnalyticsToken}"}`}
          />
        )}
      </head>
      <body className="antialiased">
        <div className="max-w-[720px] mx-auto px-6 py-12">
          <header className="flex items-center justify-between mb-16">
            <Link
              href="/"
              className="text-xl font-semibold no-underline tracking-tight"
              style={{ color: "var(--title)" }}
            >
              {config.name}
            </Link>
            <ThemeToggle />
          </header>
          <main>{children}</main>
          <footer
            className="mt-20 pt-8 border-t text-sm"
            style={{ color: "var(--meta)", borderColor: "var(--border-light)" }}
          >
            <p>{config.tagline}</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
