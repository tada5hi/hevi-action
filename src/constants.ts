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
     * Release command
     */
    RELEASE = 'release',
    RELEASE_BRANCH = 'package_branch',

    /**
     * Versionize command
     */
    VERSIONIZE = 'versionize',
    VERSIONIZE_COMMIT = 'versionize_commit',
    VERSIONIZE_PUSH = 'versionize_push',
    VERSIONIZE_BRANCH = 'versionize_branch',
    VERSIONIZE_VERSION = 'versionize_version',
    VERSIONIZE_VERSION_TYPE = 'versionize_version_type',

    COMMIT_USER_NAME = 'commit_user_name',
    COMMIT_USER_EMAIL = 'commit_user_email',
    COMMIT_AUTHOR = 'commit_author',
}
