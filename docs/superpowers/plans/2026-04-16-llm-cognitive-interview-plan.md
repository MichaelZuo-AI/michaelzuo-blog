# "Your LLM is always telling you a story" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write and publish a bilingual (English + Simplified Chinese) blog post titled *"Your LLM is always telling you a story"* to blog.michaelzuo.vip, matching the voice, cadence, and structure of the previous post *"How to make your LLM reliable."*

**Architecture:** Two new markdown files in `content/`: one English, one Chinese. The site is Next.js + gray-matter; adding markdown files is all that's required. `next build` generates static output and `scripts/generate-rss.mjs` runs as `postbuild`. Deploy is triggered automatically by push to `main` (GitHub Pages via GitHub Actions).

**Tech Stack:** Next.js 15, React 19, gray-matter (frontmatter parsing), GitHub Pages, GitHub Actions. No tests for blog content — verification is `npm run build` success + visual inspection.

**Spec:** `docs/superpowers/specs/2026-04-16-llm-cognitive-interview-design.md`

**Reference post (style anchor):**
- English: `content/how-to-make-your-llm-reliable.md`
- Chinese: `content/how-to-make-your-llm-reliable.zh.md`

---

## File Structure

**Create:**
- `content/your-llm-is-always-telling-you-a-story.md` (English post)
- `content/your-llm-is-always-telling-you-a-story.zh.md` (Chinese post)

**Do not modify:** no existing files should change. Posts are discovered by filesystem scan of `content/`.

---

## Task 1: Write, self-review, and commit the English post

**Files:**
- Create: `content/your-llm-is-always-telling-you-a-story.md`

---

- [ ] **Step 1: Read the spec and reference post**

Run:
```bash
cat docs/superpowers/specs/2026-04-16-llm-cognitive-interview-design.md
cat content/how-to-make-your-llm-reliable.md
```

These are the source of truth for content (spec) and style (reference post). Re-read before writing each section.

- [ ] **Step 2: Verify the external link target is live**

The post links to a cognitive-interview primer in Section 3. Default: Wikipedia's *Cognitive interview* page.

Verify the URL resolves:
```bash
curl -sI https://en.wikipedia.org/wiki/Cognitive_interview | head -1
```
Expected: `HTTP/2 200` (or 301 → 200). If it doesn't resolve, fall back to searching for "Fisher Geiselman cognitive interview" and pick a stable primer; note the substitution in the commit message.

- [ ] **Step 3: Create the file with frontmatter**

Create `content/your-llm-is-always-telling-you-a-story.md` with exactly this frontmatter (nothing else yet):

```markdown
---
title: "Your LLM is always telling you a story"
date: "2026-04-16"
spoiler: "The model always hands you a systematic-sounding story. It usually isn't the truth. What FBI cognitive interviewing teaches you to do next."
---

```

- [ ] **Step 4: Write the cold open**

Constraints — re-check against spec Section 1:
- **~150 words, tight.** If the first draft is over 200 words, cut.
- **First person** — *"I ask Claude to..."*, not *"you ask Claude..."*
- **Generic phrasing** — say *"source documents"*. Do NOT name Figma, one-pagers, or any specific tool.
- **Three beats in order:** setup → plausible SPEC output with deep-dive gaps → confrontation + tool-trail reveal.
- **No H2 header.** The cold open opens the post directly after the frontmatter, same as the reference post.
- Style: short sentences. Em-dashes allowed. Declarative tone. No hedging.

Model the opening cadence on the first paragraph of `how-to-make-your-llm-reliable.md` (two sources, signal sentence, then the hook).

Append the cold open to the file.

- [ ] **Step 5: Write Section 2 — `## The pattern`**

Constraints — re-check against spec Section 2:
- **~120–150 words**
- Generalize from the cold open: this is the LLM's default output on any task that is *work + a summary*, not a bug in the SPEC step.
- Land at least one of these assertions (paraphrase, don't quote verbatim):
  - *The systematic-sounding narrative comes standard; the systematic work doesn't.*
  - *The story is the default output, whether the work behind it was systematic or not.*
- Do not introduce new scenarios. Reference the SPEC scenario if helpful.

Append Section 2 to the file.

- [ ] **Step 6: Write Section 3 — `## The cognitive interview`**

Constraints — re-check against spec Section 3:
- **~180–220 words** (the "full primer")
- One paragraph on what cognitive interviewing is:
  - Developed by Fisher & Geiselman in the 1980s for investigative interviewing
  - Non-adversarial; assumes the subject is cooperating
  - Core mechanism: probes that force reconstruction-specific detail, exposing the difference between a pattern-matched narrative and an actual record
- Brief contrast with Reid technique (which IS adversarial and deception-focused) — one sentence, no more.
- External link: Wikipedia *Cognitive interview* page (verified in Step 2). Markdown link format: `[cognitive interviewing](https://en.wikipedia.org/wiki/Cognitive_interview)`.
- Posture shift for LLMs: *the model's summary is the opening statement, not the answer. The real work starts after.*

Append Section 3 to the file.

- [ ] **Step 7: Write Section 4 — the four probes**

Constraints — re-check against spec Section 4:

Four H2 sub-sections in **this exact order**:

1. `## Reverse the walk-through`
2. `## Force unexpected specifics`
3. `## Ask what it expected before it checked`
4. `## Check the tool-trail`

Each probe follows this structure:

```markdown
## [Probe name]

**Failure:** [one sentence describing what the LLM claim looks like]

**Probe:**
> [the exact phrasing to use in the dialogue — one sentence, quoted]

**Tell:** [one-to-three sentences explaining what survives the probe vs. what collapses]
```

Content per probe (use these as source-of-truth; rephrase for prose flow, don't copy verbatim):

**Probe 1 — Reverse the walk-through**
- Failure: LLM claims it performed a sequence of actions.
- Probe: *"Walk me through what you did, but start from the last action and go backward."*
- Tell: Pattern-matched narratives can't survive reverse reconstruction — details drop out, order scrambles. Genuine sequential work survives it.

**Probe 2 — Force unexpected specifics**
- Failure: LLM claims broad-coverage actions (*"I checked all the callers"*, *"I read all the docs"*).
- Probe: *"Paste the exact first line of each file you opened, in the order you opened them."*
- Tell: Fabrication fails on demand for detail the LLM never generated. Genuine reading produces the detail instantly.

**Probe 3 — Ask what it expected before it checked**
- Failure: LLM reports a verification outcome.
- Probe: *"Before you ran the check, what did you expect to find, and why?"*
- Tell: A real verification has a prior hypothesis. Pattern-matched narratives can only reconstruct the conclusion, not the expectation that preceded it. The LLM will either invent an expectation that aligns suspiciously neatly with the conclusion, or concede it has none.

**Probe 4 — Check the tool-trail**
- Failure: LLM says it did work that leaves a record (read files, ran commands).
- Probe: No prompting the LLM. Open the tool call history directly.
- Tell: The forensic record is ground truth. The previous three probes rely on the LLM's cooperation — this one doesn't.
- **IMPORTANT — narrative framing:** the cold open already showed this move in action. Frame Probe 4 as *"the move you already saw, now named and placed in the toolkit,"* not as a surprise reveal. Avoid language like *"the real answer,"* *"the one that actually works,"* or anything that positions the previous three probes as inferior. All four are tools; the tool-trail one is distinctive because it bypasses the LLM.

Each probe section: ~80–120 words total. Keep it tight.

Append Section 4 (all four probes) to the file.

- [ ] **Step 8: Write Section 5 — the closing**

Constraints — re-check against spec Section 5:
- **~100–150 words**
- **Standalone** — do NOT reference *"How to make your LLM reliable"* or its "rules" or "feedback loop" framing.
- Reframe what the LLM is doing: not lying, not guessing — it's *generating the sentence that would come next if the systematic thing had happened*. That phrasing is central — keep it close to verbatim.
- Builds to a short bolded final sentence.

**Primary landing line (use this unless a sharper one surfaces during drafting):**

```markdown
**The story is free. The truth you have to pull out.**
```

Fallbacks if the primary feels off against the paragraph above it:
- *"Stop accepting the story. Ask for the steps."*
- *"The summary is free. The steps you have to ask for."*

**Closing section header options** (pick what fits the prose — or no header if the flow works without one; the reference post uses `## The part nobody put on the label` — a content-specific header, not a generic "Closing"):
- `## What the model is actually doing`
- `## The story and the steps`
- No header; simply finish the post after Section 4 with a horizontal rule or direct transition. Match whatever the reference post's closing feels like.

Append Section 5 to the file.

- [ ] **Step 9: Full-post self-review against spec**

Open the file and check, in order:

1. **Word count.** Run `wc -w content/your-llm-is-always-telling-you-a-story.md`. Expected: ~1000–1100 words (excluding frontmatter — subtract ~20 for that). If >1200, cut; if <900, flag for review.
2. **Frontmatter correctness.** Title, date `2026-04-16`, spoiler match the spec exactly.
3. **Section headers in order:** cold open (no header) → `## The pattern` → `## The cognitive interview` → `## Reverse the walk-through` → `## Force unexpected specifics` → `## Ask what it expected before it checked` → `## Check the tool-trail` → closing (header optional).
4. **Each of the four probes has all three labels:** `**Failure:**`, `**Probe:**`, `**Tell:**`. Blockquote (`>`) used for the exact probe phrasing.
5. **External link present** in Section 3 only, pointing at the URL verified in Step 2.
6. **Bolded final line present** at end of Section 5.
7. **Voice check:** open `content/how-to-make-your-llm-reliable.md` side-by-side. Does the new post read in the same voice? Same rhythm of short declarative sentences, em-dashes, no hedging? If one paragraph sounds chattier or more academic than the reference, rewrite it.
8. **No forbidden references:** no mention of "rules," "harness engineering," "feedback loop," or callbacks to the previous post (per spec out-of-scope).
9. **Probe 4 framing:** does it read as recognition/naming, not as a reveal that demotes the other three probes?

Fix any issues inline.

- [ ] **Step 10: Verify the site still builds**

Run:
```bash
npm run build
```

Expected: Build completes successfully. Look for the new post path in the build output (Next.js logs generated routes). The `postbuild` hook regenerates RSS; confirm no errors.

If the build fails with a markdown-parsing error, the most likely culprit is an unescaped character in the frontmatter (e.g., a quote inside the spoiler string). Fix and re-run.

- [ ] **Step 11: Commit the English post**

```bash
git add content/your-llm-is-always-telling-you-a-story.md
git commit -m "$(cat <<'EOF'
post: Your LLM is always telling you a story

Applies FBI cognitive-interviewing techniques to probe past Claude's
systematic-sounding narratives and surface what actually happened.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

Do NOT push yet. Push happens in Task 3 after the Chinese version is also committed.

---

## Task 2: Write, self-review, and commit the Chinese translation

**Files:**
- Create: `content/your-llm-is-always-telling-you-a-story.zh.md`

---

- [ ] **Step 1: Read the final English version and the Chinese reference post**

Run:
```bash
cat content/your-llm-is-always-telling-you-a-story.md
cat content/how-to-make-your-llm-reliable.zh.md
```

Re-read before translating each section. The Chinese reference post defines register, terminology choices, and punctuation conventions.

- [ ] **Step 2: Create the file with translated frontmatter**

Create `content/your-llm-is-always-telling-you-a-story.zh.md` with this frontmatter:

```markdown
---
title: "你的 LLM 总在给你讲故事"
date: "2026-04-16"
spoiler: "模型总是递给你一个看起来系统、有条理的叙述。但那通常不是真相。FBI 的认知访谈技术告诉你下一步该做什么。"
---

```

Frontmatter notes:
- Title and spoiler are natural translations, not literal. Do NOT translate *"LLM"* (keep as loanword, matches reference post convention).
- If the reference post's frontmatter uses different quoting or spacing conventions, match those.

- [ ] **Step 3: Translate the cold open**

Match the English cold open beat-for-beat. Constraints:
- **~150–200 Chinese characters** (Chinese is typically denser than English; aim for equivalent tightness, not equivalent word count).
- Use first person: *"我让 Claude..."*
- Generic phrasing: *"源文档"* or *"相关文档"*, not specific tool names.
- Same three beats: setup → plausible output with gaps → confrontation + tool-trail reveal.
- Match the punchy declarative rhythm of the Chinese reference post. Short sentences. 破折号 (em-dashes) where the English uses em-dashes.

- [ ] **Step 4: Translate Section 2 — `## 模式` (The pattern)**

Section header: `## 模式` or `## 这是默认行为` — pick what reads most naturally in Chinese blog register.

Constraints:
- ~200–300 Chinese characters
- Same argument as the English version: this is the LLM's default, not a SPEC-step bug.

- [ ] **Step 5: Translate Section 3 — `## 认知访谈` (The cognitive interview)**

Section header: `## 认知访谈`.

Constraints:
- ~350–450 Chinese characters
- Proper nouns **stay in English**: FBI, Reid, Fisher & Geiselman. Chinese reader expects these as-is; translating them feels artificial.
- *Cognitive interview* → `认知访谈` (academic-standard translation).
- *Reid technique* → `Reid 技术`.
- External link: same URL as English version, rendered as a Chinese markdown link, e.g. `[认知访谈技术](https://en.wikipedia.org/wiki/Cognitive_interview)`.
- Preserve the posture-shift line (*the summary is the opening statement*): *"模型给你的总结只是开场陈述,不是答案。真正的工作从这里开始。"*

- [ ] **Step 6: Translate Section 4 — the four probes**

Section headers (pick natural Chinese equivalents, not literal translations):

1. `## 倒着讲一遍` (Reverse the walk-through — "tell it backward")
2. `## 逼出意料之外的细节` (Force unexpected specifics)
3. `## 问它在验证之前的预期` (Ask what it expected before it checked)
4. `## 查看工具调用记录` (Check the tool-trail)

Labels for each probe:
- `**Failure:**` → `**失败模式:**` (matches Chinese reference post)
- `**Probe:**` → `**追问:**`
- `**Tell:**` → `**破绽:**`

Keep the blockquote (`>`) for the exact probe phrasing — translate the English probe phrasing into natural Chinese.

Same narrative constraint for Probe 4: frame as recognition/naming of the move from the cold open, not as a surprise reveal.

- [ ] **Step 7: Translate Section 5 — the closing**

Section header: match whatever the English version used (or also skip the header if the English version did).

Constraints:
- Preserve the key reframe: *"模型不是在撒谎。它也不是在猜。它是在生成——如果那个系统化的过程真的发生了——接下来本应出现的那句话。"* (The model isn't lying. It isn't guessing. It's generating the sentence that would come next if the systematic thing had actually happened.)
- Bolded final line: translate the English landing line naturally. Primary candidate:

```markdown
**故事是免费的。真相你得自己挖出来。**
```

If this reads awkwardly in Chinese, iterate — the English line *"The story is free. The truth you have to pull out."* relies on a parallel structure that may need restructuring in Chinese. Acceptable alternatives:
- **故事是默认送上门的。真相要你自己逼出来。**
- **别只接过故事。去问出步骤。**

- [ ] **Step 8: Self-review the Chinese version**

Check:
1. **Frontmatter:** title, date, spoiler in Chinese (proper nouns like "LLM", "FBI" in English).
2. **Section headers** all translated; order matches English post exactly.
3. **Four probes each have** `**失败模式:**` / `**追问:**` / `**破绽:**` labels.
4. **External link** present in Section 3, URL matches English version.
5. **Bolded final line** present at end.
6. **Register check:** open `content/how-to-make-your-llm-reliable.zh.md` side-by-side. Is the voice consistent? Same compression, same punctuation style, same willingness to use em-dashes and short declarative sentences?
7. **Proper nouns in English:** verify FBI, Reid, Fisher, Geiselman, LLM, Claude all appear in Latin characters, not transliterated.

Fix any issues inline.

- [ ] **Step 9: Verify the site still builds with both languages**

Run:
```bash
npm run build
```

Expected: both posts appear in build output. No errors.

- [ ] **Step 10: Commit the Chinese translation**

```bash
git add content/your-llm-is-always-telling-you-a-story.zh.md
git commit -m "$(cat <<'EOF'
post: Your LLM is always telling you a story (zh)

Simplified Chinese translation.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Push to origin

- [ ] **Step 1: Verify both commits are local and unpushed**

Run:
```bash
git log origin/main..HEAD --oneline
```

Expected: at least two commits visible — the English post commit and the Chinese post commit.

- [ ] **Step 2: Push to main**

```bash
git push origin main
```

Expected: push succeeds. GitHub Actions will pick up the push and deploy.

- [ ] **Step 3: Verify deployment triggered**

Run (if `gh` CLI is installed):
```bash
gh run list --branch main --limit 1
```

Expected: most recent run is for the commit just pushed, status `queued` or `in_progress`. You do not need to wait for it to complete — if the build passed locally in Task 1 Step 10 and Task 2 Step 9, it will pass on CI.

If `gh` is not installed, skip this step. The push itself is the only action required; GitHub Pages will deploy automatically.

If the user wants to verify the live site, suggest:
```
Deployed (CI building). Live URL in ~2 min: https://blog.michaelzuo.vip/your-llm-is-always-telling-you-a-story
```
