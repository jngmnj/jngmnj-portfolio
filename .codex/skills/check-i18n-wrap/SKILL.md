---
name: check-i18n-wrap
description: Use when checking Korean and English mixed UI text for wrapping, truncation, readability, and responsive layout regressions.
---

# Check I18n Wrap

Use this skill when UI text can appear in Korean and English.

## Checklist

- Korean text keeps natural phrase grouping where feasible.
- English long words, URLs, tags, and labels cannot overflow their containers.
- Buttons, cards, tabs, chips, and form controls keep stable dimensions.
- Long titles and descriptions use intentional wrapping, clamping, or truncation.
- Mobile and desktop layouts avoid text overlap and clipped controls.
- When helpful, use `word-break: keep-all`, balanced wrapping, or explicit responsive line breaks.
