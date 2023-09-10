/*
 * pwix:i18n/src/common/js/configure.js
 */

import _ from 'lodash';

pwixI18n = {
    // reference for piLanguageSelector
    btnLabelPosition: [
        pwixI18n.C.BtnLabel.NONE,
        pwixI18n.C.BtnLabel.ABOVE,
        pwixI18n.C.BtnLabel.RIGHT,
        pwixI18n.C.BtnLabel.BELOW,
        pwixI18n.C.BtnLabel.LEFT
    ],

    _conf: {},

    _defaults: {
        dateStyle: 'short',
        flagNone: '/packages/pwix_i18n/images/flag-none.png',
        language: null,
        managed: [ pwixI18n.C.Defaults.language ],
        storePreferredLanguage: false,
        timeStyle: 'medium',
        verbosity: pwixI18n.C.Verbose.NONE
    },

    /**
     * @summary Get/set the package configuration
     *  Should be called *in same terms* by both the client and the server
     * @locus Anywhere
     * @param {Object} o the configuration options
     * @returns {Object} the package configuration
     */
    configure: function( o ){
        if( o && _.isObject( o )){
            _.merge( pwixI18n._conf, pwixI18n._defaults, o );
            // be verbose if asked for
            if( pwixI18n._conf.verbosity & pwixI18n.C.Verbose.CONFIGURE ){
                console.debug( 'pwix:i18n configure() with', o, 'building', pwixI18n._conf );
            }
            // setup language
            pwixI18n.language( pwixI18n._conf.language );
        }
        // also acts as a getter
        return pwixI18n._conf;
    },

    // the managed namespaces
    namespaces: {}
};
