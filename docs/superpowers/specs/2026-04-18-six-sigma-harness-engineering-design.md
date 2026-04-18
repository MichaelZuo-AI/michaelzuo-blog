# Spec: "六西格玛管得住 AI 的手吗?"

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

Target length: **1800–2200 字**. Matches the mid-length register of recent posts. Thinking-out-loud posture — not a long-form manifesto.

### Frontmatter

```
---
title: "六西格玛管得住 AI 的手吗?"
date: "2026-04-18"
spoiler: "prompt engineering 是均值工具。收窄分布需要另一套工具——来自生产线的那一套。"
---
```

### Section 1 — Cold open (no H2; opens the post)

**Constraints:**
- ~220–270 字, tight.
- First person (*"过去两个月我密切和 Claude Code 一起工作……"*).
- Three beats, in order:
  1. The observation: 同样的输入、同样的 prompt,不同 run,质量分布从很差到很好。
  2. The frustration: prompt engineering 不管怎么打磨,都没有把这个分布收窄。
  3. The pivot: 也许 prompt engineering 本来就不是收窄分布的工具 — 它提升均值,但变异本身需要另一套方法。
- Ends on a turn into Shewhart's distinction, setting up Section 2.

### Section 2 — `## 你一直在把共因当特殊因处理`

**Constraints:**
- ~200–250 字.
- Walter Shewhart 1920s — SPC 的起点。*共因变异*(过程设计里烘焙好的)vs *特殊因变异*(可归咎于某次具体事件的)。
- Key assertion: 我们对 AI 不满意时的默认反应——重跑、改 prompt 再试——是把共因当成特殊因处理的反射。大多数"这次 AI 没理解我"其实是每次都在发生的东西。
- No new scenarios. Reference the anchor observation if needed.
- Lands on: 如果要收窄分布,我们需要的不是"这次运气怎么这么差"的语言,是"这套过程本身能力如何"的语言。这是 Six Sigma 的语言。

### Section 3 — `## Six Sigma 的真正内核不是消灭 bug`

**Constraints:**
- ~200–250 字.
- 快速讲清 Six Sigma 的数学内核:
  - 名字本身就是讲标准差——±6σ 要装进规格边界内。
  - 3.4 DPMO 是从这个几何关系推出来的,不是凭空的目标。
  - 所有工具(控制图、Cpk、DOE)都围绕"测量 σ、缩小 σ"展开。
- 落点:*缺陷 = 变异本身*。规格边界 = 可接受的落地 + 可接受的风格。
- 一句话把 harness engineering 重新命名成 *"过程能力提升"*。
- Section 末尾:简化版表格亮一次(只有来源 + 典型症状两列),吊出第 4 节的分解。

### Section 4 — `## 把变异分解成来源`

**Constraints:**
- ~900–1100 字. 主体。
- 5 个子节,每节以 h3 (`###`) 标题起头。
- 每节 150–200 字,除 4.5 (需求落地变异) 单独给 300 字展开——这是整篇 post 最戏剧性的一行,也是全篇最能为 stance B (公开实验) 铺路的一行。

**子节结构:**

#### `### 模型随机性`
- 症状:同 prompt 不同 run 结果波动。
- 最容易被承认是变异的一类,但在"真实痛点"里占比往往被高估。
- Harness 层杠杆:温度、采样策略、K-of-N 投票。
- 一句关于 "K-of-N 在代码任务里是否真的成立" 的怀疑,埋下 Section 5 的钩子。

#### `### 输入变异`
- 症状:prompt 表述飘移、context 被无关信息污染。
- Harness 层杠杆:prompt 模板化、context 裁剪、最小必要上下文。
- 这一类是 prompt engineering 社区已经在做的事——Six Sigma 视角只是给它换一个更严谨的名字(输入稳定性)。

#### `### 过程变异`
- 症状:agent loop 分支路径不同、工具调用失败、同任务走出完全不同的执行轨迹。
- Harness 层杠杆:流程收敛、工具白名单、验证 gate。
- 一句关于 "收敛流程是否会在压变异的同时压掉能力" 的怀疑,埋下 Section 5 的钩子。

#### `### 格式/风格变异`
- 症状:同一任务不同架构风格、格式飘移。
- Harness 层杠杆:Linter、Validator、Schema 约束、再生策略。
- 最"机械"的一类——这类变异其实已经被工程化,只是大家没给它一个 Six Sigma 的名字。

#### `### 需求落地变异`(关键,~300 字)
- 症状:代码没按需求实现、feature 不可用、bug 扎堆、"看起来像在做这件事但其实没做"。
- 这是 Section 2 的 "共因 vs 特殊因" 戏剧性最强的一行——最容易被当特殊因处理("这次 AI 没理解我,再说一遍"),但其实是 harness 设计里*没有强制把规格以可验证形式带进流程*的必然输出。
- Harness 层杠杆:规格前置(spec/AC 进 prompt)、plan-before-code、TDD 式"测试即规格"、验证 gate(跑测试 / LLM-as-judge 对照规格)、双 agent 交叉校验。
- 一句关于 "LLM-based verification 本身就是高变异工具,用它去压变异合不合理" 的怀疑,埋下 Section 5 的钩子。

**子节结束后:** 贴一次完整版表格(三列:来源 / 症状 / 杠杆),同时对即将在 Section 5 标出的 3 条"最怀疑"加粗。

### Section 5 — `## 我最怀疑的三条假设`

**Constraints:**
- ~280–330 字.
- Stance B 的诚实落脚:不做方法论宣言,只把自己最没把握的 3 条摊开来。
- 每条 80–110 字,标题用一句话总结假设本身,然后用 1-2 句说为什么可疑。

**三条(已选,待 user 审):**

1. **"LLM-based 验证 gate 能收窄需求落地变异。"**(Row 5)
   验证器本身就是高变异的 LLM。用一个变异高的工具去压另一个变异高的工具,很可能只是把变异从 A 搬到 B。Six Sigma 有一个前置步骤叫 *测量系统分析*(MSA)——测量工具自己的分辨率要比被测过程的变异小一个量级,否则控制图读出来的都是测量噪声。LLM-as-judge 可能连这个门槛都没过。

2. **"K-of-N 采样能降低代码输出变异。"**(Row 1)
   K-of-N 对有"标准答案"的任务(数学、分类)有效。但代码任务里,很多条都"对",选哪条是最佳?你需要一个仲裁器——又踢回到假设 1 的坑里。而且 K-of-N 在代码任务上的经验证据远比在数学任务上弱。

3. **"流程收敛能在不损失能力的前提下压过程变异。"**(Row 3)
   Agent loop 会产生变异,恰恰是因为模型在每一步自主选分支——而分支本身就是它解决陌生问题的能力来源。过度收敛把变异压下去,可能同时把能力也压下去。Six Sigma 语言里这叫 *process stability vs process capability* 的张力。只优化稳定性,等于把 harness 训练成一个更笨的工程师。

### Section 6 — Closing (standalone)

**Constraints:**
- ~130–180 字.
- 不引用前两篇 post。
- Builds to a short bolded final sentence.
- 合拢 stance B:这是设计,不是结论。接下来会在我自己的 harness 里对每一条变异来源跑 1-2 个最小干预,过几周回来报告哪条假设活下来。
- 避免"方法论布道"腔,保留思考过程的诚实感。

**Primary landing line candidates** (pick at drafting time, lock the sharpest):
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

## Bilingual note

This post ships **Chinese-only for the initial release**. The English version is deferred — pending either the follow-up (post-experiment) post generating sufficient English-reader interest, or a later translation pass.

**Implementation caveat (flag for author at publish time):** The blog convention pairs `[slug].md` (EN) with `[slug].zh.md` (ZH). If `src/lib/posts.ts` requires the EN counterpart to exist for routing, options:
- (a) ship the ZH content as `[slug].md` initially (breaks the EN-first convention for this post only),
- (b) write a minimal EN version at publish time to satisfy the pairing,
- (c) verify posts.ts actually requires the pairing — if it does not, ship `[slug].zh.md` standalone.

Decision deferred to implementation phase.

## Filename convention

Slug: `six-sigma-for-harness-engineering`

Primary file (per bilingual decision above):
- `content/six-sigma-for-harness-engineering.zh.md` — Chinese (this release)

Deferred:
- `content/six-sigma-for-harness-engineering.md` — English (post-experiment or translation pass)

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
