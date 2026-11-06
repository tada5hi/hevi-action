/*
 * Copyright (c) 2025.
 *  Author Peter Placzek (tada5hi)
 *  For the full copyright and license information,
 *  view the LICENSE file that was distributed with this source code.
 */

import { existsSync } from 'node:fs';
import path from 'node:path';
import { HelmBinary } from 'hevi';

export class ArchiveHelmBinary extends HelmBinary {
    override execute(args: string[]): Promise<string> {
        const archive = args[1];

        // The pinned Hevi omits the archive suffix from push commands.
        if (args[0] === 'push' && archive) {
            const packagedArchive = `${archive}.tgz`;

            // A valid prerelease version can itself end in .tgz.
            if (!existsSync(path.resolve(this.cwd, archive)) && existsSync(path.resolve(this.cwd, packagedArchive))) {
                return super.execute(['push', packagedArchive, ...args.slice(2)]);
            }
        }

        return super.execute(args);
    }
}
