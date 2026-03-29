---
title: "Always Hungry: A Self-Evolution Mode to Improve Your Project While You Sleep"
date: "2026-03-29"
spoiler: "What if your project could watch the open-source community, learn from it, and upgrade itself — without you doing anything?"
---

Software doesn't evolve on its own. You ship it, and it stays exactly as you left it. Every improvement requires a human to notice the gap, find the solution, and apply it. The project is frozen between your interventions.

What if it wasn't?

I've been thinking about what it means for a project to **self-evolve** — to continuously absorb patterns from its ecosystem and get better without human initiative. Not self-healing (reacting to failures) or self-testing (validating correctness). Self-evolving: proactively learning from the community and integrating what works.

`/always-hungry` is my implementation of this idea. It's a Claude Code skill that gives your project a self-evolution mode. Point it at any codebase, and it will scout the open-source community for relevant patterns, test them against your code, and merge what passes. Autonomously. Repeatedly. Each run, the project gets a little better.

I ran it on this very blog 30 minutes before writing this post. It found and applied 2 improvements I hadn't thought of.

## The Self-Evolution Loop

The skill operates in three stages. Together they form a loop: the project observes its ecosystem, experiments with what it finds, and absorbs what works.

![The Always Hungry Pipeline](/diagrams/always-hungry-pipeline.svg)

### Stage 1: Scout — Observe the Ecosystem

The agent starts by reading your project's `CLAUDE.md` — the same file that tells Claude Code how to work in your codebase. From it, the agent builds a **project profile**: who the project is, what domain it lives in, and what search queries would find repos with relevant patterns.

It searches GitHub, deduplicates results, filters out forks and stale repos, and checks each against a `seen.json` state file so it never re-evaluates a repo it already processed. For the repos that pass, it reads their READMEs, inspects their structure, and asks: *does this contain something my project should learn from?*

The output is a set of **candidates** — specific improvements with a source repo, target files, and a key insight.

### Stage 2: Evaluate — Experiment Safely

Each candidate gets its own git branch. The agent reads your existing code, applies the change surgically, then runs your build or test command.

If the build fails, the branch is deleted. No trace. No broken state. The experiment failed — move on.

If the build passes, the change is committed to the evaluation branch.

This is the natural selection gate. The project's own quality standards decide what survives. The agent doesn't trust its judgment about code quality — it trusts your test suite. Your tests are the immune system.

### Stage 3: Apply — Absorb What Works

Passing candidates are merged to `main` with `--no-ff` (so you get a clear merge commit showing what the project learned). Evaluation branches are cleaned up. The state is updated. Everything is pushed.

You come back to your project and find it has evolved — with clean commit messages pointing to the source repos it learned from.

## A Real Run

I ran `/always-hungry` on this blog — the one you're reading right now. Here's what the self-evolution loop produced.

![Real Run: Scouting michaelzuo.vip](/diagrams/always-hungry-funnel.svg)

The agent searched GitHub for Next.js blog patterns, scanned 12 repos, found 5 it hadn't seen before, and triaged them for relevance to a bilingual static blog built with Next.js 15 and Tailwind CSS 4.

Three candidates emerged:

**1. JSON-LD Article structured data** (from [leerob/next-mdx-blog](https://github.com/leerob/next-mdx-blog))

The blog had no structured data. Search engines could read the HTML, but couldn't understand the post metadata in a machine-friendly way. The agent added a `<script type="application/ld+json">` tag with `BlogPosting` schema to every post page — title, date, author, description — using metadata that already existed in the codebase. Zero new code paths. Just wiring existing data into a standard format.

**2. Native Next.js sitemap.ts** (from [leerob/next-mdx-blog](https://github.com/leerob/next-mdx-blog))

The blog generated its sitemap via a Node.js postbuild script — a separate file, outside the type system, running after the build. The agent replaced it with Next.js's built-in `app/sitemap.ts`, which generates the same XML at build time but is type-safe, integrated into the framework, and doesn't need a separate script. The old script was deleted.

**3. robots.ts** (from [nelsonlaidev/nelsonlai.dev](https://github.com/nelsonlaidev/nelsonlai.dev))

Dropped. The agent checked and found `public/robots.txt` already existed with the correct content. No action needed.

Both applied candidates were independently build-verified. The blog deployed with the improvements minutes later.

## Why Self-Evolution, Not Self-Improvement

There are a lot of "AI code improvement" tools. Most of them analyze your code in isolation and suggest refactors. That's self-improvement — looking inward.

Self-evolution is different. It looks **outward**. It doesn't ask "what's wrong with your code?" It asks "what's the ecosystem doing that you haven't absorbed yet?" The improvements come from real, production-tested repos — not from an LLM reasoning about best practices in a vacuum.

This distinction matters because the best improvements aren't the ones you can derive from first principles. They're the ones someone else already figured out and battle-tested. JSON-LD structured data isn't something you'd "refactor" your way into. It's a pattern you learn about from seeing other blogs do it.

And the self-evolution mode is conservative by design:

- **No new dependencies.** The project absorbs patterns, not packages.
- **Build-gated.** Every mutation must pass the project's own quality standards.
- **Stateful.** The project remembers what it's already seen. Each run discovers genuinely new content.
- **Surgical.** Changes target specific files. No rewrites. No scope creep.

## The Identity System

For a project to evolve, it first needs to know what it is.

The first time you run always-hungry, it generates a **project profile** — a JSON file that captures your project's identity from the perspective of its ecosystem. It includes:

- Tailored search queries (e.g., `nextjs blog markdown static stars:>=500`)
- Relevance keywords ranked by priority
- A triage question (e.g., "Does this repo contain patterns that could improve the blog's SEO, content rendering, or bilingual support?")
- Your test command and source paths

This identity persists across runs. The project gets better at recognizing what's relevant to it. The search space narrows to its actual domain. Over time, the candidates get more targeted and the hit rate improves.

## Running It

Install the skill, open Claude Code in your project, and type:

```
/always-hungry
```

That's it. The project reads its own `CLAUDE.md`, builds its identity if needed, observes its ecosystem, experiments, and absorbs. You can also run stages independently:

```
/always-hungry --scout-only    # observe only, don't experiment
/always-hungry --dry-run       # show identity without acting
/always-hungry --profile       # rebuild the project identity
/always-hungry --show-last-run # see what the project learned last time
```

## The Bigger Idea

We're used to thinking of software as something we build and maintain. Always-hungry flips that. The project maintains itself — or more precisely, it evolves by continuously learning from its ecosystem.

The work it does is the kind humans defer indefinitely. Adding structured data. Replacing a script with a framework-native solution. Adopting a pattern you saw in a conference talk six months ago but never got around to implementing. None of it is urgent. All of it matters.

Always-hungry does this work continuously. The improvements compound. Your project gets better without you actively working on it.

That's the real magic. Not that an agent writes code. That **your project evolves while you're doing something else**.