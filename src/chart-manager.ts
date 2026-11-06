/*
 * Copyright (c) 2025.
 *  Author Peter Placzek (tada5hi)
 *  For the full copyright and license information,
 *  view the LICENSE file that was distributed with this source code.
 */

import { HelmChartManager } from 'hevi';
import { ArchiveHelmBinary } from './helm-binary';

export class ActionHelmChartManager extends HelmChartManager {
    constructor() {
        super();
        this.helmBinary = new ArchiveHelmBinary();
    }
}
