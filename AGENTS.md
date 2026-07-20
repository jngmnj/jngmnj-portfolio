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

## Frontend Design Taste

- Aim for a soft, polished product UI: generous breathing room, rounded surfaces, quiet borders, and clear hierarchy.
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
- When unsure, make the UI softer, cleaner, and more intentional before adding decoration.

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
