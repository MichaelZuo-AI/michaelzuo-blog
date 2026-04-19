---
title: "Can Six Sigma Rein In Your LLM?"
date: "2026-04-18"
spoiler: "Prompt engineering tunes the mean. Narrowing the distribution takes a different toolkit — one that came out of factories a hundred years ago."
tags: ["ai-engineering"]
---

For the past two months I've used Claude Code every day. One thing has been bugging me: same input, same prompt, two different runs — and the code comes back different. Sometimes it's great. Sometimes it misses the requirement, or only does half, or ships with bugs already inside. I don't know what I'll get until I see it.

I've done the obvious things. Tighter prompts. Cleaner context. More examples. The average went up. The range didn't narrow.

It took me a while to see what was going on. Prompt engineering tunes the average, not the range. To narrow the range you need a different toolkit.

That toolkit has been around for a hundred years. It came out of factories.

## You've been treating common causes as special causes

In 1924, Walter Shewhart split process variation into two kinds. *Special cause* comes from a specific event — something you can point to and fix. *Common cause* is part of the process itself. It happens every run, and no single event is to blame.

When Claude Code gives you a mediocre output, what do you do? Re-run it. Change the prompt. Chalk it up to a bad roll. That's treating a common cause as a special one.

The feeling that *"the model didn't get me this time"* usually isn't occasional. It's there every time. Most runs land in the middle of the distribution and you don't notice. The bad ones land at the edge and you do.

To narrow the distribution, the language has to change. Not *"how unlucky was this run?"* but *"how capable is this process?"* That's Six Sigma's language.

## Six Sigma's core isn't bug elimination

The name gives it away. *Six sigma* means ±6 standard deviations have to fit inside your specification limits. The famous "3.4 defects per million opportunities" isn't a chosen goal — it falls out of that geometry. The whole toolkit — control charts, process capability indices, design of experiments — is doing two things: measuring σ, shrinking σ.

From that angle, **the defect is variance itself.** The spec limits are whatever you decide *acceptable* means — the code implements the requirement, the style holds together, the architecture fits the codebase. The work is keeping the output distribution inside those limits.

So harness engineering isn't really a prompt problem, or even a model-quality problem. It's a *process capability* problem.

The first thing to do is break the variance into sources.

| Variance source | Typical symptom |
|---|---|
| Model stochasticity | Same prompt, different runs, output fluctuates |
| Input variance | Prompt drift, contaminated context |
| Process variance | Divergent agent loops, tool failures |
| Style/format variance | Inconsistent architecture, format drift |
| Requirement-fulfillment variance | Code doesn't implement the ask |

## Breaking variance into sources

### Model stochasticity

The most obvious source. The model samples tokens probabilistically, so even with identical input the output shifts. Temperature controls the spread directly — lower temperature, narrower distribution. K-of-N (generate N candidates, keep the best) is the other common move.

This is the variance source the AI community talks about the most. It's also the one whose share of real pain tends to be overestimated. A lot of what we blame on "bad sampling" isn't sampling at all. It's one of the other four categories dressed up to look like it.

Worth doing, but don't expect it to fix much on its own. And K-of-N has a catch: picking the best of N assumes you have a good way to pick. For code, that assumption breaks in an interesting way. I'll come back to it.

### Input variance

Phrase the same intent two different ways and you get two different outputs. Context picks up noise from earlier turns, or from over-eager retrieval, and suddenly the same task is a different task. The output distribution moves with it.

The harness-level levers are well-worn: prompt templates pin the phrasing, context pruning takes out noise, minimal-necessary-context keeps the signal dense. Most of what the prompt engineering community has done for three years lives here.

Six Sigma mostly adds a stricter name: *input stability*. Nothing new in this row. But seeing it as one category among five — not *the whole problem* — changes what you spend time on.

### Process variance

Agent loops branch. The model decides at each step which tool to call, what to search for, what to skip. Two runs of the same task can walk entirely different paths, read entirely different files, and build entirely different mental models before writing a line of code.

The levers: forcing convergent flow (the loop has to pass through a specific shape), tool whitelisting (you can't call what isn't on the list), verification gates (pass or re-route).

The obvious lever is convergence. It's also the most dangerous one. Agents produce variance *because* they're branching. Branching is also where their ability to handle unexpected problems comes from. Convergence trades one for the other. More on that below.

### Style/format variance

Different runs give you different architectural choices, different formatting, different naming, different file layouts. The underlying logic might be fine, but the surface drifts.

This is the most mechanical category. The harness already has good tools for it: linters, validators, schema constraints, regeneration that catches the violation and asks for another pass under tighter rules.

Six Sigma doesn't bring anything new here — the tooling community has treated format constraints as basically solved for a while. All it adds is a name: this is variance, and it's already being compressed. Good. Next.

### Requirement-fulfillment variance

The one that hurts. The code compiles. The output looks like a finished feature. Then you hold it next to the requirement and it implements something slightly different. Or only part of it. Or it *describes* the requirement in the comments and does something else entirely. The feature isn't usable, and no linter can catch it.

This is the sharpest case of the common-cause/special-cause mix-up in the whole framework. The reflex is to re-prompt — *"the model didn't get me this time."* But most of the time this is the predictable output of a harness that never forces the spec into the process in a verifiable form. The spec lives in your head, in a one-line prompt, or in a doc the model pretended to read. Nothing along the path enforces the round-trip from spec to tests to code to verification.

The levers here are the heaviest and the most expensive to run: spec-first prompting (acceptance criteria ride along in the prompt, not in your head); plan-before-code (the model writes a plan, you approve it, then it writes code); TDD-style *tests-as-spec* (tests first, tests as the contract); verification gates (run the tests, or let an LLM-as-judge score against the spec); dual-agent cross-check.

Each of these forces the spec to show up, in a verifiable form, at a specific point in the process. Whether they actually narrow the distribution is another question — one of the three I'm about to flag.

| Variance source | Typical symptom | Harness-level lever |
|---|---|---|
| **Model stochasticity** | Same prompt, different runs, output fluctuates | Temperature, sampling, K-of-N |
| Input variance | Prompt drift, contaminated context | Prompt templating, context pruning |
| **Process variance** | Divergent agent loops, tool failures | Flow convergence, tool whitelisting, verification gates |
| Style/format variance | Inconsistent architecture, format drift | Linter, validator, schema, regeneration |
| **Requirement-fulfillment variance** | Code doesn't implement the ask; bugs cluster | Spec-first prompt, plan-before-code, TDD, verification gates, dual-agent cross-check |

The three rows in bold are the ones I'm least sure about. Here's why.

## The three assumptions I'm least sure about

**1. "LLM-based verification gates can tighten the requirement-fulfillment distribution."**

The verifier is itself a high-variance LLM. Using a high-variance tool to compress another high-variance tool's output might just move variance from A to B. Six Sigma has a pre-step for this called *Measurement System Analysis* — the measurement tool's resolution has to be an order of magnitude tighter than the process variance, or the control chart reads out measurement noise. LLM-as-judge probably doesn't clear that bar yet.

**2. "K-of-N sampling reduces variance in code output."**

K-of-N works when there's a defined correct answer — math, classification. For code, several outputs can all be correct. Picking the best of them needs an arbiter, which bounces right back to assumption 1. And K-of-N's empirical record on code is much weaker than on the benchmarks where it first showed up.

**3. "Convergent flow compresses process variance without costing capability."**

Agent loops produce variance because the model is picking branches, and branching is where its ability to handle problems you didn't plan for comes from. Over-constrain the loop and you might suppress the variance and the capability together. Six Sigma has a name for this tension — *process stability vs. process capability*. Optimize only for stability and you've trained the harness into a worse engineer.

This is a design, not a conclusion. Over the next few weeks I'll run one or two minimal interventions per variance source inside my own harness — temperature, prompt templates, convergent flow, the linters already running, and the expensive ones for requirement fulfillment — and watch what happens to the distribution. The three assumptions above are the ones I'll be watching hardest. If they break, the framework breaks in an interesting way, and I'll come back with the pieces.

**Prompt engineering tunes the mean. To narrow the distribution, you have to go to the factory floor.**
