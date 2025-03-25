/*
 * Copyright (c) 2025.
 *  Author Peter Placzek (tada5hi)
 *  For the full copyright and license information,
 *  view the LICENSE file that was distributed with this source code.
 */

export enum InputName {
    DIRECTORY = 'directory',
    TOKEN = 'token',

    /**
     * Package command
     */
    PACKAGE = 'package',

    /**
     * Push command
     */
    PUSH = 'push',
    PUSH_HOST = 'push_host',
    PUSH_USERNAME = 'push_username',
    PUSH_PASSWORD = 'push_password',

    /**
     * Release command
     */
    RELEASE = 'release',
    RELEASE_BRANCH = 'package_branch',

    /**
     * Versionize command
     */
    VERSIONIZE = 'versionize',
    VERSIONIZE_VERSION = 'versionize_version',

}
