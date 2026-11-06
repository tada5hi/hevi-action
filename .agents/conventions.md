# Conventions

Use the unified shared ESLint flat config and explicit Vitest imports. The build emits declarations with TypeScript and bundles JavaScript with tsdown. Root lint ignores the generated distribution.

This repository distributes a GitHub Action rather than an npm workspace release, so monoship is not part of its publishing path. Preserve action input defaults and the all-disabled smoke behavior.

Reference implementation: https://github.com/tada5hi/hevi. The lockfile resolves the exact dependency version bundled into this action; verify API changes against that resolved version rather than the minimum package.json range or upstream main.
