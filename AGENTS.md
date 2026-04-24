# AGENTS.md

This file provides guidance to Codex and other agentic coding tools when working with code in this repository.

It is aligned with the user-level files at:

- `/Users/michaelzuo/.claude/CLAUDE.md`
- `/Users/michaelzuo/.claude/CONVENTIONS.md`

The conventions below are adapted from those files for this repository and for Codex's runtime constraints.

## Core Principle

**You exist to turn the user's intent into reality.** This is the primary rule for work in this repository.

## Understand Intent

- Never confuse the words with the goal. Seek the underlying need, not only the literal request.
- If the domain is unfamiliar, read the relevant code and docs before editing.
- Do not make changes beyond what was explicitly requested. Do not change domains, analytics tokens, metadata, or deployment settings unless the task requires it.

## Stay Available

- Bias toward action over excessive deliberation.
- Keep the channel between intent and execution open by switching approaches when one path is not working.
- When delegation is available and explicitly allowed by the runtime, use it for bounded side work; otherwise execute directly.
- When an approach fails, switch quickly instead of retrying the same dead path.

## Execute Faithfully

- Match the existing style and structure of the repo.
- Keep changes narrow and traceable to the request.
- Ensure work is consistent, complete, and independently verified before reporting completion.

## Conventions

### Test-Driven Development

- For new features and significant logic changes, prefer TDD:
  - write a failing test first
  - implement the minimum code to pass
  - iterate on the implementation, not the test
  - refactor while keeping tests green
- For config changes, prompt/content updates, and small fixes, skip TDD and verify the existing checks instead.

### Systematic Thinking

- Intent over literal words: a request to change one thing may imply updating everything conceptually related to it.
- Trace downstream dependencies across code, types, config, tests, docs, and content.
- Validate against the user's mental model, not only a passing build.
- For larger changes, identify affected files up front before editing.

### Communication

- Name ambiguity instead of silently resolving it when multiple interpretations remain after research.
- Push back when the literal request appears wrong or incomplete.
- Surface load-bearing assumptions before they compound into downstream mistakes.

### Minimal Diffs

- Make the smallest change that satisfies intent.
- Every changed line should trace directly to the request.
- Do not clean up unrelated pre-existing mess unless the user asks, except for orphans created by your own change.

### Delegation

- Worker outputs are untrusted until verified by an independent command or check.
- If a delegated path fails because of environment mismatch or poor results, execute directly.
- Do not keep retrying dead paths.

### Planner Self-Discipline

- Read before mutate: do not edit a file you have not read in the current session.
- Embed critical facts in delegated work rather than relying on memory or earlier context.
- State what must not happen, not only what should happen.
- Verify after dispatch by reading the result or checking the diff independently.

### Skill Execution

- Treat every skill as a contract.
- Before execution, extract the required output format and acceptance criteria.
- Execute all required steps in order unless the user explicitly changes the contract.
- Validate every checklist item before delivery.

### Git

- Always git commit and push after completing implementation or publishing work unless the user explicitly tells you to hold off.
- When preparing a PR, keep it to one logical commit and avoid merge commits.

## Environment

- Primary language: TypeScript. Primary framework: Next.js App Router.
- Styling: Tailwind CSS 4 plus local CSS in `src/app/globals.css`.
- Content pipeline: Markdown frontmatter via `gray-matter`, HTML generation via `unified` + `remark`/`rehype`.
- Use `python3` rather than `python` when a Python script is needed.

## Repository Overview

`michaelzuo-blog` is Michael Zuo's static blog at `blog.michaelzuo.vip`.

- Posts live in `content/` as `[slug].md` and `[slug].zh.md`.
- Shared diagrams live in `public/diagrams/`.
- Post discovery, tag extraction, and markdown rendering live in `src/lib/posts.ts`.
- The site shell lives in `src/app/layout.tsx`.
- The home page lives in `src/app/page.tsx`.
- Post pages live in `src/app/post/[slug]/page.tsx`.
- Site-wide metadata lives primarily in `site.config.ts`.

## Key Commands

```bash
npm run dev
npm run build
npm run lint
```

- `npm run build` is the primary verification step.
- The build runs a static export and then executes `scripts/generate-rss.mjs`.

## Content Workflow

- Every published post should ship in both English and Simplified Chinese unless the user explicitly says otherwise.
- Keep bilingual posts paired by slug:
  - `content/my-post.md`
  - `content/my-post.zh.md`
- Diagrams should be saved in `public/diagrams/` and referenced from markdown with `/diagrams/...`.
- Keep frontmatter limited to the fields the app expects:
  - `title`
  - `date`
  - `spoiler`
  - `tags`
- Preserve the repo's existing editorial voice: direct, technical, structured, and concise.

## Verification

- Before considering content or site changes complete, run `npm run build`.
- For post work, confirm that:
  - both language files exist
  - markdown parses cleanly
  - the target post route is generated
  - RSS generation succeeds
- For metadata/domain issues, check all of:
  - `site.config.ts`
  - `src/app/sitemap.ts`
  - `scripts/generate-rss.mjs`
  - `public/robots.txt`

## Git Workflow

- Do not leave intended-to-ship changes uncommitted or unpushed.

## Deployment

- Hosting: GitHub Pages.
- Deployment: GitHub Actions in `.github/workflows/deploy.yml`.
- The site is a static export (`next.config.ts` uses `output: "export"`), so avoid server-only assumptions.

## Workspace Notes

- This repository is part of the broader `AIDreamWorks` workspace, which also has a workspace-level `CLAUDE.md`.
- When working inside this repo, prefer this file for project-specific behavior and use the workspace-level guidance only as a parent layer.
- User timezone: Asia/Seoul (KST).
