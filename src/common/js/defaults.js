/*
 * pwix:i18n/src/common/js/defaults.js
 */

import merge from 'merge';

pwixI18n._defaults = {
    dateStyle: 'short',
    flagNone: '/packages/pwix_i18n/images/flag-none.png',
    language: null,
    managed: [ PI_DEFAULT_LANGUAGE ],
    storePreferredLanguage: false,
    timeStyle: 'medium',
    verbosity: PI_VERBOSE_NONE
};

pwixI18n.conf = merge.recursive( true, pwixI18n.conf, pwixI18n._defaults );
