# Testing

`npm test` builds first, then runs Vitest. The bundle smoke copies `dist/index.js` into an isolated temporary directory without node_modules and launches it with every operation flag disabled. Keep that isolation: source-only tests cannot establish that the distributed action is executable.

Actual Helm packaging, registry pushes and GitHub releases need explicit fixtures and authorization. The default smoke does not exercise those external effects. When changing target-runtime syntax or dependencies, also launch the bundled action with the runtime declared in `action.yml`.
