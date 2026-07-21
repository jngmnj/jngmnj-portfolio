# AGENTS.md

## Project Notes

- This is a Next.js portfolio project using TypeScript, Tailwind CSS, Firebase, and Firebase Admin SDK.
- Use `develop` as the default base branch for feature work.
- Use `main` for release PRs from `develop`.
- Keep issue and PR descriptions aligned with the templates in `.github/`.

## Codex Working Principles

- Keep Codex changes scoped to the active issue and branch.
- Inspect existing repository guidance before changing files.
- Prefer small, reviewable changes with one clear reason per commit.
- Do not revert or overwrite user changes unless explicitly requested.
- Record assumptions in the issue, PR, or commit body when requirements are unclear.
- Stop and ask before taking actions that require new external authority or broaden the task scope.

## Git Authentication

- Use the system-configured Git Credential Manager for Git authentication.
- Do not place tokens or credentials in remote URLs, command arguments, files, logs, or conversation text.
- When authentication is required, ask the user to complete it through the secure Git Credential Manager prompt.

## Subagents

- Use subagents only for bounded work that can be reviewed independently.
- Keep simple, local, or tightly coupled changes in the main Codex thread.
- Define each subagent's ownership before delegation and keep final integration in the main thread.
- Record subagent usage in the issue or PR when subagents contributed to the work.
- Project-scoped custom agents live under `.codex/agents/`.
- Prefer `ui-designer-agent` for focused UI implementation, `frontend-reviewer-agent` for frontend review, and `firebase-integration-agent` for Firebase/API work.

## Skills

- Use a skill when the user names it or when the task clearly matches the skill description.
- Keep skill usage scoped to the requested task and repository rules.
- Read the selected skill's `SKILL.md` completely before taking task actions.
- Read only directly relevant referenced skill resources needed for the task.
- Apply instructions in this order: user request, repository `AGENTS.md`, then selected skill guidance.

## Branch Naming

- Feature branches: `feature/{issue-number}--short-description`
- Split UI follow-up work into focused branches when the issue scope is broad.
- For project UI improvement #74, use:
  - `feature/74-1--project-card-ui`
  - `feature/74-2--project-detail-modal-ui`
  - `feature/74-3--admin-project-form-ui`

## AI-Assisted Workflow

- Start repository changes from a GitHub issue when possible.
- Create the working branch from `develop`.
- Keep commits focused on one issue task or policy decision.
- Open PRs back to `develop`; reserve `main` for release PRs from `develop`.

## AI-Assisted Records

- Prefix AI-assisted commit subjects with `[ai-assisted]`.
- Include the issue number in the commit subject using the existing `(#issue-number)` suffix style.
- Record the summary and validation result in commit or PR bodies.
- Mark AI involvement in issue or PR descriptions when Codex drafted, implemented, reviewed, or prepared validation.

## Approval Boundaries

- Do not run destructive Git or filesystem commands unless the user explicitly requests them.
- Ask before changing authentication, deployment, production data, or external service state.
- Ask before broadening the task beyond the active issue or requested scope.
- Do not commit, push, or open PRs when the user only requested diagnosis or explanation.

## Policy Alignment

- Keep this guidance aligned with `.github/` issue and PR templates.
- If a template is unclear or corrupted, fix or replace the template before relying on it for new work.
- When policy instructions conflict, follow the narrower task-specific rule and record the decision.

## Frontend Design Taste

- Aim for a soft, polished product UI: generous breathing room, rounded surfaces, quiet borders, and clear hierarchy.
- Prefer existing Tailwind classes, theme tokens, and shared component styles before introducing arbitrary values.
- Keep spacing, radius, border, typography, and color choices consistent with the existing design system.
- Prefer friendly rounded rectangles with smooth radius for inputs, cards, tabs, and primary actions. Avoid sharp editorial edges unless the surrounding UI already uses them.
- Use pale neutral backgrounds for inactive surfaces and white or lightly elevated surfaces for active content.
- Borders should be subtle and cool gray. Shadows should be minimal or absent; never rely on heavy shadows to make an element feel designed.
- Active and primary states should be obvious through contrast, color, and weight, but still feel calm. Use one clear accent color at a time.
- Typography should feel confident and readable: strong labels/titles, soft secondary text, enough line height, and no cramped text blocks.
- Controls should feel touch-friendly. Give buttons, tabs, and icon actions enough hit area, but avoid bulky control panels.
- For cards, keep the outer shape soft and modern. Let the image/title lead, then use category, description, tags, and links as quieter supporting information.
- Tech stacks should be readable metadata. Use restrained chips or text tags; avoid making every tag look like a button.
- Hover and focus states should be smooth and restrained: slight background, border, color, or scale changes. Avoid dramatic lift, oversized shadow, or noisy animation.
- Check Korean and English text lengths. Clamp long titles/descriptions and make sure rounded controls still look balanced with both languages.
- Use Korean-friendly wrapping such as `word-break: keep-all` or balanced text wrapping where it improves readability.
- Keep interactive controls accessible with clear labels, keyboard focus states, and touch-friendly hit areas.
- When unsure, make the UI softer, cleaner, and more intentional before adding decoration.

## Development Checks

- Prefer focused verification before committing:
  - `npx tsc --noEmit`
  - targeted `npx eslint ...`
- `npm run lint` may fail on existing script lint rules unrelated to feature work.
- Run `npm run build` for production-sensitive changes when feasible.
- Record validation commands and results in the commit or PR body.
- For documentation-only changes, `git diff` and `git status` checks are sufficient unless the change affects runtime behavior.
- Before closing policy setup work, summarize changed documents and validation results in the issue or PR.

## Firebase Admin SDK

- Do not initialize Firebase Admin SDK at module import time.
- Use `getAdminDb()` and `getAdminAuth()` from `src/lib/firebaseAdmin.ts` inside request handlers.
- This avoids build-time failures when service account env values are unavailable during Next.js page data collection.

## Local Notes

- `.codex/local/` is ignored and should be used only for local working notes.
- `.codex/agents/` may contain repository-shared Codex custom agents.
- `.codex/skills/` may contain repository-shared Codex skills.
- Shared plans should live in GitHub issues or repo docs instead of `.codex/local/`.
