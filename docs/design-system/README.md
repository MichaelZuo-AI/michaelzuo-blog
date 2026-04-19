# Michael Zuo Blog — Design System

A design system for **michaelzuo.vip**, a personal blog by Michael Zuo on software engineering, AI-driven development, and building things. The look-and-feel is directly inspired by the **Anthropic blog** — warm paper tones, generous whitespace, a single narrow reading column, and Anthropic-style SVG diagrams.

## Sources

- **Codebase:** `MichaelZuo-AI/michaelzuo-blog` (Next.js 15 static export, Tailwind 4 + Typography). Key files imported under `src/`:
  - `src/app/globals.css` — source of the full color + prose token set
  - `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/post/[slug]/page.tsx`
  - `src/components/ThemeToggle.tsx`, `src/components/LanguageToggle.tsx`, `src/components/PostContent.tsx`
  - `src/lib/posts.ts`
- **Content samples:** see `content_samples.md` for real post excerpts used to derive tone.
- **Live reference:** `https://blog.michaelzuo.vip`
- **Style target:** Anthropic blog (anthropic.com/news) — the author explicitly calls out "Anthropic-style SVG diagrams" in the repo README and the color token set is paper/ink/terracotta just like Anthropic.

## Products

There is exactly **one product**: the static blog itself.
- **Home** — reverse-chronological list of posts with date · reading-time kicker, tracking-tight title, secondary "spoiler" line.
- **Post page** — single-column long-read with prose, inline SVG diagrams, fenced code blocks, optional EN/ZH language toggle.

Everything ships as a Next.js static export to GitHub Pages — no server, no auth, no app surfaces beyond reading.

---

## Content fundamentals

Derived from reading the live `content/*.md` posts.

- **Voice:** direct, first-person, confident-without-jargon. "I ran `/always-hungry` on this blog before writing this post." Never marketing-y; always the author thinking out loud.
- **Second person:** yes — the reader is addressed as *you*. "Your project needs to look outward." "You come back and find your project has evolved."
- **Casing:** sentence case everywhere — titles ("How to make your LLM reliable"), headings ("The self-evolution loop"), buttons. **Never title case** in UI. Code identifiers keep their canonical casing (`CLAUDE.md`, `PostContent`).
- **Post title pattern:** short declarative or a colonned essay form — *"Always Hungry: A Self-Evolution Mode for the AI Era"*, *"How to make your LLM reliable"*. No subtitle; the `spoiler` frontmatter field supplies the one-line tease below the title on the index.
- **Spoilers (list page blurbs):** one sentence, ends with a strong idea or question. Example: *"What if your project could watch the open-source community, learn from it, and upgrade itself — without you doing anything?"*
- **Emphasis:** heavy use of **bold** for the thesis beat of a paragraph. *Italics* for reserved emphasis and term-of-art. Em-dashes — everywhere — for parenthetical asides.
- **Structure:** most posts open with a one-line mic-drop, follow with a short setup paragraph, then H2 sections with tight H3s. Ends with a "The bigger idea" / "The part nobody put on the label" style synthesis.
- **Code & diagrams:** generous. Inline `code` for identifiers, fenced blocks for commands. Every conceptual post has at least one inline SVG diagram (warm paper card + flow).
- **Emoji:** essentially none in prose. The only emoji in the product are the theme-toggle glyphs (🌞/🌙). Do not add more.
- **Tagline:** *"Where Michael Thinks"* — lower-footer only, never as a page title.

Do not invent new content. If copy is needed for a mock, pull from `content_samples.md` or use real post titles verbatim.

---

## Visual foundations

### Color

The palette is **warm paper + ink** with a single **terracotta** accent and a sparing **sage** positive. It is *not* neutral cool gray. All tokens live in `colors_and_type.css`.

- **Backgrounds:** `--bg` `#F5F4F0` (oat paper), `--bg-card` `#EDECE8` (raised surface), `--bg-code` `#E8E6E1`.
- **Text:** `--fg-title` `#1A1A1A` (near-black), `--fg` `#3D3929` (warm charcoal body), `--fg-secondary` `#6B6651`, `--fg-meta` `#8C8777`.
- **Accent:** `--link` `#C75B3A` (terracotta) is the **only** chromatic color that appears at any weight in the chrome. Hover goes darker, `#A84A2E`.
- **Semantic:** `--accent-positive` sage `#6BAF7B` with wash `#D4EDDA`; `--accent-warn-bg` salmon wash `#F8D7D0`. Only used inside diagrams, never on buttons or chips.
- **Dark mode:** true warm dark — paper shifts to `#1C1B18`, ink to `#D4D0C8`, terracotta lightens to `#E07A5A`. Theme is persisted in `localStorage` and also respects `prefers-color-scheme`.

### Typography

- **Family:** **Source Serif 4** (Google Fonts, variable `opsz` 8–60, weights 400/500/600/700) for display + body. **JetBrains Mono** (400/500/600) for code and metadata kickers. Both load via `<link>` in the host document (see the comment in `colors_and_type.css`). The fallback stack is Charter → Iowan Old Style → Palatino → Georgia so even offline the serif character is preserved.
- **Mono:** `"JetBrains Mono", "SF Mono", "Fira Code", Menlo, Consolas, monospace`.
- **Weights used:** 400 body, 500 for toggles/back-links, 600 H3/strong, 700 H1/H2.
- **Letter-spacing:** `-0.015em` on post title, `-0.005em` on H2/H3 (serifs want *less* negative tracking than a geometric sans). Body is 0.
- **Line-height:** `1.7` on prose body (high-but-not-oppressive; serifs already carry rhythm), `1.15–1.3` on headings.
- **Scale:** H1 40px, H2 30px, H3 24px, lead 19px, body 17px, meta 14px. See `colors_and_type.css`.

### Layout & rhythm

- **One column, always.** `max-width: 720px`, centered, 24px horizontal padding, 48px vertical.
- **Header:** site name (left, semibold, tracking-tight) / theme toggle (right). 64px bottom margin.
- **Footer:** top rule in `--border-light`, meta-color tagline. 80px top margin.
- **Post list:** `mb-12` between articles — no cards, no dividers, just space.
- **Post page:** small meta kicker, 40px gap, giant H1, 40px gap, prose. A `← Back to all posts` link at the bottom in link-color.

### Borders, radii, shadows

- **Radii:** 4 (inline code), 8 (buttons, pre blocks), 12 (images, inner diagrams), 16 (diagram outer card).
- **Borders:** always 1px solid `--border` or `--border-light`. No double borders, no colored borders except inside diagrams.
- **Shadows:** **none.** The system does not use drop shadows. Elevation comes from a slightly darker card background tone (`--bg-card` is ~3% darker than `--bg`).
- **No glassmorphism, no blur, no transparency effects anywhere.**

### Backgrounds & imagery

- **Backgrounds:** flat paper tone. **No gradients, no textures, no hero imagery, no full-bleed photography.** The hero of every page is words.
- **Images in posts:** Anthropic-style SVG diagrams only — flat fills, 1.5px strokes, dashed-line arrows, sentence-case labels, warm paper cards. See `assets/diagrams/` for 22 real examples. 12px corner radius on `.prose img`.

### Animation

- **Exactly one transition lives in chrome:** `background-color 0.3s ease, color 0.3s ease` on `body` for dark-mode crossfade, and `text-decoration-color 0.15s ease` on links.
- **No bouncy easing, no parallax, no page transitions, no load animations.** The design is intentionally still.

### States

- **Link hover:** underline color goes from `--border` (faint) to `--link` (terracotta). Text color unchanged.
- **Button hover (theme/lang toggle):** relies on default browser cursor + the existing border; no explicit hover color is set in code.
- **Focus:** default browser outline is preserved.
- **Press:** no scale-down, no color inversion.

---

## Iconography

The blog uses **almost no icons** on purpose. The ones that exist:

- **Favicon / site mark:** `assets/logo-mark.svg` — a 64px rounded square, ink fill, sans-serif "MZ" monogram. That is the entire brand mark.
- **Theme toggle:** the emoji glyphs `🌞` (light) and `🌙` (dark), rendered at `text-2xl`. These are the **only emoji in the product** and should not be replaced with SVG icons.
- **Language toggle:** pure text — the label is literally `中文` or `EN`. No globe icon.
- **Back link:** HTML entity `←` (`&larr;`) followed by text. No chevron SVG.
- **In-post illustration:** inline SVG diagrams under `assets/diagrams/` (22 real examples). Flat-fill, stroke-only, sentence-case labels, warm palette. Treat these as a **template** — any new explainer should match their visual language (see `preview/diagram-style.html`).

No icon font is loaded. No Lucide / Heroicons / Font Awesome / Tabler. **Do not introduce one.** If a mock absolutely needs a utility glyph (rare), prefer a Unicode character (`←` `→` `·`) over an SVG icon.

---

## Index

| Path | What it is |
| --- | --- |
| `README.md` | this file |
| `SKILL.md` | Agent-Skills-compatible skill manifest |
| `colors_and_type.css` | CSS custom properties — raw + semantic tokens + base classes |
| `content_samples.md` | real post excerpts to pull from when you need copy |
| `src/` | original Next.js source imported from the codebase (read-only reference) |
| `assets/logo-mark.svg` | the MZ monogram favicon / site mark |
| `assets/diagrams/*.svg` | 22 real Anthropic-style inline-post SVG diagrams |
| `preview/*.html` | the design-system cards that populate the Design System tab |
| `ui_kits/blog/` | hi-fi interactive recreation of the blog (Home + Post) |

---

## Caveats

- **Type swap flagged:** the live blog currently uses the system UI stack (Next.js default). The design system swaps to **Source Serif 4 + JetBrains Mono** via Google Fonts for a stronger "long-read" character closer to Anthropic's editorial tone. If you want to keep the system stack, revert `--font-sans` / `--font-mono` in `colors_and_type.css` — the rest of the system is font-agnostic.
- "Anthropic-style" is the author's own phrase for the diagram language; it is not an official Anthropic asset.
