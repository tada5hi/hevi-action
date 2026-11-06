# Hevi Action agent guide

This JavaScript GitHub Action uses `hevi` to version, package, push and release Helm charts.

## Commands

```sh
npm ci
npm run build
npm test
npm run lint
npm run lint:fix
```

Development tooling requires Node `^24.11.0 || >=26.0.0`; `.nvmrc` selects Node 24. The shipped action executes with the runtime declared in `action.yml`, independently of the tooling runtime.

- [Structure](.agents/structure.md)
- [Architecture](.agents/architecture.md)
- [Testing](.agents/testing.md)
- [Conventions](.agents/conventions.md)

### Writing agent docs

Keep existing commands, paths and factual descriptions current. Add guide content only for an invariant or a cross-cutting rule. Edit the existing statement and describe current behavior. Defect stories, test inventories and change history belong in PRs or commits. `npm run lint` enforces agent-doc size and history checks through the shared ESLint config.

## Commits and PRs

Use Conventional Commits. Do not add AI attribution trailers or generated-by lines.
