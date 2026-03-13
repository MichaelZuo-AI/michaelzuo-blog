---
title: "One Metric Is All You Need: Measuring AI Engineering Productivity"
date: "2026-03-13"
spoiler: "Velocity measured effort. FPI measures trust. Here's why it's the only metric that matters when AI writes your code."
---

We've always used throughput to measure engineering productivity. To keep improving it, we built process metrics around the development workflow — optimize the process metrics, and throughput follows.

But in the age of AI coding, the workflow has fundamentally changed. The process metrics that once drove throughput are no longer the best leading indicators. So what's the new metric?

My answer is **FPI**.

## Why FPI Matters

Here's the key insight: AI can run 24/7. It doesn't sleep, doesn't take PTO, doesn't context-switch between meetings. And you can scale it horizontally — more compute, more parallel agents, more throughput.

But only if it can work autonomously.

If every AI-generated feature requires a human to review, correct, or redo, then humans are still the bottleneck. Adding more AI agents just creates more work for the same engineers. You've scaled the cost without scaling the output.

**High FPI changes the equation entirely.** When AI can deliver features with minimal human intervention, productivity scales linearly with compute. Double the machines, double the output. That's not an incremental improvement — it's a fundamentally different cost curve. FPI is the metric that tells you how close you are to unlocking that leverage.

## The Autonomous Driving Parallel

The self-driving car industry solved a version of this problem years ago with a metric called **Miles Per Intervention (MPI)**: how far can the car drive before a human has to grab the wheel?

MPI doesn't measure speed. It doesn't measure distance. It measures **trust** — earned autonomy. A car with high MPI can handle more of the real world on its own. A car with low MPI is just an expensive cruise control.

Notice what MPI captures that "miles driven" does not:

- A car that drives 10,000 miles but needs a human correction every 5 minutes is **less capable** than one that drives 1,000 miles with zero interventions.
- More miles driven doesn't mean better driving. More miles *between interventions* does.
- As MPI rises, the human role shifts from operating the vehicle to supervising the system.

This is exactly what's happening in your engineering org.

## Features Per Intervention (FPI)

**FPI** applies the same logic to AI-augmented software development:

> **FPI = Features Delivered / Human Interventions**

A "feature" is a unit of shipped product value — whatever your team already counts as a deliverable (story, task, user-facing change). An "intervention" is any time a human has to step in — a correction, a rework, a takeover. Just like MPI counts every mile the same regardless of road type, FPI counts every intervention the same. Simple is better. What matters is the ratio and the trend.

**Example:** A team delivers 8 features in a sprint. During that sprint, the AI needed 5 human interventions.

> FPI = 8 / 5 = **1.6**

The same team, a month later, delivers 12 features with only 3 interventions:

> FPI = 12 / 3 = **4.0**

That's not just "more output." That's the AI earning trust — handling more of the work without human correction.

## How to Read FPI

**Rising FPI** means your AI tooling is maturing. The team is learning to prompt better, the codebase is becoming more AI-friendly, and the AI itself is handling more complexity autonomously. You're building earned trust.

**Flat FPI with rising output** means you're scaling linearly — more features, but proportionally more hand-holding. You're getting volume, not leverage.

**Falling FPI** is a red flag. It means the AI is generating more work for humans, not less. Common causes: increased codebase complexity that the AI can't navigate, team members over-relying on AI for tasks it's bad at, or degraded prompt/context quality.

### Questions to Ask Your Engineering Directors

1. **"What's our FPI trend over the last three months?"** — If they can't answer, you're flying blind.
2. **"Where are interventions happening most?"** — Is it architecture decisions? Test failures? Integration bugs? The pattern tells you where AI tooling needs improvement.
3. **"How does FPI vary across teams?"** — Team-level variance reveals which teams have figured out how to work with AI and which haven't. That's a coaching opportunity, not a headcount decision.

## Capability vs. Dependency

FPI answers the question every VP is silently asking: *"Is AI making my team more capable, or more dependent?"*

**Capability** looks like: FPI rising over time. Fewer severe interventions. Engineers spending their time on architecture, product decisions, and code review rather than implementation. The AI handles the mechanical work; humans handle the judgment calls.

**Dependency** looks like: High output numbers but flat or falling FPI. Engineers who can't ship without AI tools. No one on the team who understands the code the AI wrote. When the AI makes a mistake, it takes longer to fix than writing it manually would have.

The difference is directional. Both teams use AI heavily. But one team is building on top of AI capability — each sprint, the AI handles more. The other team is running on a treadmill — same intervention rate, just more volume.

FPI makes this visible.

## What to Do Tomorrow

You don't need a new tool or a dashboard overhaul. Start here:

1. **Pick one team. Track interventions for two sprints.** A shared spreadsheet is fine. Column A: feature. Column B: intervention type. Column C: weight. That's it.

2. **Calculate FPI at sprint boundaries.** The number itself matters less than the trend. Is it going up?

3. **Use FPI in your next 1:1 with your engineering director.** Not as a KPI — as a conversation starter. "How much of the AI's output are we keeping versus reworking?" That question alone will surface insights.

4. **Compare FPI across teams, not individuals.** FPI is a team-level metric. It reflects how well the team's processes, codebase, and tooling support AI autonomy — not how "good" any one engineer is at prompting.

5. **Watch the intervention mix, not just the number.** A team whose interventions shift from takeovers to minor hints is improving faster than a team whose FPI rises because they're shipping smaller features.

---

Velocity told you how fast your team was moving. FPI tells you how much of that movement is *earned* — how much your AI tooling can handle on its own, and how much still needs a human hand on the wheel.

In the age of AI-augmented development, the teams that win aren't the ones that generate the most code. They're the ones that intervene the least.
