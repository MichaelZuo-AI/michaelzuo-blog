---
title: "Feedback loop is all you need"
date: "2026-05-08"
spoiler: "Agentic coding works when the loop has ground truth. Prompts help, but verification is what makes the system improve."
tags: ["ai-engineering"]
---

After several months of working with coding agents every day, I keep coming back to the same lesson: the agent is only as good as the loop around it.

Then I read Andrej Karpathy's [Sequoia Ascent 2026 summary](https://karpathy.bearblog.dev/sequoia-ascent-2026/), and one line landed with exactly that resonance:

Traditional software automates what you can specify. LLMs and reinforcement learning automate what you can verify.

That was the missing frame for what I had been seeing in practice.

This post is a note to make that thinking explicit.

The important unit is not the prompt. It is not the model. It is not even the agent.

The important unit is the feedback loop.

If the loop has ground truth, the agent can improve the work. If the loop only has vibes, the agent can only make the output sound better.

## Agentic coding is not prompt magic

Most people start agentic coding by optimizing the visible part: better prompts, longer instructions, cleaner context, more detailed plans.

Those help. But they are not the reason the workflow works.

Agentic coding works because code sits inside a hostile environment. The compiler does not care how confident the agent sounds. The test suite does not reward persuasive prose. The runtime does not accept intent. The app either behaves correctly or it does not.

That is a rare gift.

In many LLM workflows, the model generates an answer and the user decides whether it feels right. In coding, the model generates a change and the system can answer back with ground truth.

The build fails. A type check fails. A unit test fails. A browser test catches a broken interaction. A screenshot shows text overlapping. A log line proves the code path never ran.

This is why coding agents can be useful even when they are wrong. Their mistakes are not just mistakes. They are material for the next turn.

## The loop matters more than the prompt

A weak loop turns a strong model into a fast guesser.

Ask an agent to "make this better" with no tests, no acceptance criteria, no observable behavior, and no way to inspect the result. It will still produce code. It may even produce plausible code. But it has no pressure toward correctness.

A strong loop changes the shape of the work.

![Agentic coding feedback loop with ground truth verification](/diagrams/feedback-loop-ground-truth.svg)

The agent gets a target. It edits. The environment checks the edit. The failure becomes concrete. The next attempt is no longer based on style or confidence. It is based on evidence.

That is the difference between generation and engineering.

The agent is not becoming trustworthy because it promised to be careful. It is becoming useful because the loop makes carelessness expensive.

## Ground truth is different from judgment

Human review still matters. Taste still matters. Architecture still matters. Security boundaries still matter.

But human judgment is not the same as ground truth.

Ground truth is the part of the task that can push back without negotiation.

The test either passes or fails. The generated page either contains the route or it does not. The migration either preserves the data or it does not. The API either returns the documented shape or it does not. The browser either renders the button inside its container or it does not.

Human judgment is where we decide what should be true. Ground truth is where the system proves whether it is true.

Good agentic engineering separates those two jobs.

The human defines the target: what matters, what must not break, what tradeoff is acceptable. The loop verifies the facts: what changed, what failed, what still holds.

When those jobs blur, the agent gets a loophole. It can satisfy the reviewer with a plausible explanation instead of satisfying the system with a correct result.

That is where agentic coding goes soft. The summary sounds right. The diff looks busy. The plan is coherent. But no ground truth has been applied.

## A robust loop has layers

One check is not enough.

A serious coding loop stacks different kinds of verification because each one catches a different failure mode.

Static checks catch syntax, types, lint, dependency boundaries, and obvious contract drift.

Unit tests catch local behavior.

Integration tests catch whether modules still agree with each other.

Browser or UI checks catch whether the thing a user sees actually works.

Logs and traces catch whether the expected path ran.

Diff review catches suspicious design, scope creep, security mistakes, and awkward abstractions.

Production metrics catch what the local environment cannot.

The point is not ceremony. The point is coverage of reality.

An agent can optimize against any single check. It can make tests pass while damaging the design. It can satisfy a lint rule while preserving a broken workflow. It can produce a clean-looking diff that fails in the browser.

Layered verification makes the escape routes narrower.

The loop should answer three questions every time:

- Did the change do what we asked?
- Did it break something we care about?
- Do we have evidence, or only a story?

The third question is the load-bearing one.

## The human builds the evaluator

Agentic coding changes the human role, but it does not remove it.

The human is no longer the only producer of code. The human becomes the designer of the environment where code is produced, rejected, repaired, and accepted.

That means writing better specs. It means turning fuzzy requirements into checks. It means adding the test before asking for the change when the risk is high. It means giving the agent commands it can run. It means asking for screenshots when visual correctness matters. It means reading the diff instead of trusting the final summary.

The best agentic engineers are not just better prompt writers.

They are better evaluator builders.

They know which parts of the problem need exact verification and which parts need human taste. They know when a passing test is meaningful and when it is a false comfort. They know how to make invisible failure visible.

That is why the ceiling is high.

A single agent with a weak loop is a smart autocomplete. A single agent with a strong loop is a search process over a real system. Multiple agents with strong loops become an engineering organization with mechanical memory.

Every failure can become a test. Every review comment can become an instruction. Every incident can become an invariant. Every repeated mistake can become part of the environment.

That is the compounding effect.

The model matters. The prompt matters. Context matters.

But for agentic coding, the durable advantage is the loop.

**Feedback loop is all you need.**
