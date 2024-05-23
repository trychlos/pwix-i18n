/*
 * pwix:i18n/src/server/js/check_npms.js
 */

import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';

if( false ){
    // whitelist packages which are included via a subfolder or badly recognized
    require( '@popperjs/core/package.json' );
    require( 'bootstrap/package.json' );
}

checkNpmVersions({
    'bootstrap': '^5.2',
    'lodash': '^4.17.0',
    '@popperjs/core': '^2.11.6',
    'printf': '^0.6.1'
},
    'pwix:i18n'
);
