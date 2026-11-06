import { spawnSync } from 'node:child_process';
import {
    copyFile,
    mkdir,
    mkdtemp,
    rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, it } from 'vitest';

it('runs the action bundle without a node_modules directory', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'hevi-action-'));

    try {
        await mkdir(path.join(directory, 'charts'));
        await copyFile(fileURLToPath(new URL('../../dist/index.js', import.meta.url)), path.join(directory, 'index.js'));

        const result = spawnSync(process.execPath, ['index.js'], {
            cwd: directory,
            encoding: 'utf8',
            env: {
                ...process.env,
                INPUT_DIRECTORY: path.join(directory, 'charts'),
                INPUT_TOKEN: 'test-token',
                INPUT_VERSIONIZE: 'false',
                INPUT_PACKAGE: 'false',
                INPUT_RELEASE: 'false',
                INPUT_PUSH: 'false',
            },
            timeout: 10_000,
        });

        expect(result.error).toBeUndefined();
        expect(result.stderr).toBe('');
        expect(result.status).toBe(0);
    } finally {
        await rm(directory, { recursive: true, force: true });
    }
});
