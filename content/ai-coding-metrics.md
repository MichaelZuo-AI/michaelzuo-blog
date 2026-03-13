---
title: "One Metric Is All You Need: Measuring AI Engineering Productivity"
date: "2026-03-13"
spoiler: "Velocity measured effort. FPI measures trust. Here's why it's the only metric that matters when AI writes your code."
---

For a decade, velocity was the number we watched. Story points per sprint, PRs merged per week, lines changed — imperfect, but directionally useful. When a team shipped faster, they were probably getting better. When they slowed down, something was wrong.

AI broke that correlation.

A team using AI coding tools can 10x their PR throughput while shipping the same number of working features — or fewer. The volume went up, but the signal got lost. If your dashboard shows "productivity" doubling while your customers see the same product, you're measuring the wrong thing.

So what should you measure instead?

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

> **FPI = Features Delivered / Weighted Human Interventions**

A "feature" is a unit of shipped product value — whatever your team already counts as a deliverable (story, task, user-facing change). The denominator is where the insight lives.

### Weighting Interventions

Not all human interventions are equal. A quick hint is different from rewriting an entire implementation. FPI uses a severity weight:

| Intervention Type | Weight | Example |
|---|---|---|
| **Minor guidance** | 0.1 | "Use the existing auth middleware instead of writing a new one" |
| **Rework** | 0.5 | Rewriting a function the AI produced because the approach was wrong |
| **Takeover** | 1.0 | Abandoning the AI's output and implementing from scratch |

**Example:** A team delivers 8 features in a sprint. During that sprint, the AI needed 3 minor hints (3 × 0.1 = 0.3), 2 reworks (2 × 0.5 = 1.0), and 0 takeovers.

> FPI = 8 / (0.3 + 1.0) = **6.15**

The same team, a month later, delivers 10 features with only 4 minor hints and 1 rework:

> FPI = 10 / (0.4 + 0.5) = **11.1**

That's not just "more output." That's the AI earning trust — handling more of the work without human correction.

## How to Read FPI

**Rising FPI** means your AI tooling is maturing. The team is learning to prompt better, the codebase is becoming more AI-friendly, and the AI itself is handling more complexity autonomously. You're building earned trust.

**Flat FPI with rising output** means you're scaling linearly — more features, but proportionally more hand-holding. You're getting volume, not leverage.

**Falling FPI** is a red flag. It means the AI is generating more work for humans, not less. Common causes: increased codebase complexity that the AI can't navigate, team members over-relying on AI for tasks it's bad at, or degraded prompt/context quality.

### Questions to Ask Your Engineering Directors

1. **"What's our FPI trend over the last three months?"** — If they can't answer, you're flying blind.
2. **"Which types of interventions are most common?"** — Mostly minor? You're on track. Mostly rework or takeover? The AI isn't well-integrated.
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
