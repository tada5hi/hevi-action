import {
    mkdir,
    readFile,
    rm,
    writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { expect, it, vi } from 'vitest';
import { ArchiveHelmBinary } from '../../src/helm-binary';
import { createHelmFixture } from '../helpers/helm';

it('preserves an already suffixed archive when invoking Helm push', async () => {
    const { directory, bin } = await createHelmFixture();

    try {
        const packages = path.join(directory, '.hevi', 'packages');

        await mkdir(packages, { recursive: true });
        await writeFile(path.join(packages, 'demo-1.2.3.tgz'), 'packaged chart fixture');
        vi.stubEnv('PATH', `${bin}${path.delimiter}${process.env.PATH}`);
        vi.stubEnv('RUNNER_TOOL_CACHE', path.join(directory, 'cache'));

        const helm = new ArchiveHelmBinary({ cwd: directory });

        await helm.execute(['push', '.hevi/packages/demo-1.2.3.tgz', 'oci://registry.example.test']);
        expect(await readFile(path.join(directory, 'pushed-archive'), 'utf8')).toBe('demo-1.2.3.tgz');
    } finally {
        vi.unstubAllEnvs();
        await rm(directory, { recursive: true, force: true });
    }
});
