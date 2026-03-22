---
title: "From Idea to 20 Pages: The Day I Stopped Building My App"
date: "2026-03-22"
spoiler: "I gave my AI agent a design language and 6 core pages. It built 20+ production pages on its own. I didn't touch a thing."
---

Today I watched an AI agent build my app while I wrote this post.

I connected [Feature Crew](https://github.com/MichaelZuo-AI/Feature_Crew) — an open-source agent pipeline I built — with [Stitch MCP](https://developers.google.com/stitch), Google's generative UI tool. I gave it my design language, 6 existing core pages, and one instruction: "complete the app."

It started working. Clarifying specs. Generating designs. Writing code. Evaluating itself against a 90% quality gate. Failing. Fixing. Re-evaluating. Finding bugs. Fixing those too. Then moving to the next feature and starting again.

By the time I'm publishing this, it has completed 20+ production pages. I haven't intervened once.

This isn't a demo. This isn't a prototype. This is a production-ready e-commerce app — with category navigation, reviews, membership, wishlists, flash sales, returns — built autonomously by an AI agent crew.

## What Is Feature Crew

[Feature Crew](https://github.com/MichaelZuo-AI/Feature_Crew) is an open-source crew of AI agents that takes a feature from idea to production. It runs as a set of skills inside Claude Code:

```bash
curl -fsSL https://raw.githubusercontent.com/MichaelZuo-AI/Feature_Crew/main/install.sh | bash
```

Then open Claude Code in your project and run `/feature-crew`.

Five skills, one pipeline:

| Skill | Role |
|-------|------|
| `/feature-crew` | Orchestrator — full lifecycle with human checkpoints |
| `/feature-crew-clarify` | Phase 1 — requirement → structured spec |
| `/feature-crew-implement` | Phase 2 — code with ≥90% evaluator scoring gate |
| `/feature-crew-qa` | Phase 3 — holistic QA → bug fix loop |
| `/feature-crew-evaluate` | Standalone adaptive evaluator |

Key features that make it work autonomously:

- **PO Agent** auto-answers clarifying questions from context — only escalates what it genuinely can't resolve
- **Adaptive Evaluator** scores across 6 dimensions with weights adjusted by feature type — UI-heavy, backend, full-stack, CLI all get different rubrics
- **90% quality gate** — the agent must pass its own evaluation before moving on
- **Parallel features** via git worktrees — each feature gets isolated state
- **Resumable** — `/feature-crew resume <name>` picks up where you left off

The [dummy-ecommerce-webapp example](https://github.com/MichaelZuo-AI/Feature_Crew/tree/main/examples/dummy-ecommerce-webapp) ships with the full artifact trail — specs, evaluation rounds, QA reports — so you can inspect exactly how the pipeline built every page.

## Insight 1: The Software Lifecycle Just Collapsed

Here's what building software used to look like. And here's what it looks like today.

![The Software Lifecycle Collapse](/diagrams/lifecycle-collapse.svg)

Think about what disappeared.

**Design — near zero effort.** Stitch turns plain text into high-fidelity UI. I describe a screen in a sentence, I get back production HTML with Tailwind. No Figma files. No designer handoff. No 3-round revision cycles.

**Coding — near zero effort.** Feature Crew implements from a structured spec. It writes the code, evaluates it against 38 acceptance criteria, fails itself at 84%, identifies 6 remediations, fixes them, re-evaluates at 94.45%. All in a loop. No developer staring at a screen.

**Testing — near zero effort.** The QA agent scans every page, finds 9 bugs — including a critical rendering issue where product images rendered as raw URL text — fixes all of them, verifies the build passes. 76 tests. Zero manual QA.

**What's left?** Two things and only two things:

**The idea.** What should exist in the world that doesn't yet. What problem are we solving. What should the user experience feel like. This requires human judgment, taste, and domain knowledge. AI can't do this.

**The review.** Does the output match the intent. Is the quality bar met. Would I ship this. This requires human accountability. AI shouldn't do this.

Everything in between — the entire middle of the software lifecycle, the part that employed millions of people, consumed billions of dollars, and drove the entire structure of engineering organizations — is compressing to near-zero.

## Insight 2: Connect the Dots

Every day, dozens of major open-source releases drop. New models. New tools. New protocols. The ecosystem is growing faster than anyone can track.

But here's the thing most people miss: **the real skill isn't building — it's connecting.**

![Connect the Dots](/diagrams/connect-the-dots.svg)

Feature Crew is a set of Claude Code skills. Stitch is a Google MCP server. Claude Code is Anthropic's AI agent runtime. MCP is an open protocol.

None of these were designed to work together. They were built by different companies, different teams, for different purposes. But because they all speak MCP — the open standard that lets AI agents talk to any tool — they compose perfectly.

I didn't build a design tool. I plugged one in. I didn't build a code evaluator from scratch. I built skills that orchestrate one. The effort isn't in creating each piece — it's in seeing which pieces exist and connecting them.

This is the new engineering superpower: the ability to scan the ecosystem, identify the right dots, and connect them before anyone else does. Every week the dots get better. Every week the connections get easier. If you're still heads-down building everything from scratch, you're already behind.

## Insight 3: When AI Agents Start Sustaining Themselves

This is what people underestimate.

When I configured Feature Crew with Stitch MCP, gave it my design language and 6 core pages, and said "complete the app" — it didn't just execute a task.

**It started a process that sustains itself.**

![The Self-Sustaining Loop](/diagrams/self-sustaining-loop.svg)

It generates its own specs. Designs its own screens. Writes its own code. Evaluates its own output. Fails its own quality gate. Fixes its own bugs. Ships the feature. Then picks up the next one.

Feature after feature. Page after page. Each one going through the full software lifecycle — clarify, design, implement, evaluate, QA, ship — with zero human intervention.

20+ pages and counting. Category navigation. Product reviews. Membership tiers. Wishlists. Flash sales. Order details. Returns wizard. Address book. Each one evaluated above 90%. Each one QA'd and bug-fixed.

This isn't AGI. This isn't science fiction. This is happening today, with open-source tools, running on my laptop. The agent isn't "intelligent" in any philosophical sense — it's just an orchestrated pipeline with self-correction loops. But the output is indistinguishable from a team of engineers working for weeks.

The question everyone should be asking: **what happens when this scales?**

When the agent can spin up worktrees in parallel and build 5 features simultaneously. When the design tool gets better. When the evaluator gets sharper. When the ecosystem adds more dots to connect.

The trajectory is clear. And it's accelerating.

## AI Psychosis

Andrej Karpathy coined the term "AI Psychosis" — the state of being so deep in AI that you can't stop exploring what it can do. I feel it deeply.

16 hours a day with Claude Code. Building pipelines. Connecting tools. Pushing the boundary of what an agent can do autonomously. Every day there are too many good ideas. Too many new capabilities. Too many dots to connect. I literally cannot stop.

This post isn't a tutorial. It's a signal.

The software industry as we know it — with its design sprints, code reviews, QA cycles, and 10-person feature teams — is being compressed into a prompt and a pipeline. The tools are open source. The protocols are open standard. Anyone can set this up today.

The world changed. Most people haven't noticed yet.

---

*Feature Crew is open source: [github.com/MichaelZuo-AI/Feature_Crew](https://github.com/MichaelZuo-AI/Feature_Crew)*

*Try it: `curl -fsSL https://raw.githubusercontent.com/MichaelZuo-AI/Feature_Crew/main/install.sh | bash`*
