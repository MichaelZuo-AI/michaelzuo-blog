---
title: "Always Hungry: An AI Agent That Scouts Open Source and Improves Your Project While You Sleep"
date: "2026-03-29"
spoiler: "I built a skill that reads your project, searches GitHub for relevant patterns, evaluates them against your codebase, and merges what works. Autonomously."
---

I have a problem. My projects are never done. There's always a blog post out there with a better pattern, a repo with a cleaner approach, a technique I haven't adopted yet. The open-source community moves fast and I can't keep up manually.

So I built an agent to do it for me.

`/always-hungry` is a Claude Code skill that autonomously scouts the open-source community, finds improvements relevant to your project, tests them against your codebase, and merges what passes. No human in the loop. No new dependencies. Every change is build-verified before it lands.

I ran it on this very blog 30 minutes before writing this post. It found and applied 2 improvements I hadn't thought of.

## How It Works

The skill operates in three stages. Each stage has a clear contract: what it takes in, what it produces, and when it stops.

![The Always Hungry Pipeline](/diagrams/always-hungry-pipeline.svg)

### Stage 1: Scout

The agent starts by reading your project's `CLAUDE.md` — the same file that tells Claude Code how to work in your codebase. From it, the agent extracts your tech stack, architecture, and domain, then generates a **project profile** with tailored GitHub search queries.

It searches GitHub, deduplicates results, filters out forks and stale repos, and checks each against a `seen.json` state file (so it never re-evaluates a repo it already processed). For the repos that pass, it reads their READMEs, inspects their structure, and triages them against a relevance question derived from your project.

The output is a set of **candidates** — specific improvements with a source repo, target files in your project, and a key insight to apply.

### Stage 2: Evaluate

Each candidate gets its own git branch. The agent reads your existing code, applies the change surgically, then runs your project's build or test command.

If the build fails, the branch is deleted. No trace. No broken state. The agent moves on.

If the build passes, the change is committed to the evaluation branch.

This is the critical gate. The agent doesn't trust its own judgment about code quality — it trusts your test suite. If your tests don't catch a problem, neither will the agent. But if they do, the candidate is dead.

### Stage 3: Apply

Passing candidates are merged to `main` with `--no-ff` (so you get a clear merge commit showing what came from always-hungry). Evaluation branches are cleaned up. The `seen.json` state is updated. Everything is pushed.

You come back to your project and find improvements already landed, with clean commit messages pointing to the source repo.

## A Real Run

I ran `/always-hungry` on this blog — the one you're reading right now. Here's what happened.

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

## What Makes This Different

There are a lot of "AI code improvement" tools. Most of them analyze your code in isolation and suggest refactors. Always-hungry does something fundamentally different: it looks **outward**.

It doesn't ask "what's wrong with your code?" It asks "what's the community doing that you haven't adopted yet?" The improvements come from real, production-tested repos — not from an LLM's training data about best practices.

And it's conservative by design:

- **No new dependencies.** The agent modifies existing code using patterns from other repos, but never adds packages.
- **Build-gated.** Every change must pass your build/test suite before it can land.
- **Stateful.** It remembers what it's already seen, so repeated runs discover genuinely new content.
- **Surgical.** Changes target specific files. No rewrites. No "while I'm here let me also..." scope creep.

## The Profile System

The first time you run always-hungry on a project, it generates a profile — a JSON file that captures your project's identity from the perspective of GitHub search. It includes:

- Tailored search queries (e.g., `nextjs blog markdown static stars:>=500`)
- Relevance keywords ranked by priority
- A triage question (e.g., "Does this repo contain patterns that could improve the blog's SEO, content rendering, or bilingual support?")
- Your test command and source paths

This profile persists across runs. The agent gets better at finding relevant repos over time because the search space is scoped to your project's actual domain.

## Running It

Install the skill, open Claude Code in your project, and type:

```
/always-hungry
```

That's it. The agent reads your `CLAUDE.md`, generates a profile if needed, scouts, evaluates, and applies. You can also run stages independently:

```
/always-hungry --scout-only    # just search and report
/always-hungry --dry-run       # show the profile without executing
/always-hungry --profile       # regenerate the project profile
/always-hungry --show-last-run # see the last run's summary
```

## Why I Built This

I believe the most underrated capability of AI agents is **autonomous maintenance**. Not building new features — improving what already exists. The kind of work that humans defer indefinitely because it's not urgent enough to prioritize but important enough to matter.

Adding structured data. Replacing a script with a framework-native solution. Adopting a pattern you saw in a conference talk six months ago but never got around to implementing.

Always-hungry does this work continuously. Every run, it scans the community for patterns your project could benefit from and applies the ones that pass your quality gate. The improvements compound. Your project gets better without you actively working on it.

That's the magic. Not that the agent writes code. That **your project improves while you're doing something else**.