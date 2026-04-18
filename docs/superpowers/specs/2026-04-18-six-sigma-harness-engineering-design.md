# Spec: "Can Six Sigma Rein In Your LLM?" / "六西格玛管得住 AI 的手吗?"

**Date:** 2026-04-18
**Author:** Michael Zuo
**Status:** Draft — awaiting user review

## Purpose

Blog post for blog.michaelzuo.vip. A public experiment design, not a manifesto. Proposes mapping Six Sigma's variance-reduction framework onto AI harness engineering as a way to attack the problem of unpredictable, high-variance code output from tools like Claude Code. The post commits to trying the framework in the author's own workflow and reporting back in a follow-up — it does not claim the framework is proven.

Companion (by topic, not dependency) to *"How to make your LLM reliable"* and *"Your LLM is always telling you a story"* — same reader, different intervention layer: those two are about what to do with LLM output after you receive it; this one is about whether Six Sigma's process-control discipline can tighten the output distribution *before* it reaches you.

## Audience

Practitioners working closely with LLM coding agents (Claude Code users, harness engineers, people building AI-assisted development workflows) who have noticed that even with well-tuned prompts, output quality ranges from poor to excellent across identical inputs — and who suspect prompt engineering alone is not the answer.

## Core argument

Six Sigma's mathematical core is not bug elimination — it is variance reduction. The "six sigma" name refers to standard deviations fitting inside spec limits. Once you accept this, the right question is not *"how do I make the model write better code?"* but *"how do I tighten the distribution of what the harness produces?"*

Two reframes follow:

1. **The defect is variance itself.** Not bugs, not style drift — the spread of outcomes for identical inputs.
2. **Most AI-code failures we treat as special causes are actually common causes.** Re-prompting and retrying is the typical response to a bad run ("must be a bad sample"). But many of these failures are predictable outputs of how the harness is designed — they are common-cause variation that no amount of retrying will fix.

From these, harness engineering becomes process capability improvement: decompose variance by source, and apply harness-level interventions to each source.

This post is the *design* of that experiment, not its results. It lays out the author's hypotheses — the 5 variance sources and their proposed harness-level levers — and flags the 3 hypotheses the author is most uncertain about, to be tested in a follow-up.

## Anchor observation

Single lived observation, used throughout. Other scenarios not introduced.

- **The setup:** Past two months of close work with Claude Code in the author's harness engineering workflow.
- **The observation:** Even with identical inputs and identical prompts, re-running the same task produces outputs whose quality ranges from poor to high. The distribution is wide.
- **The frustration:** No amount of prompt polishing narrows this distribution reliably. Prompt engineering raises the average; it does not shrink the variance.
- **The hypothesis this post explores:** If prompt engineering is a mean-shifting tool, Six Sigma offers the variance-shrinking toolkit we are missing.

## Post structure

Target length: **~1200–1400 words (English, primary)** / **~1800–2200 字 (Chinese translation)**. Matches the mid-length register of recent posts. Thinking-out-loud posture — not a long-form manifesto. English drafted first; Chinese translation preserves the register and compression of prior ZH versions (see *"你的 LLM 总在给你讲故事"* for reference voice).

Section-level word counts below are given in English words (with ZH character counts in parentheses where the split is non-obvious). Section headers are shown here in English; Chinese headers are derived at translation time.

### Frontmatter

**English (`.md`):**

```
---
title: "Can Six Sigma Rein In Your LLM?"
date: "2026-04-18"
spoiler: "Prompt engineering is a mean-shifting tool. Tightening the distribution takes a different toolkit — the one from the factory floor."
---
```

**Chinese (`.zh.md`, derived):**

```
---
title: "六西格玛管得住 AI 的手吗?"
date: "2026-04-18"
spoiler: "prompt engineering 是均值工具。收窄分布需要另一套工具——来自生产线的那一套。"
---
```

### Section 1 — Cold open (no H2; opens the post)

**Constraints:**
- ~140–170 words (EN) / ~220–270 字 (ZH), tight.
- First person (*"For the past two months I've been working closely with Claude Code..."*).
- Three beats, in order:
  1. The observation: same inputs, same prompt, different runs — quality ranges from poor to high.
  2. The frustration: no amount of prompt polishing narrows this distribution.
  3. The pivot: maybe prompt engineering was never a variance-reduction tool — it shifts the mean; tightening the distribution needs a different toolkit.
- Ends on a turn into Shewhart's distinction, setting up Section 2.

### Section 2 — `## You've been treating common causes as special causes`

(ZH: `## 你一直在把共因当特殊因处理`)

**Constraints:**
- ~130–160 words (EN) / ~200–250 字 (ZH).
- Walter Shewhart 1920s — the origin of SPC. *Common-cause variation* (baked into the process design) vs *special-cause variation* (attributable to a specific event).
- Key assertion: our default reaction to a bad AI output — re-run, re-prompt, try again — is the reflex of treating common causes as special. Most *"the model didn't get me this time"* moments are things that happen every time.
- No new scenarios. Reference the anchor observation if needed.
- Lands on: to tighten the distribution, we need the language of *"how capable is this process?"* — not *"how unlucky was this run?"*. That is Six Sigma's language.

### Section 3 — `## Six Sigma's real core isn't bug elimination`

(ZH: `## Six Sigma 的真正内核不是消灭 bug`)

**Constraints:**
- ~130–160 words (EN) / ~200–250 字 (ZH).
- Quickly establish Six Sigma's mathematical core:
  - The name itself is about standard deviations — ±6σ has to fit inside your spec limits.
  - The 3.4 DPMO target is derived from that geometry, not set arbitrarily.
  - Every tool (control charts, Cpk, DOE) exists to *measure σ and shrink σ*.
- Landing: *the defect is variance itself*. Spec limits = acceptable requirement fulfillment + acceptable style/format.
- One line renames harness engineering as *"process capability improvement"*.
- End of section: show a simplified version of the table (two columns: source + typical symptom), setting up Section 4's decomposition.

### Section 4 — `## Decomposing variance into sources`

(ZH: `## 把变异分解成来源`)

**Constraints:**
- ~600–750 words (EN) / ~900–1100 字 (ZH). Body of the post.
- 5 sub-sections, each headed with h3 (`###`).
- Each sub-section ~100–135 words (EN) / 150–200 字 (ZH), except sub-section 4.5 (requirement-fulfillment variance) which gets ~200 words (EN) / 300 字 (ZH) — this is the post's most dramatic line and the one best aligned with stance B (public experiment).

**Sub-section structure:**

#### `### Model stochasticity` (ZH: `### 模型随机性`)
- Symptom: same prompt, different runs, output fluctuates.
- The variance source most readily acknowledged — but its share of real pain tends to be overestimated.
- Harness-level levers: temperature, sampling strategy, K-of-N voting.
- A line of doubt about *whether K-of-N actually holds for code tasks*, planting a hook for Section 5.

#### `### Input variance` (ZH: `### 输入变异`)
- Symptom: prompt phrasing drift, context contaminated with irrelevant information.
- Harness-level levers: prompt templating, context pruning, minimal-necessary-context discipline.
- This is what the prompt engineering community is already doing — the Six Sigma frame just gives it a more rigorous name (input stability).

#### `### Process variance` (ZH: `### 过程变异`)
- Symptom: agent loop takes different branches, tool calls fail, the same task produces entirely different execution traces.
- Harness-level levers: flow convergence, tool whitelisting, verification gates.
- A line of doubt about *whether convergent flow shrinks variance at the cost of capability*, planting a hook for Section 5.

#### `### Style/format variance` (ZH: `### 格式/风格变异`)
- Symptom: varying architecture styles for the same task, format drift.
- Harness-level levers: linter, validator, schema constraints, regeneration.
- The most "mechanical" category — this variance has already been engineered against; it just hasn't been named in Six Sigma terms.

#### `### Requirement-fulfillment variance` (key, ~200 words EN / ~300 字 ZH) (ZH: `### 需求落地变异`)
- Symptom: the code doesn't implement the requirement, the feature is unusable, bugs cluster, output *looks like* it did the thing but didn't.
- This is Section 2's "common cause vs special cause" at its most dramatic — most easily treated as special ("the model didn't get me, say it again"), but in fact a predictable output of a harness design that *fails to force the spec into the process in a verifiable form*.
- Harness-level levers: spec-first prompting (spec/AC in prompt), plan-before-code, TDD-style *"tests as spec"*, verification gates (run tests / LLM-as-judge against spec), dual-agent cross-check.
- A line of doubt about *whether LLM-based verification — itself a high-variance tool — can legitimately compress variance*, planting a hook for Section 5.

**After sub-sections:** paste the full table (three columns: source / symptom / lever), with the 3 "most suspect" rows bolded to flag Section 5.

### Section 5 — `## The three assumptions I'm most uncertain about`

(ZH: `## 我最怀疑的三条假设`)

**Constraints:**
- ~180–220 words (EN) / ~280–330 字 (ZH).
- The honest landing for stance B: no methodology manifesto — just lay out the 3 weakest links.
- Each item ~55–75 words (EN) / 80–110 字 (ZH): title states the assumption; 1–2 sentences say why it's suspect.

**The three (selected, pending user review):**

1. **"LLM-based verification gates can tighten the requirement-fulfillment distribution."** (Row 5)
   The verifier is itself a high-variance LLM. Using a variance-prone tool to compress another variance-prone tool's output may just move variance from A to B. Six Sigma has a preliminary step called *Measurement System Analysis (MSA)* — the measurement tool's resolution must be an order of magnitude tighter than the process variance it's trying to resolve, or the control chart reads out measurement noise. LLM-as-judge may not clear this bar.

2. **"K-of-N sampling reduces variance for code output."** (Row 1)
   K-of-N works for tasks with a defined correct answer (math, classification). For code, multiple outputs can all be "correct" — picking the best requires an arbiter, which loops back into Assumption 1. Worse, K-of-N's empirical track record on code is substantially weaker than on mathematical tasks.

3. **"Convergent flow design compresses process variance without losing capability."** (Row 3)
   Agent loops produce variance precisely because the model chooses branches at each step — and branching is also the source of its ability to solve novel problems. Over-constricting the flow may suppress variance and capability together. In Six Sigma's language this is the *process stability vs process capability* tension. Optimizing for stability alone trains the harness into a worse engineer.

**ZH translations of the three titles (for reference during translation):**
1. *"LLM-based 验证 gate 能收窄需求落地变异。"*
2. *"K-of-N 采样能降低代码输出变异。"*
3. *"流程收敛能在不损失能力的前提下压过程变异。"*

### Section 6 — Closing (standalone)

**Constraints:**
- ~85–115 words (EN) / ~130–180 字 (ZH).
- Does not reference the previous two posts.
- Builds to a short bolded final sentence.
- Closes stance B: this is a design, not a conclusion. I'll run 1–2 minimal interventions per variance source in my own harness, then report back in a few weeks on which assumptions survived.
- Avoid methodology-sermon tone; preserve the honesty of a thinking-in-progress piece.

**Primary landing line candidates** (pick at drafting time, lock the sharpest):

**English candidates:**
- **"Prompt engineering tunes the mean. To tighten the distribution, you have to go to the factory floor."**
- **"Whether Six Sigma can rein in an LLM, I'll tell you in a few weeks."**
- **"Stop treating common causes as special ones. That's already half the answer."**

**Chinese candidates (derived, for translation reference):**
- **"prompt engineering 调的是均值。收窄分布,得去生产线上找答案。"**
- **"Six Sigma 能不能管住 AI 的手,几周后回来告诉你。"**
- **"把共因不当特殊因处理,已经是一半的答案。"**

## Style conventions

- H2 (`##`) for all section headers
- H3 (`###`) for the 5 variance-source sub-sections inside Section 4
- `**bold**` for emphasized assertions, hypothesis names, and the final landing line
- Tables use standard markdown (header + 3 columns)
- No emoji
- No code fences (this post has no code)
- No external links unless a Shewhart / Six Sigma primer surfaces at drafting time; if added, limit to one (Section 2 or 3)
- First-person voice, declarative, mid-register — match *"你的 LLM 总在给你讲故事"* and *"让你的 LLM 更可靠"*
- No paper / data citations — this is hypothesis framing, not empirical work; pretending otherwise would break the stance B honesty

## Bilingual requirement

Per the blog's convention, this post ships in **both English and Simplified Chinese**. English is the primary drafting language; Chinese is translated from it at publish time. Matches the pattern of *"How to make your LLM reliable"* and *"Your LLM is always telling you a story"*.

Translation guidance: preserve proper nouns (Shewhart, Six Sigma, DPMO, Cpk, DOE, MSA, K-of-N, Claude Code, TDD) unchanged. Use natural Chinese equivalents for concepts with established translations (变异 for variance, 共因 / 特殊因 for common / special cause, 过程能力 for process capability, 规格边界 for spec limits). Match the register and compression of the Chinese version of *"你的 LLM 总在给你讲故事"*.

## Filename convention

Slug: `can-six-sigma-rein-in-your-llm`

Files (shipped together):

- `content/can-six-sigma-rein-in-your-llm.md` — English (primary)
- `content/can-six-sigma-rein-in-your-llm.zh.md` — Simplified Chinese (translation)

## Out of scope

- A DMAIC-structured post. DMAIC is referenced lightly at most (one sentence in Section 3 or Section 6). It is not the skeleton.
- A textbook-style Six Sigma primer. Section 3 gives only the minimum geometry needed to justify the variance frame.
- Empirical results. This post is the hypothesis; the follow-up will be the results.
- Paper citations or DPMO math. The post is a thinking-out-loud piece, not a review.
- Comparison with other AI-code-quality frameworks (evaluation harnesses, benchmark suites) — out of scope for stance B (public experiment design), and would dilute the one-thesis structure.
- Discussion of whether Six Sigma itself is a flawed framework (six-sigma-in-service-industries critiques, Motorola post-mortems). Accept the framework as-is and test the analogy.
- Detailed implementation of any of the 5 levers. The post names the levers; the follow-up (or a separate post) reports on what actually happened when they were tried.

## Success criteria

- A reader who has felt *"same prompt, wildly different outputs"* recognizes the pattern in the cold open.
- The variance-as-defect reframe lands as useful vocabulary — the reader walks away able to say *"that's common-cause variance, not a bad run"* the next time Claude Code produces poor output.
- The 5-row decomposition is concrete enough that the reader can identify which variance source dominates in their own workflow.
- Stance B is visible: readers understand this is a design, not a verdict — and are primed for the follow-up.
- The post stands alone — no prior-post knowledge required.
- Voice and length match recent posts; returning readers feel continuity without being asked to have read anything else.
