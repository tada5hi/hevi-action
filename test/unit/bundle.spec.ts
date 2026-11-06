import { spawnSync } from 'node:child_process';
import {
    copyFile,
    mkdir,
    mkdtemp,
    readFile,
    rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, it } from 'vitest';
import { createHelmFixture } from '../helpers/helm';

const actionNode = process.env.HEVI_ACTION_TEST_NODE || process.execPath;

it('runs the action bundle without a node_modules directory', async () => {
    const directory = await mkdtemp(path.join(tmpdir(), 'hevi-action-'));

    try {
        await mkdir(path.join(directory, 'charts'));
        await copyFile(fileURLToPath(new URL('../../dist/index.js', import.meta.url)), path.join(directory, 'index.js'));

        const result = spawnSync(actionNode, ['index.js'], {
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
        expect(result.status, result.stdout).toBe(0);
    } finally {
        await rm(directory, { recursive: true, force: true });
    }
});


it.each([
    { version: '1.2.3', archive: 'demo-1.2.3.tgz' },
    { version: '1.2.3-rc.tgz', archive: 'demo-1.2.3-rc.tgz.tgz' },
])('pushes packaged chart $version through the standalone OCI action', async ({ version, archive }) => {
    const { directory, bin } = await createHelmFixture(version);

    try {
        await copyFile(fileURLToPath(new URL('../../dist/index.js', import.meta.url)), path.join(directory, 'index.js'));

        const result = spawnSync(actionNode, ['index.js'], {
            cwd: directory,
            encoding: 'utf8',
            env: {
                ...process.env,
                PATH: `${bin}${path.delimiter}${process.env.PATH}`,
                RUNNER_TOOL_CACHE: path.join(directory, 'cache'),
                INPUT_DIRECTORY: path.join(directory, 'charts'),
                INPUT_TOKEN: 'test-token',
                INPUT_VERSIONIZE: 'false',
                INPUT_PACKAGE: 'true',
                INPUT_RELEASE: 'false',
                INPUT_PUSH: 'true',
                INPUT_PUSH_HOST: 'registry.example.test',
                INPUT_PUSH_USERNAME: 'test-user',
                INPUT_PUSH_PASSWORD: 'test-password',
            },
            timeout: 10_000,
        });

        expect(result.error).toBeUndefined();
        expect(result.stderr).toBe('');
        expect(result.status, result.stdout).toBe(0);
        expect(await readFile(path.join(directory, 'pushed-archive'), 'utf8')).toBe(archive);
    } finally {
        await rm(directory, { recursive: true, force: true });
    }
});
