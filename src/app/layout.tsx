import type { Metadata } from "next";
import Link from "next/link";
import { Source_Serif_4, JetBrains_Mono } from "next/font/google";
import ThemeToggle from "@/components/ThemeToggle";
import config from "../../site.config";
import "./globals.css";

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

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
    <html lang="en" className={`${serif.variable} ${mono.variable}`} suppressHydrationWarning>
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
        <link rel="alternate" type="application/rss+xml" title="Michael Zuo" href="/feed.xml" />
        {config.cloudflareAnalyticsToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${config.cloudflareAnalyticsToken}"}`}
          />
        )}
      </head>
      <body className="antialiased">
        <div className="mz-page-shell">
          <header className="mz-site-header">
            <Link
              href="/"
              className="mz-site-mark no-underline"
            >
              <span className="mz-site-mark__prompt">$</span>
              <span>{config.name}</span>
            </Link>
            <ThemeToggle />
          </header>
          <main>{children}</main>
          <footer className="mz-site-footer">
            <p>
              &copy; {new Date().getFullYear()} {config.author} &middot;{" "}
              <a href="/feed.xml" className="underline">
                RSS
              </a>
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
