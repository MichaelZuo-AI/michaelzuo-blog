# michaelzuo.vip

Personal blog — writing on AI-driven development, engineering productivity, and building things.

## Stack

- **Framework:** Next.js 15 (static export)
- **Styling:** Tailwind CSS 4 + Typography plugin
- **Hosting:** GitHub Pages
- **Analytics:** Cloudflare Web Analytics
- **CI/CD:** GitHub Actions (auto-deploy on push to main)

## Features

- Bilingual posts (EN/ZH) with client-side language toggle
- Dark mode with localStorage persistence
- Anthropic-style SVG diagrams
- Static site generation — no server required

## Setup

```bash
npm install
cp site.config.example.ts site.config.ts  # then edit with your values
npm run dev     # dev server on :3000
npm run build   # production build to /out
```

## Content

Posts live in `content/` as markdown files:

```
content/
├── my-post.md       # English (primary)
└── my-post.zh.md    # Chinese translation
```

Diagrams live in `public/diagrams/` as SVG files, shared across both languages.

## Writing New Posts

Use `/blog-post` in Claude Code — it handles bilingual generation, diagram creation, build verification, and deployment automatically.
