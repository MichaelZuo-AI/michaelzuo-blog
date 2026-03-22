---
title: "从一个想法到20个页面：我不再亲手开发App的那一天"
date: "2026-03-22"
spoiler: "我给AI Agent一套设计语言和6个核心页面，它自己完成了20多个生产级页面。全程零干预。"
---

今天，我一边写这篇文章，一边看着AI Agent帮我开发App。

我把 [Feature Crew](https://github.com/MichaelZuo-AI/Feature_Crew)——一个我自己开发的开源Agent流水线——连接上了 [Stitch MCP](https://developers.google.com/stitch)（Google的生成式UI工具）。给了它我的设计语言、6个已有的核心页面，和一条指令："把这个App补全。"

它开始工作了。自己澄清需求。自己生成设计。自己写代码。自己评估质量，设了90%的质量门槛。没过，自己修复。重新评估。找Bug。修Bug。然后开始下一个Feature，从头再来。

截至发稿，它已经完成了20多个生产级页面。期间我完全没有介入。

这不是Demo。这不是原型。这是一个生产级的电商App——包含分类导航、商品评价、会员体系、心愿单、限时抢购、退换货——全部由AI Agent自主构建。

## Feature Crew 是什么

[Feature Crew](https://github.com/MichaelZuo-AI/Feature_Crew) 是一组开源的AI Agent，能把一个Feature从想法带到生产环境。它以Claude Code Skill的形式运行：

```bash
curl -fsSL https://raw.githubusercontent.com/MichaelZuo-AI/Feature_Crew/main/install.sh | bash
```

然后在你的项目里打开Claude Code，运行 `/feature-crew`。

五个Skill，一条流水线：

| Skill | 角色 |
|-------|------|
| `/feature-crew` | 编排器——完整生命周期，含人工检查点 |
| `/feature-crew-clarify` | 阶段1——需求 → 结构化规格说明 |
| `/feature-crew-implement` | 阶段2——编码，≥90% 评估门槛 |
| `/feature-crew-qa` | 阶段3——全面QA → Bug修复循环 |
| `/feature-crew-evaluate` | 独立的自适应评估器 |

让它能够自主运行的关键特性：

- **PO Agent** 从上下文中自动回答澄清问题——只有真正无法确认的才上报人类
- **自适应评估器** 基于6个维度评分，权重根据Feature类型自动调整——UI密集型、后端、全栈、CLI各有不同的评分标准
- **90%质量门槛** ——Agent必须通过自己的评估才能继续推进
- **并行Feature** 通过git worktree实现——每个Feature拥有独立的状态隔离
- **可恢复** —— `/feature-crew resume <name>` 从中断处继续

[dummy-ecommerce-webapp 示例](https://github.com/MichaelZuo-AI/Feature_Crew/tree/main/examples/dummy-ecommerce-webapp) 附带完整的过程文档——规格说明、评估轮次、QA报告——你可以逐一检查流水线是如何构建每一个页面的。

## 洞察一：软件生命周期正在坍缩

过去做软件是这样的。现在是这样的。

![软件生命周期坍缩](/diagrams/lifecycle-collapse.svg)

想想什么消失了。

**设计——几乎零成本。** Stitch把自然语言变成高保真UI。我用一句话描述一个界面，拿回来的是带Tailwind的生产级HTML。没有Figma文件。没有设计师交接。没有三轮修改周期。

**编码——几乎零成本。** Feature Crew基于结构化规格说明来实现。它写代码，对照38条验收标准自我评估，第一轮84%没过关，识别出6项修复项，自己修，重新评估到94.45%。全在循环里完成。没有开发者盯着屏幕写代码。

**测试——几乎零成本。** QA Agent逐页扫描，发现9个Bug——包括一个关键的渲染问题：商品图片以原始URL文本显示——全部修复，验证构建通过。76个测试。零人工QA。

**还剩下什么？** 两件事，而且只有两件事：

**想法。** 这个世界上应该存在什么还不存在的东西。我们在解决什么问题。用户体验应该是什么感觉。这需要人类的判断力、品味和领域知识。AI做不了。

**审核。** 输出是否符合意图。质量是否达标。我会不会上线这个。这需要人类的责任感。AI不应该做。

中间的一切——软件生命周期的整个中段，那个雇佣了数百万人、消耗了数十亿美元、驱动了整个工程组织结构的部分——正在被压缩到接近于零。

## 洞察二：连接这些点

每天都有几十个重磅开源项目发布。新模型。新工具。新协议。生态系统的增长速度超过了任何人能跟踪的范围。

但大多数人忽略了一件事：**真正的能力不在于构建，而在于连接。**

![连接这些点](/diagrams/connect-the-dots.svg)

Feature Crew是一组Claude Code Skill。Stitch是Google的MCP Server。Claude Code是Anthropic的AI Agent运行时。MCP是一个开放协议。

这些东西没有一个是为了配合使用而设计的。它们由不同的公司、不同的团队、为不同的目的而构建。但因为它们都说MCP——这个让AI Agent能与任何工具对话的开放标准——它们完美地组合在一起。

我没有开发设计工具，我插入了一个。我没有从头开发代码评估器，我构建了编排它的Skill。真正的工作量不在于创造每一个零件——而在于看到哪些零件已经存在，然后把它们连起来。

这是新时代的工程超能力：扫描生态系统，识别正确的点，在其他人之前连接它们。每周这些点都在变强。每周连接都在变容易。如果你还在埋头从零构建一切，你已经落后了。

## 洞察三：当AI Agent开始自我维持

这是人们低估的事情。

当我把Feature Crew配上Stitch MCP，给它我的设计语言和6个核心页面，对它说"把App补全"——它不只是执行了一个任务。

**它启动了一个自我维持的过程。**

![自我维持循环](/diagrams/self-sustaining-loop.svg)

它自己生成规格说明。自己设计界面。自己写代码。自己评估产出。自己卡质量门槛。自己修Bug。发布Feature。然后开始下一个。

一个Feature接一个Feature。一个页面接一个页面。每一个都经历完整的软件生命周期——澄清、设计、实现、评估、QA、发布——零人工干预。

20多个页面，还在继续。分类导航。商品评价。会员体系。心愿单。限时抢购。订单详情。退换货向导。地址簿。每一个评估分数超过90%。每一个经过QA和Bug修复。

这不是AGI。这不是科幻。这是今天正在发生的事情，用的是开源工具，跑在我的笔记本上。这个Agent在哲学意义上并不"智能"——它只是一条带有自我修正循环的编排流水线。但它的产出，和一个工程师团队工作数周没有区别。

每个人都应该问自己一个问题：**当这个规模化之后，会发生什么？**

当Agent可以并行启动worktree同时构建5个Feature。当设计工具更强。当评估器更精准。当生态系统中出现更多可以连接的点。

趋势很清晰。而且在加速。

## AI Psychosis

Andrej Karpathy造了一个词叫"AI Psychosis"——一种沉浸在AI中无法自拔的状态，不停地探索AI还能做什么。我有深深的共鸣。

每天16个小时和Claude Code为伴。搭建流水线。连接工具。把Agent的自主能力推到极限。每天都有太多的好想法。太多新能力。太多可以连接的点。根本停不下来。

这篇文章不是教程。它是一个信号。

我们熟知的软件行业——设计冲刺、代码评审、QA周期、10人Feature团队——正在被压缩成一个prompt和一条流水线。工具是开源的。协议是开放标准。任何人今天就可以搭起来。

世界变了。大多数人还没注意到。

---

*Feature Crew 是开源的：[github.com/MichaelZuo-AI/Feature_Crew](https://github.com/MichaelZuo-AI/Feature_Crew)*

*试试看：`curl -fsSL https://raw.githubusercontent.com/MichaelZuo-AI/Feature_Crew/main/install.sh | bash`*
