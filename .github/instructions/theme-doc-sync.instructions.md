---
description: 'Keep the root theme summary synchronized when changing SCSS styles, design tokens, typography, layout, or shared visual components.'
name: Theme documentation synchronization
applyTo: 'src/lib/styles/**/*.scss'
---

When a change to the matched SCSS files changes the theme's visual direction,
design principles, design tokens, or stylesheet responsibilities, update the
repository-root `THEME.md` in the same task so it describes the resulting
implementation.

Base the summary on the current styles, keep it concise, and do not invent design
intent. Do not change `THEME.md` for purely mechanical edits that leave its
summary accurate. The `theme-maintainer` custom agent is available for this
update.
