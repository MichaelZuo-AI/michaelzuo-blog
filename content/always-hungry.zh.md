---
title: "Always Hungry：让你的项目自我进化的模式"
date: "2026-03-29"
spoiler: "如果你的项目能自己观察开源社区、学习、然后升级自己呢？不需要你做任何事。"
---

只看自己，已经跟不上这个时代了。

AI 时代，开源生态的进化速度远超任何个人的追踪能力。你睡觉的时候，GitHub 上有更好的模式发布了。你没听说过的仓库里，出现了更干净的架构。你的项目和它「本可以成为的样子」之间的差距每天都在拉大——不是因为你的代码差，而是周围的世界在不停变好。

大多数「AI 代码改进」工具向内看——分析你的代码，建议重构。有用，但不够。最好的改进不是你从第一性原理推导出来的，而是别人已经想到并经过实战检验的。JSON-LD 结构化数据不是你能通过「重构」发现的，它是你看到别的项目这么做才学到的模式。

**你的项目需要向外看。** 持续观察生态系统，吸收有效的东西。

`/always-hungry` 是一个 Claude Code 技能，做的正是这件事。指向任何代码库，它会搜索开源社区中相关的模式，在你的代码上测试，然后合并通过验证的改动。全程自主。

## 自我进化循环

三个阶段。观察、实验、吸收。

![The Always Hungry Pipeline](/diagrams/always-hungry-pipeline.svg)

**侦察** — Agent 读你的 `CLAUDE.md`，构建项目画像，在 GitHub 上搜索你所在领域的仓库，按相关性分级。它记录看过的仓库，重复运行只发现新内容。

**评估** — 每个候选改进创建独立的 git 分支。Agent 应用改动，运行构建/测试。通过 → 保留。失败 → 删除分支，不留痕迹。你的测试套件就是免疫系统。

**应用** — 通过的候选合并到 `main`，提交信息指向源仓库。分支清理。状态更新。推送。

你回来时，项目已经进化了。

## 一次真实运行

写这篇文章前，我在这个博客上跑了 `/always-hungry`。

![Real Run: Scouting michaelzuo.vip](/diagrams/always-hungry-funnel.svg)

扫描 12 个仓库。5 个是上次之后新出现的。分级出 3 个候选。应用了 2 个：

**JSON-LD Article 结构化数据**（来自 [leerob/next-mdx-blog](https://github.com/leerob/next-mdx-blog)）— 用代码库中已有的元数据，给每篇文章加了 `BlogPosting` schema。搜索引擎现在能理解文章结构，展示富摘要。

**原生 Next.js sitemap.ts**（来自 [leerob/next-mdx-blog](https://github.com/leerob/next-mdx-blog)）— 用 Next.js 内置的 `app/sitemap.ts` 替换了一个 postbuild Node.js 脚本。类型安全，框架集成，旧脚本已删除。

一个候选（robots.ts）被放弃——Agent 检查后发现 `public/robots.txt` 已存在。两个应用的改动都独立通过了构建验证。

## 设计原则

- **向外看。** 改进来自真实仓库，不是 LLM 在真空中的推理。
- **不引入新依赖。** 项目吸收的是模式，不是包。
- **构建门控。** 每个改动必须通过测试套件。
- **有状态。** 记住看过什么，每次运行发现真正的新内容。
- **精准。** 只改目标文件。不重写。没有范围蔓延。

## 试试看

从 [GitHub](https://github.com/ai-awesome/skill-always-hungry) 获取，然后：

```
/always-hungry
```

项目读自己的 `CLAUDE.md`，构建身份，观察生态系统，做实验，吸收有效的东西。跑一次，或者每周跑一次。改进是累积的。

```
/always-hungry --scout-only    # 只观察，不实验
/always-hungry --dry-run       # 展示画像但不行动
/always-hungry --show-last-run # 查看上次学到了什么
```

## 更大的想法

我们习惯把软件当作我们构建和维护的东西。Always-hungry 把这个关系翻转了。项目通过持续从生态系统学习来进化自己。

世界在加速。你的项目也应该跟上——即使你没在看。

这才是重点。不是 agent 能写代码。而是**你的项目在你做别的事情的时候，从全世界学习**。