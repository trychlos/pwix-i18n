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

    conf: {},

    // should be called in same terms by both the client and the server
    configure: function( o ){
        pwixI18n.conf = merge.recursive( true, pwixI18n._defaults, o );
        if( pwixI18n.conf.verbosity & PI_VERBOSE_CONFIGURE ){
            console.debug( 'pwix:i18n configure() with', o, 'building', pwixI18n.conf );
        }
        pwixI18n.language( pwixI18n.conf.language );
    },

    // the managed namespaces
    namespaces: {}
};
