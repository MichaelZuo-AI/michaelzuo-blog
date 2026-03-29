---
title: "Always Hungry: A Self-Evolution Mode for the AI Era"
date: "2026-03-29"
spoiler: "What if your project could watch the open-source community, learn from it, and upgrade itself — without you doing anything?"
---

The world is moving too fast to look only inward.

In the AI era, the open-source ecosystem evolves at a pace no individual can track. A better pattern ships on GitHub while you sleep. A cleaner architecture emerges in a repo you've never heard of. The gap between what your project *is* and what it *could be* widens every day — not because your code is bad, but because the world around it keeps getting better.

**Your project needs to look outward.** It needs to continuously observe its ecosystem and absorb what works.

`/always-hungry` is a Claude Code skill that does exactly this. Point it at any codebase, and it scouts the open-source community for relevant patterns, tests them against your code, and merges what passes. Autonomously.

## The Self-Evolution Loop

Three stages. Observe, experiment, absorb.

![The Always Hungry Pipeline](/diagrams/always-hungry-pipeline.svg)

**Scout** — The agent reads your `CLAUDE.md`, builds a project profile, searches GitHub for repos in your domain, and triages them for relevance. It tracks what it's already seen so repeated runs only discover new content.

**Evaluate** — Each candidate gets its own git branch. The agent applies the change, runs your build/tests. Pass → keep. Fail → delete the branch, no trace. Your test suite is the immune system.

**Apply** — Passing candidates merge to `main` with clear commit messages pointing to the source repo. Branches cleaned up. State updated. Pushed.

You come back and find your project has evolved.

## A Real Run

I ran `/always-hungry` on this blog before writing this post.

![Real Run: Scouting michaelzuo.vip](/diagrams/always-hungry-funnel.svg)

12 repos scanned. 5 new since last run. 3 candidates triaged. 2 applied:

**JSON-LD Article structured data** (from [leerob/next-mdx-blog](https://github.com/leerob/next-mdx-blog)) — Added `BlogPosting` schema to every post page using metadata that already existed in the codebase. Search engines can now understand post structure for rich snippets.

**Native Next.js sitemap.ts** (from [leerob/next-mdx-blog](https://github.com/leerob/next-mdx-blog)) — Replaced a postbuild Node.js script with Next.js's built-in `app/sitemap.ts`. Type-safe, framework-integrated, old script deleted.

One candidate (robots.ts) was dropped — the agent checked and found `public/robots.txt` already existed. Both applied changes were independently build-verified.

## Design Principles

- **Look outward.** Improvements come from real repos, not LLM reasoning in a vacuum.
- **No new dependencies.** The project absorbs patterns, not packages.
- **Build-gated.** Every change must pass your test suite.
- **Stateful.** Remembers what it's seen. Each run finds genuinely new content.
- **Surgical.** Targeted files only. No rewrites. No scope creep.

## Try It

Grab it from [GitHub](https://github.com/ai-awesome/skill-always-hungry), then:

```
/always-hungry
```

The project reads its own `CLAUDE.md`, builds its identity, observes its ecosystem, experiments, and absorbs. Run it once, or run it every week. The improvements compound.

```
/always-hungry --scout-only    # observe only, don't experiment
/always-hungry --dry-run       # show profile without acting
/always-hungry --show-last-run # see what it learned last time
```

## The Bigger Idea

We're used to thinking of software as something we build and maintain. Always-hungry inverts that. The project evolves by continuously learning from its ecosystem.

The world moves fast. Your project should too — even when you are sleeping.