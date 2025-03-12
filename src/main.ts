/*
 * Copyright (c) 2025.
 *  Author Peter Placzek (tada5hi)
 *  For the full copyright and license information,
 *  view the LICENSE file that was distributed with this source code.
 */

import {
    getBooleanInput, getInput, info, setFailed,
} from '@actions/core';
import { execute } from 'hevi';

export async function run() : Promise<void> {
    try {
        const charts = await execute({
            provider: 'github',
            token: getInput('token', { required: true }),

            commit: getBooleanInput('commit', { required: true }),
            commitUserName: getInput('commit_user_name', { required: true }),
            commitUserEmail: getInput('commit_user_email', { required: true }),
            commitAuthor: getInput('commit_author', { required: true }),

            push: getBooleanInput('push', { required: true }),
            branch: getInput('branch') || undefined,

            version: getInput('version') || undefined,
            versionType: getInput('version_type') || undefined,
        });

        for (let i = 0; i < charts.length; i++) {
            info(`versioned chart ${charts[i].name} (version: ${charts[i].version} & appVersion: ${charts[i].appVersion})`);
        }
    } catch (e) {
        if (e instanceof Error) setFailed(e.message);
    }
}
