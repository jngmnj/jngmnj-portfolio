# AGENTS.md

## Project Notes

- This is a Next.js portfolio project using TypeScript, Tailwind CSS, Firebase, and Firebase Admin SDK.
- Use `develop` as the default base branch for feature work.
- Use `main` for release PRs from `develop`.
- Keep issue and PR descriptions aligned with the templates in `.github/`.

## Branch Naming

- Feature branches: `feature/{issue-number}--short-description`
- Split UI follow-up work into focused branches when the issue scope is broad.
- For project UI improvement #74, use:
  - `feature/74-1--project-card-ui`
  - `feature/74-2--project-detail-modal-ui`
  - `feature/74-3--admin-project-form-ui`

## Development Checks

- Prefer focused verification before committing:
  - `npx tsc --noEmit`
  - targeted `npx eslint ...`
- `npm run lint` may fail on existing script lint rules unrelated to feature work.
- Run `npm run build` for production-sensitive changes when feasible.

## Firebase Admin SDK

- Do not initialize Firebase Admin SDK at module import time.
- Use `getAdminDb()` and `getAdminAuth()` from `src/lib/firebaseAdmin.ts` inside request handlers.
- This avoids build-time failures when service account env values are unavailable during Next.js page data collection.

## Local Notes

- `.codex/` is ignored and should be used only for local working notes.
- Shared plans should live in GitHub issues or repo docs instead of `.codex/`.

