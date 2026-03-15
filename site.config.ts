export interface SiteConfig {
  name: string;
  description: string;
  tagline: string;
  ogImage: string;
  url?: string;
  cloudflareAnalyticsToken?: string;
}

const config: SiteConfig = {
  name: "Michael Zuo",
  description: "Writing on software engineering, AI-driven development, and building things.",
  tagline: "Where Michael Thinks",
  ogImage: "/og-image.png",
  url: "https://michaelzuo.vip",
  cloudflareAnalyticsToken: "7f5ba72b27094b788fd87ebf15f14729",
};

export default config;
