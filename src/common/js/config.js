/*
 * pwix:i18n/src/common/js/config.js
 */

import merge from 'merge';

pwixI18n = {
    conf: {
        dateStyle: 'short',
        flagNone: '/packages/pwix_i18n/images/flag-none.png',
        language: DEFAULT,
        languageKey: null,
        namespace: null,
        timeStyle: 'medium',
        translations: null
    },

    // should be *in same terms* called both by the client and the server
    configure: function( o ){
        console.log( 'pwix:i18n configure() with', o );
        pwixI18n.conf = merge.recursive( true, pwixI18n.conf, o );
        pwixI18n.language( pwixI18n.conf.language );
    },

    // the managed namespaces
    namespaces: {}
};
