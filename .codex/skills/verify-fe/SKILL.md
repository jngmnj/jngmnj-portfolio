---
name: verify-fe
description: Use when validating frontend changes before commit or PR; chooses focused TypeScript, ESLint, build, diff, and status checks for this portfolio project.
---

# Verify FE

Use this skill before committing frontend changes.

## Verification

1. For documentation-only changes, run `git diff` and `git status -sb`.
2. For TypeScript or React changes, run `npx tsc --noEmit`.
3. Run targeted `npx eslint ...` for changed runtime files when feasible.
4. Run `npm run build` for production-sensitive routing, API, Firebase, or Next.js behavior changes when feasible.
5. Record every validation command and result in the commit or PR body.
