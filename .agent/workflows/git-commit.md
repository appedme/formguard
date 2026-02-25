---
description: git commit after completing each step or phase of work
---

After completing any meaningful unit of work (a feature, a fix, a new page, a refactor), run a git commit. Follow these rules:

// turbo-all

1. Stage all relevant files:

```
git add <specific files or .>
```

2. Commit with a conventional commit message in this format:

```
git commit -m "<type>(<scope>): <short description>"
```

Types:

- `feat` — new feature or page
- `fix` — bug fix
- `style` — UI/styling changes, no logic change
- `refactor` — code restructure with no behavior change
- `chore` — deps, config, tooling
- `docs` — documentation

Examples:

```
git commit -m "feat(landing): add hero, navbar, pricing sections"
git commit -m "fix(dark-mode): replace hardcoded colors with shadcn tokens"
git commit -m "feat(dashboard): add protected layout and sidebar"
git commit -m "chore(deps): install next-themes, shadcn components"
```

3. Group logically — one commit per phase/feature, not one per file.

4. Never commit broken or non-compiling code.
