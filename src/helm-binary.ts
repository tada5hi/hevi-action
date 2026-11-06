/*
 * Copyright (c) 2025.
 *  Author Peter Placzek (tada5hi)
 *  For the full copyright and license information,
 *  view the LICENSE file that was distributed with this source code.
 */

import { HelmBinary } from 'hevi';

export class ArchiveHelmBinary extends HelmBinary {
    override execute(args: string[]): Promise<string> {
        const archive = args[1];

        // The pinned Hevi omits the archive suffix from push commands.
        if (args[0] === 'push' && archive && !archive.endsWith('.tgz')) {
            return super.execute(['push', `${archive}.tgz`, ...args.slice(2)]);
        }

        return super.execute(args);
    }
}
