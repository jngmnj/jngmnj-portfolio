---
name: repo-change-check
description: Use when preparing, reviewing, or committing repository changes in this portfolio project; checks issue scope, Codex policy, validation, and PR readiness.
---

# Repo Change Check

Use this skill before committing or opening a PR for this repository.

## Steps

1. Confirm the active issue, branch, and requested scope.
2. Read the repository `AGENTS.md` before changing files.
3. Check that no credential, token, or secret value is added to URLs, command arguments, files, logs, issues, commits, or PR text.
4. Keep changes focused on the active issue.
5. Run validation that matches the change:
   - Documentation-only: `git diff` and `git status -sb`.
   - TypeScript/runtime behavior: `npx tsc --noEmit` and targeted `npx eslint ...`.
   - Production-sensitive behavior: `npm run build` when feasible.
6. Record the changed files and validation results in the commit or PR body.
7. If subagents were used, record their ownership and contribution in the issue or PR.
