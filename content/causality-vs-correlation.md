---
title: "The Success You Cannot Reproduce Is an Illusion"
date: "2026-04-25"
spoiler: "Correlation explains why AI coding can feel magical and unreliable: the system, not the model alone, turns probability into control."
tags: ["cognition", "causality", "AI", "software-engineering"]
---

Most success stories fail to replicate for a simple reason.

The lesson was not causal.

It was correlation with a clean story wrapped around it.

This sounds obvious. Everyone knows correlation is not causation. The problem is that we still make the mistake every day, especially when a tool gives us a few impressive wins in a row.

AI coding made this visible for me.

## Correlation vs causation

Most experience reports have the same shape:

- someone did A
- result B happened afterward

The story then becomes:

**A caused B.**

But the evidence only says:

**A and B happened together.**

That is correlation.

Causation needs a harder test:

**If I actively change A, does B reliably change with it?**

Or more plainly:

**Can I reproduce the result?**

![Correlation versus causation: correlation means two things appeared together; causation requires stable results after intervention.](/diagrams/correlation-causality-handdrawn.svg)

## The AI coding trap

I have been using AI coding agents for feature-level work.

The first runs felt strong:

- development moved faster
- several features landed in one pass
- repetitive work almost disappeared

It is easy to turn that into a conclusion:

**AI coding significantly improves developer productivity.**

That conclusion is not absurd.

There is evidence for it.

The problem is that the evidence often proves less than it seems to prove.

It proves that I used AI coding and several good outcomes followed.

That is still correlation.

## The failure is reproducibility

After more use, the real shape became clearer.

- tasks with similar complexity produced very different output quality
- code that worked in simple cases failed in the real system
- some sessions took longer to repair than they would have taken to write by hand

The important failure was not that AI coding sometimes missed.

The important failure was that I could not reliably reproduce the high-quality output.

That is the difference.

AI coding can be useful. But if the useful result cannot be reproduced under known conditions, it is not a method yet.

It is an outcome.

## From model capability to system design

The next tempting conclusion is also too simple:

**AI is not mature enough for complex coding.**

That is another causal shortcut.

The real question is not just:

**Can AI write code?**

The better question is:

**Under what conditions can it reliably write code that matches the intent?**

Model capability matters.

But capability is not the final unit of engineering value.

Engineering value comes when that capability is placed inside a system that can produce verifiable, shippable, maintainable results.

![The wrong short chain for AI coding versus the real system chain: model capability sits beside spec, context, tests, selection, and feedback.](/diagrams/ai-coding-system-handdrawn.svg)

## Correlation thinking vs causal thinking

Correlation thinking says:

- I used AI
- it sometimes worked
- therefore AI is useful

That is not entirely wrong.

It is just too coarse.

Causal thinking asks the next question:

**Does the result hold across different requirements, contexts, and codebases?**

That question changes the frame.

The problem is not only model capability.

The problem is how to constrain capability into stable output.

## From tool use to harness engineering

AI coding is not really a question of whether to use a tool.

It is a systems engineering problem.

If you write a prompt and ask for code directly, what you get is a probabilistic sample.

Sometimes the sample is excellent.

Sometimes it is expensive.

One good sample should not be mistaken for stable capability.

To make the result reproducible, you need harness engineering:

- explicit requirements and specs
- multiple generations and selection
- automated tests
- lint and static analysis
- failure retry with feedback
- constraints on the change surface and acceptance criteria

Harness engineering is not a longer prompt.

It is the system around the model.

The model proposes candidates.

The harness selects, verifies, feeds back, and decides which candidates are allowed to remain.

![Harness engineering loop: spec, sampling, ranking, tests, static analysis, feedback, retry, and accepted code.](/diagrams/harness-engineering-loop-handdrawn.svg)

## What the harness is really doing

The goal is not to make the model deterministic.

The model is probabilistic.

The goal is simpler:

**turn random success into high-probability success.**

More precisely:

**raw model use samples; harness engineering controls the output distribution.**

That is what it means to compress correlation into something closer to causal behavior.

You are not proving the model is always reliable.

You are building the conditions under which it becomes more reliably useful.

## A better conclusion

My first conclusion was:

**AI coding improves development speed.**

The better version is:

**AI coding plus the right engineering system can reliably improve development speed.**

The first sentence is an experience report.

The second is closer to a reproducible system design.

## The broader pattern

This is not only about AI.

A lot of visible success is only local correlation inside a larger system.

It becomes causal only when the system is understood, the key variables are controlled, and the verification loop is strong enough to survive repetition.

Investing works this way.

Product growth works this way.

Personal growth works this way.

When you fail to copy someone else's success, the problem is often not that you copied poorly.

You copied the visible behavior instead of the causal system behind it.

## The closing line

**Success you cannot reproduce is an illusion.**

Real capability is the ability to turn accidental success into a result that can be designed and repeated.

## TL;DR

- Most success advice is correlation
- Correlation does not guarantee reproducibility
- The AI coding problem is not only capability; it is system design
- Harness engineering turns probability into controlled results
- Causality is what makes success repeatable
