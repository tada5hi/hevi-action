import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: 'src/index.ts',
    format: 'cjs',
    dts: false,
    clean: false,
    target: 'node20',
    sourcemap: false,
    outExtensions: () => ({ js: '.js' }),
    deps: { alwaysBundle: [/.*/], onlyBundle: false },
    minify: true,
    outputOptions: { codeSplitting: false },
});
