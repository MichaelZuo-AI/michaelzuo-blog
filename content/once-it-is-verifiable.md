---
title: "Once It Is Verifiable"
date: "2026-05-08"
spoiler: "Once a task becomes verifiable, it becomes self-improving. The scarce skill is designing the loop."
tags: ["ai-engineering"]
---

Andrej Karpathy's recent [Sequoia Ascent 2026 summary](https://karpathy.bearblog.dev/sequoia-ascent-2026/) has a clean line that explains a lot of the last year:

Traditional software automates what you can specify. LLMs and reinforcement learning automate what you can verify.

That second sentence is the important one. It explains why models got good at code faster than they got good at many everyday reasoning tasks. Code gives feedback. It compiles or it does not. Tests pass or fail. Benchmarks move or they do not. A diff can be inspected. A runtime error is not a vibe.

I would push the idea one step further:

**Once a task becomes verifiable, it becomes self-improving.**

Not automatically solved. Not magically correct. Self-improving.

The system has somewhere to put its failures.

## The missing word is verification

Most AI conversations still orbit the visible parts of the stack: model size, context length, tool use, latency, price, memory, agents.

Those matter. But they do not explain the unevenness.

The same model can refactor a large codebase and then fail a simple commonsense question. It can solve a hard benchmark and miss an obvious product invariant. It can write a plausible migration and quietly attach credits to the wrong user identity.

That is not random. It is a map of feedback.

Some tasks live inside dense verification loops. Others do not. In one region, every attempt produces a signal. In another, the model only gets applause from a plausible-looking paragraph.

Verification is what turns output into training material. It is also what turns an agent run into an engineering loop.

Without verification, the model produces. With verification, the system can select.

## Generation is not evolution

Generating a first answer is cheap now. That is the part everyone sees.

But generation by itself does not compound. A model can write ten versions of a plan. If none of them is checked against reality, the tenth version is not necessarily better than the first. It may only be more fluent.

Evolution needs pressure.

The pressure can come from a test suite, a simulator, a compiler, a market, a judge model, a human reviewer, a production metric, or a physical sensor. The form varies. The principle is the same: the environment has to say no.

![A verifiable task becomes a self-improving loop](/diagrams/verifiable-self-improving-loop.svg)

This is why "AI will do X" is the wrong first question.

The better question is: **what checks X?**

If the answer is "nothing," the model can still generate. It can draft, summarize, speculate, and imitate. Useful work may still happen. But there is no durable improvement loop.

If the answer is "a reliable environment," the task changes category. The model can try. The environment can reject. The next attempt can use the failure. At scale, that becomes capability.

## Code was the perfect early domain

Code is not just text. Code is text with consequences.

That is why coding agents improved so quickly. They are not merely predicting programming prose. They are operating inside a world that constantly pushes back.

The compiler pushes back. The linter pushes back. Unit tests push back. Type systems push back. Users push back. Logs push back. Security scanners push back. Performance budgets push back.

That makes code a near-perfect frontier domain for agents. It is high-value, digital, repeatable, and dense with feedback.

It also explains why agentic coding feels different from ordinary chatbot use. The agent is not only answering. It is acting, observing the result, and revising. The workflow contains a primitive version of reinforcement learning even when no model weights are being updated.

The important distinction is not "coding versus non-coding." It is verifiable versus unverifiable.

Many non-coding domains have hidden verification signals. Finance has reconciliation. Medicine has lab values and outcomes, with serious safety constraints. Law has filings, precedents, deadlines, and adversarial review. Operations has logs, SLAs, inventory, tickets, and incident timelines. Education has problem attempts, explanations, and retention over time.

The frontier is not where AI can talk. It is where the work can be made checkable.

## The human's new job is building the loop

This is where Karpathy's distinction between vibe coding and agentic engineering matters.

Vibe coding raises the floor. A person can describe a thing and get working software.

Agentic engineering raises the ceiling. A team can coordinate fallible agents while preserving correctness, security, taste, and maintainability.

The difference is the loop.

The agentic engineer does not just ask for output. They define the target, create the checks, constrain the tools, inspect the diff, run the tests, protect the permissions, and decide what failure means.

They turn a wish into a verifiable environment.

That skill is easy to underrate because it looks like process. It is not. It is the work that makes model capability compound.

An agent with no tests is a fast writer. An agent with tests is a search process. An agent with tests, permissions, observability, rollback, and human taste is an engineering system.

The scarce skill is no longer producing the first answer. It is designing the environment where bad answers die and good answers accumulate.

## The startup question

The obvious verifiable domains are already crowded. Coding, math, games, and benchmarks are directly on the rails of frontier labs. They are economically valuable and easy to turn into reward environments.

The interesting company question is elsewhere:

**What valuable domain is secretly verifiable?**

Not perfectly verifiable. Not cleanly specified. Just enough to create a loop.

Maybe the check is reconciliation against another system. Maybe it is a simulator. Maybe it is a structured audit trail. Maybe it is a narrow expert review that can be turned into an eval. Maybe it is a workflow where failures are already recorded but not yet used as training signal.

That is the wedge.

You do not need to wait for a frontier lab to care about your domain. If you can build the environment where attempts receive reliable feedback, you can make the task improve locally. The model does not have to arrive finished. It needs a place to practice.

This changes how I think about AI products.

The question is not only whether the model can perform the task today. The question is whether the product can expose enough feedback for the system to get better tomorrow.

Once the work is verifiable, every run can become data. Every failure can become a test. Every correction can become a constraint. Every edge case can become part of the environment.

That is when an AI product stops being a wrapper around generation and starts becoming a learning system.

**Once a task becomes verifiable, it becomes self-improving.**
