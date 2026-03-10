---
title: "E2E Automated Frontend Development"
date: "2026-03-10"
spoiler: "A system that takes Figma designs and produces production-ready, tested, accessible frontend code."
---

## Problem: Why Is Frontend Still Manual?

Backend development has largely embraced AI-generated code. Given a schema, an API spec, or a set of business rules, tools like Claude Code can produce working backend services — tests included — with minimal human intervention. This is already happening in production.

Frontend, especially mobile, hasn't caught up. Why?

- **Visual fidelity is hard to verify programmatically.** Backend correctness is binary (tests pass or fail). Frontend correctness is visual — "does it look right?" has traditionally required human eyes.
- **Design-to-code translation is lossy.** Designers work in Figma. Engineers interpret screenshots and rebuild in code. Every handoff introduces drift.
- **Responsive behavior multiplies the problem.** One component × 3 breakpoints × multiple states = dozens of visual variants to get right.
- **No structured contract between design and code.** Backend has OpenAPI specs, database schemas, type systems. Frontend has... a Figma link and a Slack message saying "this looks off."

The result: frontend remains the bottleneck. Engineers spend days on pixel-pushing work that could be automated — if the inputs were structured and the verification was automated.

## Solution

**Figma designs flow directly into production-ready frontend code.** Designers work in Figma. AI generates the implementation. Humans only review and accept.

![FE Automation System](/diagrams/fe-automation-system.svg)

The system has three layers: structured input, AI generation, and automated verification.

## How It Works

### Layer 1: Structured Input

Two inputs feed the generation layer: **Figma extractions** and **lightweight specs**.

**From Figma**, three things are extracted automatically:

1. **Design tokens** — Figma Variables → `tokens.ts` via REST API. Colors, spacing, typography become TypeScript constants. No hardcoded values anywhere in the codebase.

```typescript
// Auto-generated from Figma — do not edit
export const tokens = {
  color: {
    primary: '#2563EB',
    error: '#DC2626',
    text: { primary: '#111827', secondary: '#6B7280' },
  },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  radius: { sm: '4px', md: '8px', lg: '16px', full: '9999px' },
} as const;
```

2. **Markup skeleton** — Figma-to-Code plugin exports frames as raw Tailwind HTML. Structural starting point, not production code.

3. **Reference screenshots** — Figma REST API exports frame images. These become the visual regression baseline.

**From engineers**, lightweight specs define behavior — not implementation:

```markdown
## SearchBar
Props: placeholder (string), onSearch ((q: string) => void), debounceMs (number)
States: idle → typing → loading → results | error | empty
Accessibility: role=search, aria-label on input, aria-live on results
```

An engineer writes a spec in ~30 minutes per screen. No code, just structured requirements.

This only works if Figma files follow a contract: Auto Layout on all frames, Variables for design tokens, meaningful layer names, breakpoint variants (375px, 768px, 1440px). Garbage in = garbage out.

### Layer 2: AI Generation

Claude Code receives tokens + markup + screenshots + specs and produces production components.

![Claude Code Input/Output](/diagrams/claude-code-io.svg)

Rules enforced via `CLAUDE.md`:
- All styling must reference `tokens.ts` — no hardcoded values
- Every component gets a test file and a Storybook story
- Tests are written before implementation (TDD)
- Components must pass a11y checks (ARIA, keyboard nav, screen reader)
- Responsive behavior must match spec breakpoints

**Self-correction loop:** If tests fail, Claude reads the error, fixes the code, and retries — up to 10 iterations before escalating to a human. If that fails, it decomposes the task into smaller pieces and retries each.

### Layer 3: Automated Verification

Seven gates run on every commit. All must pass before human review.

![Verification Pipeline](/diagrams/verification-pipeline.svg)

The key gate is **visual regression**: Playwright renders each component at 3 viewports, takes screenshots, and compares against Figma reference images. This closes the loop — the system can now verify visual fidelity programmatically, which is exactly what made frontend automation hard in the first place.

Human review is scoped to two things only:
1. **Storybook review** — Does it look right across all states?
2. **Diff review** — Is the code clean?

No need to run the app locally, check responsive behavior manually, run tests, or audit accessibility. The pipeline already did all of that.

## End-to-End Flow

![End-to-End Flow](/diagrams/e2e-flow.svg)

## Tech Stack

| Layer | Tool | Role |
|-------|------|------|
| Design | Figma | Single source of design truth |
| Extraction | Figma REST API + Figma-to-Code | Tokens, markup, screenshots |
| Code generation | Claude Code | Specs + tokens + markup → production components |
| Framework | Next.js (App Router) | File-based routing, minimal wiring |
| Styling | Tailwind CSS | Utility classes, constrained by tokens |
| UI primitives | Radix UI / shadcn/ui | Accessible, composable components |
| Testing | Vitest + Playwright | Unit tests + E2E + visual regression |
| Accessibility | axe-core + eslint-plugin-jsx-a11y | Automated a11y audit |
| Review | Storybook | Isolated visual review for all states |
| CI | GitHub Actions | Run 7 verification gates |

## What's Proven, What's Next

**Already working in production:**
- Claude Code generating React components from specs (MewtwoAI: 747 tests, FinancialAssistant: 51 tests)
- TDD with Claude (tests first, then implementation)
- Automated verification pipeline (typecheck + lint + test + build)
- Figma REST API token extraction

**Needs building (~1-2 weeks):**
- Visual regression with Figma screenshots as baseline (Playwright screenshot comparison, threshold tuning)
- Figma token sync script (REST API call + JSON transform)
- CI pipeline with all 7 gates
- Designer workflow guide (structured Figma files are the contract)

**Open question:** Will designers adopt the structured Figma discipline? The pitch: "your designs get built accurately, every time." The risk: adoption friction. This is the single biggest non-technical dependency.
