import { createRequire } from 'node:module';
import { defineConfig } from 'vitest/config';

// Use the real CommonJS export: Hevi 1.7's ESM build depends on __dirname.
export default defineConfig({ resolve: { alias: [{ find: /^hevi$/, replacement: createRequire(import.meta.url).resolve('hevi') }] }, test: { include: ['test/unit/**/*.spec.ts'], coverage: { provider: 'v8', include: ['src/**/*.ts'] } } });
