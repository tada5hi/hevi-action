/*
 * Copyright (c) 2025.
 *  Author Peter Placzek (tada5hi)
 *  For the full copyright and license information,
 *  view the LICENSE file that was distributed with this source code.
 */

import {
    getBooleanInput, getInput, info, setFailed,
} from '@actions/core';
import { HelmChartManager } from 'hevi';
import { InputName } from './constants';

export async function run() : Promise<void> {
    const helmChartManager = new HelmChartManager();

    const directory = getInput(InputName.DIRECTORY) || 'charts';
    await helmChartManager.loadMany(directory);

    const token = getInput(InputName.TOKEN, { required: true });

    const versionize = getBooleanInput(InputName.VERSIONIZE, { required: true });
    if (versionize) {
        try {
            const charts = await helmChartManager.versionizeCharts({
                commit: getBooleanInput(InputName.VERSIONIZE_COMMIT, { required: true }),
                commitUserName: getInput(InputName.COMMIT_USER_NAME, { required: true }),
                commitUserEmail: getInput(InputName.COMMIT_USER_EMAIL, { required: true }),
                commitAuthor: getInput(InputName.COMMIT_AUTHOR, { required: true }),

                branch: getInput(InputName.VERSIONIZE_BRANCH) || undefined,

                version: getInput(InputName.VERSIONIZE_VERSION) || undefined,
                versionType: getInput(InputName.VERSIONIZE_VERSION_TYPE) || undefined,

                push: getBooleanInput(InputName.VERSIONIZE_PUSH, { required: true }),

                token,
            });

            for (let i = 0; i < charts.length; i++) {
                info(`versionized chart ${charts[i].data.name}`);
            }
        } catch (e) {
            if (e instanceof Error) setFailed(e.message);

            return;
        }
    }

    const pkg = getBooleanInput(InputName.PACKAGE, { required: true });
    if (pkg) {
        try {
            const charts = await helmChartManager.packageCharts();
            for (let i = 0; i < charts.length; i++) {
                info(`packaged chart ${charts[i].data.name}`);
            }
        } catch (e) {
            if (e instanceof Error) setFailed(e.message);

            return;
        }
    }

    const release = getBooleanInput(InputName.RELEASE, { required: true });
    if (release) {
        try {
            const charts = await helmChartManager.releaseCharts({
                branch: getInput(InputName.RELEASE_BRANCH) || undefined,
                token,
            });
            for (let i = 0; i < charts.length; i++) {
                info(`released chart ${charts[i].data.name}`);
            }
        } catch (e) {
            if (e instanceof Error) setFailed(e.message);
        }
    }
}
