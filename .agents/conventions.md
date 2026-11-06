# Conventions

Use the unified shared ESLint flat config and explicit Vitest imports. The build emits declarations with TypeScript and bundles JavaScript with tsdown. Root lint ignores the generated distribution.

This repository distributes a GitHub Action rather than an npm workspace release, so monoship is not part of its publishing path. Preserve action input defaults and the all-disabled smoke behavior.

Reference implementation: https://github.com/tada5hi/hevi. Its npm dependency version in package.json determines the API bundled into this action; verify API changes against that version rather than assuming upstream main is installed.
