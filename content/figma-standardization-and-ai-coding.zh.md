---
title: "如何用 Engineering 手段降低 AI 对 Figma 标准化的依赖"
date: "2026-03-15"
spoiler: "不要求设计师改变工作方式，而是在 Engineering 层消化 Figma 的不规范性。"
---

> 场景：输入 Figma 文件，由 Claude Code 自动输出 PR

## 引言

在大型互联网公司，**标准统一是一件成本极大的事情**。

具体到 Designer 团队的场景，由于各团队各自为战、缺乏统筹，生产出的 Figma 文件标准化程度普遍偏低——组件命名混乱、样式 hardcode、布局依赖手动拖拽，是常态而非例外。

在人类主导 Coding 的时代，这个问题由 Engineer 用经验来消化：凭借自身对设计系统的理解，在脑中完成 Figma component 到 code 的映射，再辅以与 Designer 的多轮沟通，最终落地实现。这个过程低效，但人类的理解力和沟通能力掩盖了设计侧的不规范。

**但在 AI Autonomous Coding 的时代，这个缓冲层消失了。**

AI 并非没有上下文——通过 memory、codebase context、CLAUDE.md 等机制，它已经能积累对项目的理解。真正缺失的是**实时协商歧义的能力**：人类工程师看到一个奇怪的 Figma frame，会直接 Slack 设计师确认意图；AI 只能基于当前信号做出最优猜测，无法发起多轮对话来消除不确定性。

这意味着 Figma 的标准化程度，开始以一种前所未有的直接方式，影响最终 Code 的输出质量——因为 AI 没有人类那个「遇到歧义就去问一嘴」的兜底手段。

这带来两个核心问题：

1. **Figma 的标准化程度，对 AI Code output 的影响权重到底有多大？** 哪些维度是关键变量，哪些影响可以忽略？
2. **如何用工程化手段降低 AI 对 Figma 标准化的依赖？** 让 pipeline 对不规范的 Figma 输入依然能产出高质量的 PR。

## Part 1：问题诊断 — Figma 标准化对输出质量的影响权重

### 1.1 信号链拆解

![信号链：Figma + One-pager → Claude Code → PR](/diagrams/figma-signal-chain.svg)

两个输入的**信号类型根本不同**：

| 输入源 | 信号类型 | 影响域 |
|--------|----------|--------|
| Figma | 结构性、视觉性 | Component 树、样式、布局 |
| One-pager | 语义性、意图性 | 业务逻辑、交互流、状态管理 |

两者的关系不是互补，而是**互相校验**：Figma 告诉 AI「UI 长什么样」，One-pager 告诉 AI「这个 UI 要干什么」。当 Figma 命名混乱时，One-pager 中的业务术语可以反向帮助推断组件意图（例如 One-pager 提到「用户提交表单」，那个叫 `Rectangle 247` 的蓝色按钮大概率是 Submit Button）。这个交叉校验能力将在 Part 2 的 Semantic IR 层中被具体利用。

### 1.2 Figma 数据进入 Claude Code 的路径

标准化的影响程度**首先取决于 ingestion 方式**：

**路径 A：Figma MCP / Dev Mode API（最强信号）**

```json
{
  "name": "Button/Primary/Large",
  "fills": [{"color": {"r":0.2,"g":0.5}}],
  "autoLayout": {"direction": "HORIZONTAL", "spacing": 8},
  "componentProperties": {
    "label": {"type": "TEXT"},
    "disabled": {"type": "BOOLEAN"}
  }
}
```

**路径 B：截图 + Vision（最弱信号）**

```
PNG → Claude Vision → 推断布局意图
# 丢失了：token、组件层级、约束关系、响应式规则
```

**路径 C：Design Tokens Export（中等，专注样式）**

```json
{
  "color": {"primary": {"value": "#3B82F6"}},
  "spacing": {"4": {"value": "16px"}}
}
```

> **路径决定了标准化的价值上限**——如果用路径 B，Figma 再规范也损失严重。

### 1.3 Figma 标准化各维度的影响权重

**组件命名规范 — 权重：最高**

```
非规范：btn_v3_FINAL_use_this / Rectangle 247
规范：  Button/Primary/Large
```

```tsx
// "Button/Primary/Large" → <Button variant="primary" size="lg" />  ✅
// "Rectangle 247"        → <div style={{...}}>  ???               ❌
```

命名是**语义桥梁**。命名混乱意味着 Claude 无法做组件映射，退化为重新生成裸 div，破坏设计系统的复用性。

**Design Token 使用 vs Hardcode — 权重：高**

```
非规范：fill = #3B82F6
规范：  fill = color/brand/primary/500
```

```tsx
// Hardcode → 生成的代码
<div style={{ backgroundColor: '#3B82F6' }} />   // 技术正确，工程错误

// Token → 生成的代码
<div className="bg-brand-primary-500" />          // 对接设计系统 ✅
```

Token 化程度直接决定生成代码是否能与设计系统**长期维护**，是技术债的核心来源。

**Auto Layout 使用 — 权重：高**

```
非规范：手动拖拽定位，absolute position
规范：  Auto Layout + Constraints
```

```
Auto Layout (Horizontal, gap=16, padding=8)
       ↓  Claude Code 的翻译是确定性的
display: flex; flex-direction: row; gap: 16px; padding: 8px;  ✅

手动定位 x=120, y=48
       ↓  Claude 必须推断意图
position: absolute; left: 120px; top: 48px;  // 几乎肯定是错的  ❌
```

响应式布局的可生成性**完全依赖** Auto Layout 的使用。

**组件 Variants 结构 — 权重：中**

```
非规范：Button_disabled, Button_hover, Button_active（独立 frame）
规范：  Button 组件 + Variants: {state: default|hover|disabled|active}
```

```tsx
// 规范 Variants →
interface ButtonProps {
  state: 'default' | 'hover' | 'disabled' | 'active'  // ✅ 直接映射
}
// 独立 Frame → Claude 可能生成多个独立组件，或者猜错 prop 结构  ❌
```

**层级组织与 Annotation — 权重：低**

相对影响较低，但对复杂页面的**代码组织结构**（哪些 div 应该拆成子组件）有影响。

### 1.4 标准化的最低门槛（Minimum Viable Standard）

```
Must Have（影响 pipeline 是否可行）
├── 组件命名语义化（匹配代码库组件名）
├── Auto Layout（非 absolute 定位）
└── 关键颜色/间距 token 化

Should Have（影响输出质量）
├── Variants 结构化
├── 组件 Descriptions / Annotation
└── 响应式 Constraints 设置

Nice to Have（影响精细度）
├── 完整的 Component Properties
└── Interaction / Prototype 定义
```

## Part 2：Engineering 解法 — 改良 Pipeline 降低标准化依赖

### 2.1 问题根源重新定位

```
当前痛点的本质不是 Figma 不规范
而是 pipeline 把 Figma 的原始信号直接喂给 Claude Code
缺少了一个「信号清洗 + 语义提升」的中间层
```

```
现状（脆弱）：
Figma Raw → Claude Code → PR
              ↑ 对输入质量强依赖

目标（健壮）：
Figma Raw → [Normalization Layer] → Semantic IR → Claude Code → PR
              ↑ 在这里消化不规范性
```

### 2.2 核心改良：插入 Semantic IR 层

引入一个 **Figma-agnostic 的中间表示（IR）**，将 Figma 的原始结构翻译成对 Claude Code 友好的语义描述，与 Figma 是否规范解耦。

```
┌─────────────────────────────────────────────────────────────┐
│                   Semantic IR (中间表示)                     │
│                                                              │
│  {                                                           │
│    component: "Button",          ← 语义名，非 Figma 原名    │
│    intent: "primary CTA",        ← 推断出的意图              │
│    businessContext: "form submit action",  ← 来自 One-pager │
│    layout: "flex-row gap-4",     ← 标准化后的布局描述        │
│    tokens: { bg: "brand.500" },  ← token 或 fallback hex    │
│    variants: ["default","disabled"], ← 合并碎片 frame       │
│    a11y: { role: "button" }      ← 补全的语义信息            │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
```

这一层的职责是**吸收 Figma 的混乱，输出结构化的确定性**。注意 `businessContext` 字段——这是 One-pager 的语义信号注入点。当 Figma 结构信号不足时（如命名混乱），Normalization Agent 会用 One-pager 中的业务描述来交叉验证和补全组件意图。

### 2.3 具体改良策略

**策略 1：Figma 预处理 Agent（命名修复）**

专门解决命名混乱问题，用一个轻量 LLM pass 做语义推断：

```python
def normalize_component_name(node, onepager_context=None):
    context = {
        "raw_name": node.name,            # "btn_v3_FINAL"
        "visual_properties": node.fills,   # 蓝色填充、圆角
        "children": node.children,         # 含 Text "Submit"
        "parent_context": node.parent,     # 在 Form 里
        "business_hints": onepager_context # One-pager 提到 "提交订单按钮"
    }
    # business_hints 在 raw_name 无法识别时提供额外信号
    # → 推断出 "Button/Primary"，confidence=0.92
```

**关键设计**：输出 confidence score。低于阈值的节点标记为 `needs_review`，触发后续人工确认或 fallback 策略。

**策略 2：Visual Grounding 补充结构信息**

对于 absolute 定位等无法从 JSON 推断的情况，**主动结合截图**：

```python
def resolve_layout(json_node, screenshot_region):
    json_layout = parse_json_layout(json_node)
    vision_layout = infer_layout_from_image(screenshot_region)

    if json_layout.type == "AUTO_LAYOUT":
        return json_layout                           # JSON 可信，直接用
    elif vision_layout.confidence > 0.85:
        return vision_layout                         # 截图推断补位
    else:
        return LayoutIntent.UNKNOWN                  # 标记待审
```

这样 Auto Layout 用不用都不成为 blocker。

**策略 3：Component Registry（与代码库对齐）**

不要让 Claude Code 从 Figma 名字猜组件，**主动建立 Figma → Codebase 的映射表**：

```yaml
# component-registry.yaml
mappings:
  - figma_patterns: ["btn*", "button*", "*Button*", "Rectangle*蓝色*"]
    code_component: "Button"
    props_map:
      fill_blue: "variant=primary"
      fill_gray: "variant=secondary"
      opacity_50: "disabled=true"

  - figma_patterns: ["input*", "text_field*", "*Input*"]
    code_component: "TextInput"
```

```python
def match_component(figma_node, registry):
    candidates = [
        match_by_name_pattern(figma_node, registry),      # 权重 0.5
        match_by_visual_signature(figma_node, registry),  # 权重 0.3
        match_by_children_structure(figma_node, registry) # 权重 0.2
    ]
    return weighted_vote(candidates)
```

这把对设计师命名规范的依赖，转移到了一个**可维护的工程配置**上。

> **维护成本的诚实评估**：Registry 并非「一次性建立就完事」。设计系统在持续演进——新组件上线、旧组件 deprecate、团队 fork 出变体。实际运营中需要：(1) 每次设计系统发版时同步更新 Registry；(2) pipeline 输出中未匹配的节点定期回顾，补充新 pattern。建议由 Design System 团队 own 这份配置，作为设计系统 deliverable 的一部分。ROI 依然是所有策略中最高的，但需要建立明确的 ownership 和更新 cadence。

**策略 4：Variants 碎片合并**

把散落的独立 frame（非规范）自动合并成 Variants 结构：

```python
def merge_variants(frames: List[FigmaFrame]) -> Component:
    """
    输入：[Button_default, Button_hover, Button_disabled, Button_active]
    输出：Button { variants: [default, hover, disabled, active] }
    """
    # 1. 聚类：按视觉相似度 + 命名相似度分组
    groups = cluster_by_similarity(frames, threshold=0.85)

    # 2. 提取差异：找出组内变化的属性
    for group in groups:
        diff = extract_visual_diff(group.base, group.variants)
        # → 发现 fill color 和 opacity 在变化
        # → 推断这是 state variant，而非 size variant

    # 3. 生成标准 Variants 结构
    return ComponentVariants(
        base=group.base,
        variant_dimension="state",
        values=["default", "hover", "disabled", "active"]
    )
```

**策略 5：Token 反向推断（Hardcode → Token）**

即使设计师用了 hardcode 颜色，也能**反查 token**：

```python
def resolve_token(hex_value: str, token_registry: dict) -> str:
    # 精确匹配
    if hex_value in token_registry:
        return token_registry[hex_value]

    # 近似匹配（设计师手误偏差在 5% 以内）
    closest = find_closest_token(hex_value, token_registry, tolerance=0.05)
    if closest.distance < tolerance:
        return closest.token  # 附带警告 log

    # 无法匹配 → 生成 CSS variable 并标记为 new token candidate
    return f"var(--color-unknown-{hex_to_id(hex_value)})"
```

### 2.4 改良后的完整 Pipeline

![Normalization Pipeline with Feedback Loop](/diagrams/figma-normalization-pipeline.svg)

### 2.5 Confidence Gate 设计

```python
class ConfidenceGate:
    THRESHOLDS = {
        "component_match": 0.80,
        "layout_inference": 0.75,
        "token_resolution": 0.70,
    }

    def process(self, ir_node):
        if ir_node.confidence > self.THRESHOLDS[ir_node.type]:
            return Action.PROCEED

        elif ir_node.confidence > 0.50:
            return Action.ASK_CLARIFICATION(
                question=self.generate_question(ir_node),
                fallback=ir_node.best_guess
            )

        else:
            return Action.USE_GENERIC_FALLBACK(
                comment=f"// TODO: Verify component intent - {ir_node.raw_name}"
            )
```

**核心思想**：不确定的地方不猜测，而是**降级到安全输出 + 显式标记**，让 PR reviewer 能快速定位需要人工判断的点。

### 2.6 改良效果预估

> **声明**：以下数据为方向性估算，基于对内部 3 个业务线共 ~20 个 Figma 文件的人工分析（评估标准：生成的 PR 中有多少组件无需人工修改即可合入）。精确数据需要在 pilot 阶段通过 A/B 对照实验验证。

| Figma 规范程度 | 改良前 PR 质量 | 改良后 PR 质量（预估） | 人工修改量 |
|--------------|-------------|-------------|----------|
| 规范（设计系统齐全） | ~90% | ~95% | 极少 |
| 中等规范（部分 token） | ~60% | ~80% | 少量 |
| 低规范（随意命名） | ~25% | ~65% | 中等 |
| 极差（全 absolute） | ~10% | ~45% | 较多 |

改良的本质：把 Figma 质量对输出的影响曲线从**线性**变为**对数型**——低规范度下增益最大，高规范度下增益收敛。验证这个假设本身就是 pilot 的核心目标之一。

### 2.7 Feedback Loop：从工具到飞轮

上述 pipeline 是单向的——Figma 进，PR 出。但真正的杠杆在于**让 pipeline 从每次 PR review 中学习**。

```
PR merged with changes
       ↓
Diff Analysis: reviewer 改了什么？
       ↓
┌──────────────────────────────────────────┐
│  分类回流                                  │
│                                            │
│  • 组件被替换 → 更新 Component Registry    │
│  • 样式被改 → 补充 Token 映射              │
│  • 布局被重写 → 调整 Layout 推断权重       │
│  • TODO 被解决 → 降低该模式的 confidence   │
│    阈值（下次可以更大胆地猜）               │
└──────────────────────────────────────────┘
```

**实现方式**：在 PR merge 后跑一个轻量 diff analysis job，将 reviewer 的修改分类，自动生成 Registry 更新建议（人工 approve 后生效）。

这把 pipeline 从一个「需要维护的工具」变成一个「越用越准的飞轮」——每个被 review 过的 PR 都在改善下一个 PR 的质量。

### 2.8 实施优先级

1. **Component Registry + 命名匹配** — ROI 最高，覆盖 80% 的命名混乱问题
2. **Token 反向推断** — 消除 hardcode 样式的长期技术债
3. **Confidence Gate + 降级机制** — 让 pipeline 对任意输入都能稳定输出
4. **Vision Grounding（布局补充）** — 成本较高，针对 absolute 定位重度用户

## 总结

不要求设计师改变工作方式，而是在 Engineering 层消化不规范性。

```
Figma Raw ──┐
             ├→ [Normalization Agent] → Semantic IR → [Confidence Gate] → Claude Code → PR
One-pager ──┘                                                                          │
                                                                                       ↓
                              ← ← ← ← ← [Feedback Loop] ← ← ← ← ← ← ← PR Review ←┘
```

| 策略 | 解决的问题 | 实施成本 | 维护成本 | ROI |
|------|----------|---------|---------|-----|
| Component Registry | 命名混乱 | 低 | 中（需随设计系统同步） | 极高 |
| Token 反向推断 | Hardcode 颜色 | 低 | 低 | 高 |
| Variants 碎片合并 | 独立 frame | 中 | 低 | 高 |
| Confidence Gate | 不确定性管理 | 中 | 低 | 高 |
| Feedback Loop | Pipeline 退化 | 中 | 自动化 | 高（长期） |
| Visual Grounding | Absolute 定位 | 高 | 低 | 中 |

这套架构的本质是一个认知转换：Figma 标准化不是 0 或 1 的问题，而是一个可以被工程化手段压缩的连续频谱。Normalization Layer 不消除混乱，而是把混乱的影响从线性降为对数——让 pipeline 在任意输入质量下都能产出可用的输出，同时通过 Feedback Loop 持续逼近最优。
