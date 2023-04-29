/*
 * pwix:i18n/src/common/js/config.js
 */

import merge from 'merge';

pwixI18n = {
    // reference for piLanguageSelector
    btnLabelPosition: [
        PI_BTNLABEL_NONE,
        PI_BTNLABEL_ABOVE,
        PI_BTNLABEL_RIGHT,
        PI_BTNLABEL_BELOW,
        PI_BTNLABEL_LEFT
    ],

    conf: {
        dateStyle: 'short',
        flagNone: '/packages/pwix_i18n/images/flag-none.png',
        language: PI_DEFAULT_LANGUAGE,
        managed: [ PI_DEFAULT_LANGUAGE ],
        storePreferredLanguage: false,
        timeStyle: 'medium',
        verbosity: PI_VERBOSE_LANGUAGE  //PI_VERBOSE_NONE
    },

    // should be *in same terms* called both by the client and the server
    configure: function( o ){
        pwixI18n.conf = merge.recursive( true, pwixI18n.conf, o );
        if( pwixI18n.conf.verbosity & PI_VERBOSE_CONFIGURE ){
            console.debug( 'pwix:i18n configure() with', o, 'building', pwixI18n.conf );
        }
        pwixI18n.language( pwixI18n.conf.language );
    },

    // the managed namespaces
    namespaces: {}
};
