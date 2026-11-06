import config from '@tada5hi/eslint-config';

export default config(
    {},
    { ignores: ['dist/**'] },
    // The GitHub Action executes on Node 20, independently of the development tooling.
    { rules: { 'unicorn/prefer-error-is-error': 'off', 'unicorn/prefer-promise-try': 'off' } },
);
