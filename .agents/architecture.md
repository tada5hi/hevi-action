# Architecture

`run()` reads GitHub Action inputs through `@actions/core`, loads charts through `HelmChartManager`, then runs enabled version/package/release/push operations. Keep inputs aligned with `action.yml` and use `setFailed` for operation failures.

The action ships one CommonJS `dist/index.js` with its dependencies bundled and code splitting disabled. Preserve its path, output extension and compatibility with the action runtime. Consumers do not run npm install. Commit regenerated distribution files with runtime changes.
