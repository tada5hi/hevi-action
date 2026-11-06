# Structure

- `action.yml`: public action inputs and runtime entry point.
- `src/index.ts`: execution entry; `src/main.ts`: input parsing and chart operations; `src/constants.ts`: input names.
- `tsdown.config.mts`: bundled action output settings.
- `dist/`: tracked distribution consumed directly by GitHub Actions.
- `test/unit/`: standalone bundle smoke test; `test/vitest.config.mts`: runner settings.
- `.github/workflows/`: CI and release automation.

README visuals live in `.github/assets/`: the approved logo and the source-based mechanism diagram.
