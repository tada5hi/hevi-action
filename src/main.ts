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
            token: getInput('token'),

            commit: getBooleanInput('commit', { required: false }),
            commitUserName: getInput('commit_user_name'),
            commitUserEmail: getInput('commit_user_email'),
            commitAuthor: getInput('commit_author'),

            push: getBooleanInput('push', { required: false }),
            branch: getInput('branch'),

            version: getInput('version'),
            versionType: getInput('version_type'),
        });

        for (let i = 0; i < charts.length; i++) {
            info(`versioned chart ${charts[i].name} (version: ${charts[i].version} & appVersion: ${charts[i].appVersion})`);
        }
    } catch (e) {
        if (e instanceof Error) setFailed(e.message);
    }
}
