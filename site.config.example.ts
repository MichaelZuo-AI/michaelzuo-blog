export interface SiteConfig {
  name: string;
  description: string;
  tagline: string;
  ogImage: string;
  url?: string;
  cloudflareAnalyticsToken?: string;
}

const config: SiteConfig = {
  name: "My Blog",
  description: "A personal blog about software engineering and technology.",
  tagline: "Thoughts and writing",
  ogImage: "/og-image.png",
  // url: "https://example.com",
  // cloudflareAnalyticsToken: "your-token-here",
};

export default config;
