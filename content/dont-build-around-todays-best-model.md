---
title: "Don't Build Around Today's Best Model"
date: "2026-04-22"
spoiler: "Capability rankings keep changing. If switching the leading model is hard, the bug is your architecture, not your prompt."
tags: ["ai-engineering"]
---

I'm building an E2E automation flow for code delivery. The first version leaned heavily on Claude Code and Opus. Not just as a model choice. The workflow itself had started to assume how that model planned, how it recovered, how much it could infer, and how far it could run before I needed to step in.

Then the ground moved.

From Opus 4.5 to 4.7, the results in this flow got worse. The same tasks got noisier. More retries. Less stable edits. More supervision. At the same time, GPT-5.4 in Codex started giving me better results in the same kind of work.

That is not the interesting part.

The interesting part is that the shift exposed a design bug in my system. If changing the leading model forces you to rethink your workflow, you did not build a durable automation architecture. You built a workflow around one model's habits.

## The rankings will keep moving

This is the part people still underweight.

The model leaderboard is not stable. Benchmarks change. Providers ship new variants. Real-world fit changes before the public narrative catches up. A model that is best at long-horizon planning can drift. A model that used to be weak at disciplined code edits can get better fast. The number one spot is not an architectural constant.

So the design target should not be: *pick the winner and optimize everything around it.*

It should be: *assume the winner will change, and make that switch cheap.*

If your architecture treats "current best model" as a fixed dependency, every ranking change becomes a rewrite project. That is the opposite of leverage.

## What actually broke in my first design

The failure was not one bad prompt. It was hidden coupling.

My flow had started to bake model-specific behavior into the system itself:

- task boundaries assumed one style of planning and execution
- retries assumed the same model would succeed if I just asked again
- success criteria lived too much inside prompt wording
- recovery paths depended on one model's tool discipline
- orchestration logic was tuned to one model's failure pattern

That kind of system feels fine while the model stays ahead. The moment rankings move, all of that invisible coupling becomes operational drag.

The prompt is not the interface.

The model is not the architecture.

## What model-agnostic actually means

Model-agnostic does not mean pretending all models are interchangeable. They are not.

Some are better at planning. Some are better at controlled edits. Some follow tool contracts cleanly. Some need tighter task scopes. Some tolerate ambiguity better than others. Those differences are real.

Model-agnostic architecture means isolating those differences behind a thin layer, instead of letting them leak into the whole system.

The stable part of the system should own:

- the task contract
- the context packaging
- the tool interface
- the artifact format
- the verification rules
- the fallback and escalation policy

The replaceable part should own:

- provider-specific prompt shaping
- context budget tuning
- tool syntax quirks
- model selection heuristics
- a small amount of model-specific recovery logic

That boundary is the whole game.

![Model-agnostic architecture for code-build automation](/diagrams/model-agnostic-architecture.svg)

## Keep the contract stable

What matters most is the contract between orchestration and execution.

When I hand work to a model, I want a stable unit:

- the exact objective
- the allowed tools
- the required output artifact
- the verification that decides pass or fail
- the escalation rule if the step cannot be completed safely

Once that contract is explicit, the model becomes an execution engine behind an adapter. Claude can sit there. GPT can sit there. The next model can sit there. The workflow above that layer does not need to be redesigned every time the rankings change.

This is the same reason good infrastructure hides cloud-vendor differences behind clean interfaces. You do not want your application logic to know how one provider names every knob. You want an adapter at the edge.

## Never let the model certify itself

This is where most "model-agnostic" claims collapse.

If the model decides what success means, then your system is still coupled to that model's behavior. The verifier has to live outside the model.

For a code-build flow, that usually means some mix of:

- tests
- type checks
- schema checks
- file-level diff checks
- required artifact presence
- policy checks on what changed and what did not

A model can propose work. It should not be the final authority that the work is done.

Once verification is external, switching models gets much easier. You are no longer asking, *do I trust this model?* You are asking, *can this model satisfy the same contract under the same verifier?*

That is a much healthier system boundary.

## Keep the model-specific layer thin

I still expect to tune per model. That is normal.

Claude and GPT-5.4 do not need identical prompts. They do not need the same step size, context budget, or retry thresholds. A model-agnostic architecture is not a single giant prompt pasted into multiple providers.

But that tuning should stay near the adapter.

If swapping from one leading model to another forces changes in your task graph, your artifact schema, your logging model, your human escalation flow, or your verifier, the model-specific layer has already leaked too far.

The switch should feel like changing a driver, not rebuilding the car.

## The rule I am using now

I am designing this flow with one assumption: the leading model will change again.

Not maybe. Again.

That means I want the next switch to be boring:

- keep the workflow contract stable
- keep verification independent
- keep model adapters thin
- route by observed performance, not loyalty
- make fallback and promotion cheap

Today, in my own flow, GPT-5.4 in Codex is outperforming the Claude Code and Opus setup I used heavily before. That may change again. I expect it to.

The architecture should expect it too.

Do not build your system around today's best model. Build it so tomorrow's best model can take over with minimal drama.
