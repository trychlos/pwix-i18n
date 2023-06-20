/*
 * pwix:i18n/src/common/js/config.js
 */

import _ from 'lodash';

pwixI18n = {
    // reference for piLanguageSelector
    btnLabelPosition: [
        PI_BTNLABEL_NONE,
        PI_BTNLABEL_ABOVE,
        PI_BTNLABEL_RIGHT,
        PI_BTNLABEL_BELOW,
        PI_BTNLABEL_LEFT
    ],

    _conf: {},

    /**
     * @summary Get/set the package configuration
     *  Should be called *in same terms* by both the client and the server
     * @locus Anywhere
     * @param {Object} o the configuration options
     * @returns {Object} the package configuration
     */
    configure: function( o ){
        if( o && _o.isObject( o )){
            _.merge( pwixI18n._conf, pwixI18n._defaults, o );
        }
        if( pwixI18n._conf.verbosity & PI_VERBOSE_CONFIGURE ){
            console.debug( 'pwix:i18n configure() with', o, 'building', pwixI18n._conf );
        }
        pwixI18n.language( pwixI18n._conf.language );
        // also acts as a getter
        return pwixI18n._conf;
    },

    // the managed namespaces
    namespaces: {}
};
