import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michael Zuo",
  description:
    "Writing on software engineering, AI-driven development, and building things.",
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/archives", label: "Archives" },
  { href: "/about", label: "About" },
];

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
        <div className="max-w-3xl mx-auto px-6 py-10">
          <header className="text-center mb-14">
            <Link
              href="/"
              className="text-[32px] font-black no-underline tracking-tight"
              style={{ color: "var(--title)" }}
            >
              Michael Zuo
            </Link>
            <p className="mt-1 text-sm" style={{ color: "var(--meta)" }}>
              Build things with AI. Ship fast. Think deep.
            </p>
            <nav className="mt-4 flex items-center justify-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm no-underline hover:opacity-70 transition-opacity"
                  style={{ color: "var(--link)" }}
                >
                  {link.label}
                </Link>
              ))}
              <ThemeToggle />
            </nav>
          </header>
          <main>{children}</main>
          <footer
            className="mt-16 pt-8 border-t text-center text-sm"
            style={{ color: "var(--meta)", borderColor: "var(--meta)" }}
          >
            <p>&copy; {new Date().getFullYear()} Michael Zuo</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
