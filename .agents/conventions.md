# Conventions

Use the unified shared ESLint flat config and explicit Vitest imports. The build emits declarations with TypeScript and bundles JavaScript with tsdown. Root lint ignores the generated distribution.

This repository distributes a GitHub Action rather than an npm workspace release, so monoship is not part of its publishing path. Preserve action input defaults and the all-disabled smoke behavior.

Reference implementation: https://github.com/tada5hi/hevi. The lockfile resolves the exact dependency version bundled into this action; verify API changes against that resolved version rather than the minimum package.json range or upstream main.

The resolved Hevi 1.7 push command omits the `.tgz` archive suffix. The action-local `ArchiveHelmBinary` normalizes only that argument through the protected binary seam and delegates all commands to Hevi. Remove the adapter when the resolved dependency supplies the complete archive path; keep already suffixed paths unchanged.
