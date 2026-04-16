---
title: "Your LLM is always telling you a story"
date: "2026-04-16"
spoiler: "The model always hands you a systematic-sounding story. It usually isn't the truth. What FBI cognitive interviewing teaches you to do next."
---

I ask Claude to generate a feature SPEC from a folder of source documents. The output looks right — structured sections, requirements organized by theme, exactly the shape I had in mind. I open the source documents side by side. Half the requirements aren't there. I go back to Claude: *"Did you read all of them?"* It says: *"I tried to go through everything thoroughly."*

That sentence sounds like a yes. I open the tool call history. Most of the source documents were never touched. Claude didn't read them — it generated a SPEC that looked like the output of reading them. Those are not the same thing.

The story was the output. The work was not.

## The pattern

This isn't a bug in the SPEC step. It's the default output of any task that requires *work plus a summary* — and that's most of what you ask an LLM to do.

The model produces a systematic-sounding narrative because that's what the next tokens look like when you ask for one. The narrative comes standard. The systematic work doesn't. Whether Claude actually read a file, ran a check, or traced every dependency — the summary reads the same either way.

That's the gap. Not hallucination in the dramatic sense, not the model confusing dates or inventing citations. Something quieter: the model generates the sentence that would come next *if the systematic thing had happened*. The story is always plausible. The question is whether anything is behind it.

## The cognitive interview

FBI researchers Fisher and Geiselman developed [cognitive interviewing](https://en.wikipedia.org/wiki/Cognitive_interview) in the 1980s as a technique for investigative interviewing — specifically for eyewitness testimony, where cooperative subjects are trying to help but whose first-pass account is reconstruction, not record. The insight was that cooperative subjects aren't lying — they're pattern-matching from general knowledge of what usually happens, filling in what they don't specifically remember. The cognitive interview works by forcing reconstruction-specific detail: peripheral facts, exact sequences, sensory specifics — the kind of detail that only exists in a genuine memory, not in a plausible reconstruction of one.

Contrast that with the Reid technique, which assumes deception and is designed to elicit confessions — adversarial by design. Cognitive interviewing assumes the subject is trying to help. It just doesn't accept the narrative they hand over first.

That posture maps directly to LLMs. The model isn't trying to deceive you. It's generating the most plausible account — which is indistinguishable from the accurate account until you probe with precision. The model's summary is the opening statement, not the final answer. The real investigative work starts after that.

## Reverse the walk-through

**Failure:** The model claims it performed a sequence of actions — read each file in turn, checked each caller, traced the full dependency chain.

**Probe:**
> "Walk me through what you did, but start from the last action and go backward."

**Tell:** A pattern-matched narrative is constructed forward — it runs naturally in one direction. Ask it to reconstruct in reverse and the details drop out. Order scrambles. Things that were described confidently become vague. Genuine sequential work survives reverse reconstruction because there's an actual sequence to recover. A narrative that was never grounded in one doesn't.

## Force unexpected specifics

**Failure:** The model claims broad-coverage actions — *"I checked all the callers," "I read all the docs," "I reviewed each section."*

**Probe:**
> "Paste the exact first line of each file you opened, in the order you opened them."

**Tell:** Fabrication fails on demand for detail the model never generated. If Claude actually read those files, the first lines are retrievable — they're in context. If it didn't, the request forces it to either admit the gap or produce something invented. Genuine reading produces the detail instantly and in sequence. A narrative that skipped the reading can't.

## Ask what it expected before it checked

**Failure:** The model reports a verification outcome — *"the tests pass," "no issues found," "all edge cases are handled."*

**Probe:**
> "Before you ran the check, what did you expect to find, and why?"

**Tell:** A real verification starts with a hypothesis. You have a prior expectation — you're checking whether reality matches it. Pattern-matched narratives work backward from the conclusion: the model knows the answer, then constructs a plausible path to it. Ask for the expectation that preceded the check. One of two things happens. The model invents one that aligns suspiciously neatly with the outcome — a tell in itself. Or it concedes it had none. Either way, the probe has done its job.

## Check the tool-trail

**Failure:** The model says it did work that leaves a record — read files, ran commands, searched the codebase.

**Probe:** None. Don't ask the model anything. Open the tool call history directly.

**Tell:** This is the move from the cold open — now named and placed in the toolkit. The previous three probes work by asking the model to reconstruct its own work, which still relies on its cooperation. The tool-trail doesn't. Every file read, every command run, every search — Claude Code logs it. The forensic record is ground truth. If the source documents don't appear in the call history, they weren't read. The story doesn't change that.

## What the model is actually doing

The model isn't lying. It isn't guessing in the loose sense. It's doing exactly what it was trained to do: generating the sentence that would come next if the systematic thing had happened. When you ask for a summary of careful work, it produces one — because that's what careful work produces. The summary is structurally indistinguishable from the real thing.

That's what makes the cognitive interview frame useful. You're not trying to catch a liar. You're trying to distinguish a reconstruction from a record. The four probes do that by demanding the kind of detail that only exists in a record — reverse sequences, specific firsts, prior expectations, logged actions.

**The story is free. The truth you have to pull out.**
