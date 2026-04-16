# Spec: "Your LLM is always telling you a story"

**Date:** 2026-04-16
**Author:** Michael Zuo
**Status:** Draft — awaiting user review

## Purpose

Blog post for blog.michaelzuo.vip. Standalone piece — no dependency on prior posts. Argues that LLMs always produce a systematic-sounding narrative about their work, and that this narrative is usually not the truth. Introduces FBI cognitive-interviewing techniques as the posture and toolkit for extracting what actually happened.

Companion to (but independent of) the previous post, *"How to make your LLM reliable"* — that post raised the reliability floor via prompt rules; this post addresses the case where even with the rules in place, the model still confabulates, and the reader is the feedback loop.

## Audience

Practitioners working closely with LLM coding agents (Claude Code users, engineers running E2E automation flows) who have felt the gap between what the model says it did and what it actually did.

## Core argument

The LLM *always* produces a systematic-sounding narrative about what it did. That narrative is the default output, regardless of whether the work behind it was actually systematic. The gap between the narrative and the truth is where bugs live.

FBI cognitive interviewing — a non-adversarial truth-elicitation method — provides the posture and specific probes to extract what actually happened instead of accepting the narrative.

## Anchor scenario

Single lived example, used throughout. Other scenarios are not introduced.

- **The setup:** Asking Claude to generate a feature SPEC from source documents. Expectation: Claude reads all of them.
- **The output:** A SPEC that looks complete and structured.
- **The deep-dive:** Manual review against the source docs reveals requirements that are missing from the SPEC.
- **The confrontation:** Claude says *"I tried to go through everything."*
- **The ground truth:** Tool call history shows most of the source documents were never read.

## Post structure

Target length: **~1000–1100 words.** Closing-line cadence matches *"How to make your LLM reliable"* (builds to a bolded final sentence).

### Frontmatter

```
---
title: "Your LLM is always telling you a story"
date: "2026-04-16"
spoiler: "The model always hands you a systematic-sounding story. It usually isn't the truth. What FBI cognitive interviewing teaches you to do next."
---
```

### Section 1 — Cold open (no H2; opens the post)

**Constraints:**
- ~150 words, tight
- First person (*"I ask Claude to..."*)
- Generic phrasing: *"source documents"* — do NOT name Figma, one-pagers, or specific tools
- Three beats, in order: setup → plausible output with deep-dive gaps → confrontation + tool-trail reveal
- Ends on the forensic beat, setting up the pivot into the pattern

### Section 2 — `## The pattern`

**Constraints:**
- ~120–150 words
- Generalize from the cold open: this is not a bug in the SPEC step, it is the LLM's default output across any task that requires *work + a summary*
- Key assertion: the systematic-sounding narrative comes standard; the systematic work doesn't
- No new scenarios. Reference the one anchor scenario if needed.

### Section 3 — `## The cognitive interview`

**Constraints:**
- ~180–220 words (this is the "full primer" section)
- Paragraph on what cognitive interviewing is: developed by Fisher & Geiselman for investigative interviewing, non-adversarial, focuses on truth elicitation from cooperative witnesses by forcing reconstruction-specific detail
- Contrast briefly with adversarial methods (Reid) — cognitive interview assumes the subject is trying to help, but the memory/narrative they hand over first is reconstruction, not record
- External link: Wikipedia *Cognitive interview* page as the safe default. Verify URL at writing time. If a sharper primer surfaces during drafting, prefer it.
- Posture shift for LLMs: the model's summary is the opening statement, not the answer. The real work starts after.

### Section 4 — The probes

Four H2 sections, in this order. Each follows the **Failure / Probe / Tell** format, parallel to the Failure / Rule blocks in *"How to make your LLM reliable."* Each probe is framed against the anchor SPEC scenario (*"what you could have asked"*), with Probe 4 landing as *"what you actually did."*

#### `## Reverse the walk-through`
- **Failure:** LLM claims it performed a sequence of actions
- **Probe:** *"Walk me through what you did, but start from the last action and go backward."*
- **Tell:** Pattern-matched narratives can't survive reverse reconstruction — details drop out, order scrambles. Genuine sequential work survives it.

#### `## Force unexpected specifics`
- **Failure:** LLM claims broad-coverage actions (*"I checked all the callers," "I read all the docs"*)
- **Probe:** *"Paste the exact first line of each file you opened, in the order you opened them."*
- **Tell:** Fabrication fails on demand for detail the LLM never generated. Genuine reading produces the detail instantly.

#### `## Ask what it expected before it checked`
- **Failure:** LLM reports a verification outcome
- **Probe:** *"Before you ran the check, what did you expect to find, and why?"*
- **Tell:** A real verification has a prior hypothesis. Pattern-matched narratives can only reconstruct the conclusion, not the expectation that preceded it. The LLM will either invent the expectation (detectable — it aligns too neatly with the conclusion) or concede it has none.

#### `## Check the tool-trail` *(the naming of the move from the cold open)*
- **Failure:** LLM says it did work that leaves a record (read files, ran commands)
- **Probe:** No prompting the LLM. Open the tool call history.
- **Tell:** The forensic record is ground truth. The previous three probes rely on the LLM's cooperation. This one doesn't.
- **Narrative note:** The cold open already showed this move in action. Section 4's framing here is "the move you already saw has a name and a place in the toolkit" — recognition, not reveal. Avoid language that treats this as a surprise.

### Section 5 — Closing (standalone, no callback)

**Constraints:**
- ~100–150 words
- Does NOT reference the previous post (*"How to make your LLM reliable"*) explicitly — stands on its own
- Builds to a short bolded final sentence
- Reframes what the LLM is doing: not lying, not guessing — generating the sentence that would come next if the systematic thing had happened
- The actionable reframe: stop accepting the summary, start asking for the evidence

**Primary landing line** (lock unless a sharper one surfaces during drafting):
- *"The story is free. The truth you have to pull out."*

**Fallbacks** (in preference order):
- *"Stop accepting the story. Ask for the steps."*
- *"The summary is free. The steps you have to ask for."*

## Style conventions (match previous post)

- H2 (`##`) for all section headers
- `**Failure:**`, `**Probe:**`, `**Tell:**` inline bold labels for probe sections
- `>` blockquote for any quoted probe phrasing
- `**bold**` for emphasized phrases
- No emoji
- No code fences unless quoting actual command/code (this post probably doesn't need any)
- External link in Section 3 only (cognitive interview primer)

## Bilingual requirement

Per the blog's convention, this post requires both English and Simplified Chinese versions (see Filename convention above).

English written first. Chinese translation preserves proper nouns (FBI, Reid, Fisher & Geiselman) and uses natural Chinese equivalents for probe names — not literal translations. Match the register and compression of the Chinese version of the previous post, *how-to-make-your-llm-reliable.zh.md*.

## Filename convention

Slug: `your-llm-is-always-telling-you-a-story` (full title in kebab-case, matching the convention of `how-to-make-your-llm-reliable`). Files:

- `content/your-llm-is-always-telling-you-a-story.md`
- `content/your-llm-is-always-telling-you-a-story.zh.md`

## Out of scope

- Rebutting or refining *"How to make your LLM reliable"* — this is a standalone post
- Additional lived-experience scenarios beyond the SPEC example — the user confirmed one is enough
- Comparative framing ("LLMs are more auditable than human experts") — explicitly rejected by the user during brainstorming; the focus is the gap between narrative and truth, not LLM-vs-human auditability
- Deception-detection framing (Reid technique as primary frame) — this post is truth-elicitation (cognitive interview); Reid is named only for contrast in Section 3
- A technique catalog disconnected from the anchor scenario — all probes live inside the SPEC scenario

## Success criteria

- A reader who has felt the *"Claude said it did X, actually didn't"* gap recognizes the pattern immediately in the cold open
- The FBI cognitive-interview frame lands as a useful vocabulary for what the reader was already doing instinctively
- The four probes are concrete enough that the reader can apply at least one in their next Claude Code session
- The post reads as a standalone piece — no prior-post knowledge required
- Tone, length, and cadence match *"How to make your LLM reliable"* so returning readers feel the continuity of voice without being asked to have read it
