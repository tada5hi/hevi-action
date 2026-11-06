<div align="center">
  <img src="https://raw.githubusercontent.com/tada5hi/hevi-action/4d471769249c45e525942fbf6494c62fa6ecb20c/.github/assets/logo.svg" width="144" height="144" alt="hevi-action logo">
  <h1>hevi-action</h1>
  <p><strong>A github action to use hevi</strong></p>
  <p><a href="https://github.com/tada5hi/hevi-action/releases"><img src="https://img.shields.io/github/v/release/tada5hi/hevi-action" alt="Latest release"></a> <a href="https://github.com/tada5hi/hevi-action/actions/workflows/main.yml"><img src="https://github.com/tada5hi/hevi-action/actions/workflows/main.yml/badge.svg" alt="CI status"></a> <a href="https://opensource.org/license/mit"><img src="https://img.shields.io/github/license/tada5hi/hevi-action" alt="License"></a></p>
  <p><a href="#why-hevi-action">Why hevi-action?</a> · <a href="#usage">Usage</a> · <a href="#inputs">Inputs</a> · <a href="#notes">Notes</a></p>
</div>

---

## Why hevi-action?

Run [hevi](https://github.com/tada5hi/hevi)'s Helm chart operations from a workflow step. Select the operations you need with action inputs.

| Concern | Without it | With hevi-action |
| --- | --- | --- |
| Workflow integration | Install and invoke the library or CLI yourself | Run a bundled JavaScript action |
| Chart discovery | Pass chart locations to your script | Scan the configured `directory` |
| Version and package | Wire separate calls and flags | Enable `versionize` and `package` |
| Publication | Call GitHub release/index and OCI operations | Enable `release` or `push` with the relevant credentials |
| Ordering | Maintain the sequence in your workflow | Version, package, release, then push |

<img src="https://raw.githubusercontent.com/tada5hi/hevi-action/4d471769249c45e525942fbf6494c62fa6ecb20c/.github/assets/mechanism.svg" width="960" alt="The action loads charts from directory, then runs enabled versionize, package, release and push operations in that order. All four flags default to false; enabling release or push does not enable package.">

## Usage

For packaging without publication:

```yaml
name: Package charts
on: workflow_dispatch
permissions:
  contents: read
jobs:
  charts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: tada5hi/hevi-action@v1
        with:
          directory: charts
          package: true
```

Commit your charts under `charts/`, or change `directory`. Consumers do not run `npm install`; GitHub executes the committed `dist/index.js` using the Node runtime declared in [action.yml](action.yml).

To also create GitHub releases and update the chart repository index, grant `contents: write` and set `release: true` alongside `package: true`. To push to an OCI registry, enable `push` and supply `push_host`, `push_username` and `push_password` from your registry configuration and secrets. These flags do not enable packaging automatically. OCI pushes consume `.hevi/packages/<name>-<version>.tgz`; package in the same step or supply those archives from an earlier step.

### GitHub release prerequisites

Before enabling `release`, create the default `gh-pages` branch once and fetch it into the checkout. Chart-releaser creates a worktree from the fetched publication branch and commits the updated index, so it also needs a Git author and committer identity. The release job needs `contents: write`.

Use these steps in the release job after the branch exists:

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
- name: Configure release commit identity
  run: |
    git config user.name "github-actions[bot]"
    git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
- uses: tada5hi/hevi-action@v1
  with:
    directory: charts
    package: true
    release: true
```

`fetch-depth: 0` fetches all branch history; explicitly fetching the existing publication branch is an alternative. Configure a different valid Git identity when your release account requires one.

## Inputs

| Input | Type | Default | Behavior |
| --- | --- | --- | --- |
| `directory` | String | `charts` | Directory scanned for `Chart.yaml` files |
| `token` | String | `${{ github.token }}` | Required by the implementation even with publication disabled |
| `versionize` | Boolean | `false` | Update chart versions before packaging |
| `versionize_version` | String | Unset | Explicit version passed to hevi; otherwise hevi chooses its bump |
| `package` | Boolean | `false` | Package loaded charts using Helm |
| `release` | Boolean | `false` | Publish packages and update the Helm repository index |
| `release_branch` | String | `gh-pages` | Declared input; currently not read by the implementation (see below) |
| `push` | Boolean | `false` | Push packages to an OCI registry |
| `push_host` | String | Unset | Registry host passed to Helm |
| `push_username` | String | Unset | Registry login username |
| `push_password` | String | Unset | Registry login password; use a secret |

The implementation reads `package_branch` when calling `releaseCharts()`, while the action metadata declares `release_branch`. Setting `release_branch` therefore does not currently select the branch. With no recognized override, hevi defaults to `gh-pages`. See [the input names](src/constants.ts) and [execution](src/main.ts) before relying on a custom publication branch.

## Notes

- **Order:** charts load before operation flags run. All operations default to disabled; chart loading and token validation still occur.
- **Version writes:** versioning saves chart metadata. Packaging clears hevi's `.hevi/packages` and `.hevi/index` output directories before generating packages.
- **Failures:** versioning or packaging errors mark the action failed and stop later steps. A release error marks it failed but still allows the push block to run.
- **External effects:** release and push can publish artifacts. Use repository permissions and registry credentials appropriate to the operation. There is no dry-run action input.
- **Outputs:** the action declares no outputs. Enabled operations log the charts they process.

## Development

Development tooling uses Node.js `^24.11.0 || >=26.0.0`.

```sh
npm ci
npm run build
npm test
npm run lint
```

The smoke test runs the standalone bundle with all operations disabled. It does not publish charts. Keep regenerated `dist/` artifacts with runtime changes.

## License

Made with 💚

Published under the [MIT License](https://opensource.org/license/mit).
