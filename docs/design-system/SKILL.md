---
name: michaelzuo-blog-design
description: Use this skill to generate well-branded interfaces and assets for the Michael Zuo personal blog (michaelzuo.vip) — an Anthropic-blog-style long-read site — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. The canonical tokens live in `colors_and_type.css` — link it directly or copy the `:root` block. Real post copy is in `content_samples.md`. Real inline-post SVG diagrams are in `assets/diagrams/`. The MZ monogram is `assets/logo-mark.svg`.

Hard rules for this brand:
- **Single 720px reading column**, always centered, 24px horizontal / 48px vertical padding.
- **System UI font stack only.** ~~No custom webfonts.~~ Load **Source Serif 4** + **JetBrains Mono** from Google Fonts (snippet in `colors_and_type.css`).
- **No drop shadows. No gradients. No hero imagery.** Elevation is a 3%-darker card tone plus a 1px rule.
- **Terracotta `#C75B3A` is the only chromatic accent** in chrome. Sage/salmon appear only inside diagrams.
- **Sentence case** everywhere. **No emoji** except the theme-toggle glyphs 🌞 / 🌙.
- **No icon set.** Use unicode (`←`, `·`) or text labels (`中文` / `EN`).
- **Dark mode is a required counterpart**, not optional. Shift paper to `#1C1B18`, ink to `#D4D0C8`, terracotta to `#E07A5A`.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
