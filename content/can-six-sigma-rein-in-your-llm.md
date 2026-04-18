---
title: "Can Six Sigma Rein In Your LLM?"
date: "2026-04-18"
spoiler: "Prompt engineering is a mean-shifting tool. Tightening the distribution takes a different toolkit — the one from the factory floor."
---

For the past two months I've been working closely with Claude Code. Same inputs, same prompt, different run — the output quality ranges from poor to high. Some runs produce clean, focused code that does the task. Others produce code that misses the requirement, implements the wrong thing, or ships with bugs already baked in. The spread is wide enough that I can't predict what I'll get.

I kept polishing the prompt. Sharper instructions, tighter context, clearer examples. The average output got better. The spread did not narrow.

That's when I realized I'd been using the wrong tool for the wrong problem. Prompt engineering is a mean-shifting tool. It moves the center of the distribution. But the variance — the *spread* — is a different beast. It answers to a different toolkit.

One that was worked out, it turns out, by manufacturing engineers a hundred years ago.

## You've been treating common causes as special causes

In 1924, Walter Shewhart split process variation into two kinds. *Special cause* — attributable to a specific event, something you can point to and fix. *Common cause* — baked into the process design, present every single run, never traceable to any one thing.

When Claude Code hands you a mediocre output, what do you do? Re-prompt. Try again. Chalk it up to a bad run. That's the reflex of treating common causes as special.

Most of *"the model didn't get me this time"* is a thing that happens every time. You just notice when the outcome lands on the bad end of the distribution.

To narrow the distribution we need the language of *"how capable is this process?"* — not *"how unlucky was this run?"* That is Six Sigma's language.

## Six Sigma's real core isn't bug elimination

The name gives it away. *Six sigma* means ±6 standard deviations have to fit inside your specification limits. The famous "3.4 defects per million opportunities" target isn't a chosen goal — it falls out of that geometry. Every tool in the kit — control charts, process capability indices, design of experiments — exists to do two things: measure σ, and shrink σ.

Once you see that, the framing shifts. **The defect is variance itself.** Spec limits are whatever you decide *acceptable* means — the output implements the requirement, the style is consistent, the architecture fits the codebase. The job is to hold the distribution inside those limits.

Harness engineering isn't really a prompt engineering problem, or even a model quality problem. It's a *process capability* problem.

The first move is to decompose where the variance comes from.

| Variance source | Typical symptom |
|---|---|
| Model stochasticity | Same prompt, different runs, output fluctuates |
| Input variance | Prompt drift, contaminated context |
| Process variance | Divergent agent loops, tool failures |
| Style/format variance | Inconsistent architecture, format drift |
| Requirement-fulfillment variance | Code doesn't implement the ask |

## Decomposing variance into sources

### Model stochasticity

The most legible source. The model samples tokens probabilistically, so even fixed inputs yield different outputs. Temperature controls the spread directly; lower temperature produces tighter distributions. K-of-N sampling — generate N candidates, keep the best — is another standard move.

This is the variance source most readily acknowledged in the AI community. It's also the one whose share of real pain tends to be *overestimated*. A lot of what we blame on "the model rolled a bad sample" isn't really sampling noise. It's one of the other four categories in disguise.

Lever it, but don't expect it to fix much on its own. And watch K-of-N carefully: picking the best of N candidates assumes you have a good way to pick. For code, that assumption breaks in interesting ways. More on that later.

### Input variance

Different prompt phrasings for the same intent produce different outputs. Context gets polluted with irrelevant information from earlier turns, or from over-eager retrieval. The same task becomes a different task, and the output distribution shifts with it.

The harness-level levers are well established: prompt templating pins the phrasing, context pruning removes noise, minimal-necessary-context discipline keeps the input signal dense. This is most of what the prompt engineering community has been doing for the last three years.

What Six Sigma adds is mainly a more rigorous name for it: *input stability*. Nothing in this row is new. But it helps to see it as one category of variance among five, rather than as "the whole problem."

### Process variance

Agent loops branch. The model decides at each step what tool to call, what to search for, what to skip. Two runs of the same task can take entirely different execution paths, visit entirely different files, and arrive at entirely different mental models before writing a single line of code.

Harness-level levers include forcing convergent flow (the loop has to pass through a specific shape), tool whitelisting (you can't call what isn't on the list), and verification gates that either pass or re-route.

The obvious lever is flow convergence — and it's also the most dangerous. Agents produce variance precisely because they're branching. That branching is also the source of their ability to solve problems you didn't anticipate. Convergence trades one for the other. I'll come back to this.

### Style/format variance

Different runs produce different architecture choices, different formatting, different naming conventions, different file layouts. The underlying logic may be the same, but the surface drifts.

This is the most *mechanical* category. The harness already has good levers: linters, validators, schema constraints, and regeneration that catches the violation and makes the model try again within a tighter frame.

Six Sigma doesn't add new tools here — the tooling community has been treating format constraints as basically solved for a while. It adds a naming: this is variance, and it's already being compressed. Good. Move on.

### Requirement-fulfillment variance

The one that hurts. The code compiles. The output looks like a finished feature. Then you line it up against the requirement and it implements something slightly different. Or partially. Or it *describes* the requirement in the comments and does something else. The feature is unusable — but not in a way a linter can catch.

This is Section 2 at full volume — the most dramatic *common cause mistaken for special cause* in the whole framework. The reflex is to re-prompt: *"the model didn't understand me this time."* But most of it is the predictable output of a harness design that never forces the spec into the process in a verifiable form. The spec lives in your head, in a one-line prompt, or in a document the model pretended to read. Nothing along the path enforced the round-trip from spec to tests to code to verification.

The levers here are the heaviest and most operationally expensive: spec-first prompting (acceptance criteria ride inside the prompt), plan-before-code (the model writes a plan, you approve it, only then code), TDD-style *"tests as spec"* (tests before implementation, tests as the contract), verification gates (run the tests, or use an LLM-as-judge against the spec), and dual-agent cross-check.

Each forces the spec to show up, in a verifiable form, at a specific point in the process. Whether that actually compresses the distribution is a separate question — one of the three I'm about to flag.

| Variance source | Typical symptom | Harness-level lever |
|---|---|---|
| **Model stochasticity** | Same prompt, different runs, output fluctuates | Temperature, sampling, K-of-N |
| Input variance | Prompt drift, contaminated context | Prompt templating, context pruning |
| **Process variance** | Divergent agent loops, tool failures | Flow convergence, tool whitelisting, verification gates |
| Style/format variance | Inconsistent architecture, format drift | Linter, validator, schema, regeneration |
| **Requirement-fulfillment variance** | Code doesn't implement the ask; bugs cluster | Spec-first prompt, plan-before-code, TDD, verification gates, dual-agent cross-check |

The three bolded rows are the ones I'm most unsure about. Here's why.

## The three assumptions I'm most uncertain about

**1. "LLM-based verification gates can tighten the requirement-fulfillment distribution."**

The verifier is itself a high-variance LLM. Using a variance-prone tool to compress another variance-prone tool's output may just move variance from A to B. Six Sigma has a preliminary step for exactly this — *Measurement System Analysis*. The measurement tool's resolution has to be an order of magnitude tighter than the process variance, or the control chart reads out measurement noise. LLM-as-judge probably doesn't clear that bar yet.

**2. "K-of-N sampling reduces variance for code output."**

K-of-N works when there's a defined correct answer — math, classification. For code, multiple outputs can all be correct. Picking the best requires an arbiter, which loops right back into assumption 1. And K-of-N's empirical track record on code is substantially weaker than on the benchmarks where it first got famous.

**3. "Convergent flow compresses process variance without losing capability."**

Agent loops produce variance because the model is deciding branches, and branching is also where its ability to solve problems you didn't plan for comes from. Over-constrict the loop and you may suppress the variance and the capability together. Six Sigma has a name for this tension too — *process stability vs process capability*. Optimize for stability alone and you train the harness into a worse engineer.

This is a design, not a conclusion. Over the next few weeks I'll run one or two minimal interventions per variance source inside my own harness — temperature controls, prompt templating, flow convergence, the linters already in place, and the expensive ones for requirement-fulfillment variance — and watch what happens to the distribution. The three assumptions above are what I'll be watching most closely. If they break, the framework breaks in interesting ways, and I'll come back with the broken pieces.

**Prompt engineering tunes the mean. To tighten the distribution, you have to go to the factory floor.**
