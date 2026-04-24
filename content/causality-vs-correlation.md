---
title: "Causality vs. Correlation"
date: "2026-04-24"
spoiler: "Why SPEC -> Claude Code -> correct code is the wrong graph, and what workflow actually closes the loop."
tags: ["ai-engineering"]
---

Human beings default to causal explanations because action needs them. Prediction tells you what might happen next. Causality tells you what changes if you intervene. Engineering lives on that difference.

That is why people reach for a simple graph when they use Claude Code. Write a clear SPEC. Hand it to the model. Get correct code back. When the output misses the requirement or ships with bugs, the whole setup feels broken.

The instinct is fine. The graph is wrong.

## Why we keep reaching for cause and effect

We do not use causality because we enjoy tidy stories. We use it because intervention requires it. If a build is failing, a forecast is not enough. You need to know which change is likely to move the result.

That habit gets even stronger in software. We are constantly asking counterfactual questions: if I change this prompt, this test, this interface, this file boundary, what else moves with it? A useful explanation is one that tells you where to push.

So when a coding agent keeps disappointing us, our first move is naturally causal. We look for the broken link.

## The graph we wish were true

![A simple causal chain from intent to correct code contrasted with the noisier graph that actually runs.](/diagrams/wrong-causal-graph.svg)

The mental model usually looks like this:

`intent -> SPEC -> Claude Code -> correct code`

That model carries a few hidden assumptions.

First, it assumes the SPEC captures the intent without loss. Second, it assumes the model behaves like an obedient executor instead of a system that fills gaps from prior patterns. Third, it assumes correctness is visible in the generated code itself. If those assumptions held, prompt quality would be the main problem.

They do not.

## The graph that actually runs

The real system is longer and noisier.

Your actual intent starts in your head, not in the SPEC. The SPEC is already a compressed version. It drops some edge cases, some tacit expectations, some repository-specific constraints that felt "obvious" when you wrote it.

Then the model reads that compressed text while missing part of the repo context. It does not see every unwritten convention, hidden dependency, or fragile edge of the existing codebase. Where the constraint is absent, it fills the gap with priors from training.

That is why the output is often locally plausible and globally wrong. The code can look clean. The names can sound right. The comments can echo the requirement. Yet the behavior still misses the real ask.

Then comes the last failure: weak verification. If no failing test was written, no build was run, no reviewer checked requirement coverage, then the first serious verifier is production - or you.

Seen this way, the bug is not an unexpected accident. It is what a noisy multi-step system produces when too much freedom is left unconstrained.

## What actually improves reliability

![A closed-loop workflow with explicit gates for contract, restatement, planning, tests, implementation, and verification.](/diagrams/coding-agent-feedback-loop.svg)

Once you redraw the graph, the workflow changes with it.

The goal is no longer "write the perfect prompt." The goal is "make it hard for the system to drift without getting caught."

1. Freeze the contract before implementation. State the goal, non-goals, concrete examples, edge cases, and definition of done.
2. Make the model restate the task before it writes code. Force assumptions, risks, and affected files into the open.
3. Slice the work. One small scenario at a time is easier to verify than a feature-sized blob.
4. Turn the requirement into executable checks. For logic changes, the best contract is often a failing test before the implementation.
5. Constrain the surface area. Limit which files can change. Say no to opportunistic refactors.
6. Verify every slice with evidence. Run the tests. Run the build. Run the lint. Check the behavior that matters.
7. Separate writing from judging. A second review pass should ask whether the code covers the requirement, not whether it looks clever.

None of this makes the model deterministic. That is not the point. The point is to reduce how much silent invention survives to the end of the process.

## The shift that matters

Prompt engineering still matters. Better wording can raise the average quality of the output. It does not, by itself, make the system reliable.

Reliability comes from control. Not control in the sense of micromanaging every token, but control in the sense of explicit contracts, narrow diffs, executable checks, and short feedback loops.

You do not have a SPEC-to-code machine. You have a high-variance candidate generator sitting inside a workflow. The workflow is what decides whether the code deserves to ship.

**The model writes code. The loop decides whether it counts.**
