/*
 * pwix:i18n/src/server/js/check_npms.js
 */

import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

checkNpmVersions({
    'bootstrap': '^5.2',
    'merge': '^2.1.1',
    'printf': '^0.6.1'
}, 'pwix:i18n' );
