/*
 * Copyright (c) 2025.
 *  Author Peter Placzek (tada5hi)
 *  For the full copyright and license information,
 *  view the LICENSE file that was distributed with this source code.
 */

import {
    getBooleanInput,
    getInput,
    info,
    setFailed,
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
            const charts = await helmChartManager.versionizeCharts({ version: getInput(InputName.VERSIONIZE_VERSION) || undefined });

            for (const chart of charts) {
                info(`versionized chart ${chart.data.name}`);
            }
        } catch (e) {
            if (e instanceof Error) {
                setFailed(e.message);
            }

            return;
        }
    }

    const pkg = getBooleanInput(InputName.PACKAGE, { required: true });

    if (pkg) {
        try {
            const charts = await helmChartManager.packageCharts();

            for (const chart of charts) {
                info(`packaged chart ${chart.data.name}`);
            }
        } catch (e) {
            if (e instanceof Error) {
                setFailed(e.message);
            }

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

            for (const chart of charts) {
                info(`released chart ${chart.data.name}`);
            }
        } catch (e) {
            if (e instanceof Error) {
                setFailed(e.message);
            }
        }
    }

    const push = getBooleanInput(InputName.PUSH, { required: true });

    if (push) {
        try {
            const charts = await helmChartManager.pushCharts({
                host: getInput(InputName.PUSH_HOST),
                username: getInput(InputName.PUSH_USERNAME),
                password: getInput(InputName.PUSH_PASSWORD),
            });

            for (const chart of charts) {
                info(`pushed chart ${chart.data.name}`);
            }
        } catch (e) {
            if (e instanceof Error) {
                setFailed(e.message);
            }
        }
    }
}
