import {
    chmod,
    mkdir,
    mkdtemp,
    writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

export async function createHelmFixture() {
    const directory = await mkdtemp(path.join(tmpdir(), 'hevi-action-push-'));
    const bin = path.join(directory, 'bin');

    await mkdir(bin);
    await mkdir(path.join(directory, 'charts', 'demo'), { recursive: true });
    await writeFile(path.join(directory, 'charts', 'demo', 'Chart.yaml'), 'apiVersion: v2\nname: demo\nversion: 1.2.3\n');

    const script = `#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const args = process.argv.slice(2);
if (args[0] === 'package') {
    const destination = args[args.indexOf('--destination') + 1];
    fs.mkdirSync(destination, { recursive: true });
    fs.writeFileSync(path.join(destination, 'demo-1.2.3.tgz'), 'packaged chart fixture');
} else if (args[0] === 'push') {
    if (!fs.existsSync(args[1])) {
        process.stderr.write('Missing archive: ' + args[1]);
        process.exit(41);
    }
    fs.writeFileSync('pushed-archive', path.basename(args[1]));
} else if (args[0] !== 'registry' && !(args[0] === 'dependency' && args[1] === 'update')) {
    process.stderr.write('Unexpected Helm command');
    process.exit(42);
}
`;
    const helm = path.join(bin, 'helm');

    await writeFile(helm, script);
    await chmod(helm, 0o755);

    return { directory, bin };
}
