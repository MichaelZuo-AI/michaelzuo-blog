---
title: "How to make your LLM reliable"
date: "2026-04-15"
spoiler: "Four rules from Karpathy's skills repo — and why they're the same rules you'd teach a junior engineer."
---

Paste these four rules from [Andrej Karpathy's skills repo](https://github.com/forrestchang/andrej-karpathy-skills/blob/main/CLAUDE.md) into your instruction file. Each one fixes a specific failure your model has by default.

## 1. Surface what you don't know

**Failure:** the model gets an ambiguous instruction, picks a reading silently, and runs with it. You notice later it picked the wrong one.

**Rule:**
> State your assumptions explicitly. If multiple interpretations exist, present them — don't pick silently. If something is unclear, stop and ask.

Reliability isn't being right every time. It's your uncertainty being visible before it turns into a bug.

## 2. Don't add what wasn't asked for

**Failure:** you ask for a function, you get a class. You ask for a class, you get a plugin architecture. Every speculative line is a line that can fail later in a way nobody predicted.

**Rule:**
> No features beyond what was asked. No abstractions for single-use code. No "flexibility" or "configurability" that wasn't requested. If you write 200 lines and it could be 50, rewrite it.

The model isn't being lazy — it's being ambitious in the wrong direction. Default LLM output rewards looking sophisticated. Reliable LLM output rewards restraint. You have to say so out loud in the file, or the model defaults to the version that makes a better demo.

## 3. Stay inside the scope

**Failure:** you ask for a one-line fix, the diff touches twelve files because the model "improved" adjacent code on the way through.

**Rule:**
> Don't improve adjacent code, comments, or formatting. Match existing style, even if you'd do it differently. Every changed line should trace directly to the user's request.

The test: *can you predict the shape of the diff before you open it?* If yes, the model is a reliable contributor. If no, it's doing work you didn't ask for.

## 4. Define done before you start

**Failure:** the model says *"should work now"* — no test, no reproduction, no evidence. You run the code; the task isn't actually done.

**Rule:**
> "Fix the bug" → "Write a test that reproduces it, then make it pass."
> "Add validation" → "Write tests for invalid inputs, then make them pass."

A fuzzy definition of done ("make it work") becomes a clarification loop or a guess. A concrete one lets the model check its own work and report evidence instead of confidence.

## The part nobody put on the label

Paste those four rules into your `CLAUDE.md` and the next session behaves better. That's the practical payoff.

Read them back-to-back, though — *surface what you don't know, don't add what wasn't asked for, stay inside the scope, define done before you start* — and they aren't prompt engineering. They're the four things a mentor spends years getting into a junior engineer's head. A junior who can do all four is the moment people stop saying *"talented"* and start saying *"reliable."*

But even with a perfect prompt, the model is still probabilistic. It can still guess wrong, drift, or declare victory on vibes. Prompt polishing raises the floor, not the ceiling. The real work is one level up: **harness engineering** — the external feedback loop that validates the model's output against ground truth. A test that actually runs. The prompt tells the model what to aim at. The harness tells you whether it hit.

**The rules get you most of the way. The feedback loop gets you the rest.**
