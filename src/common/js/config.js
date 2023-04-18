/*
 * pwix:i18n/src/common/js/config.js
 */

//console.log( 'pwix:i18n/src/common/js/config.js defining globally exported pwixI18n object' );

pwixI18n = {
    // client-specific data and functions
    client: {},

    conf: {
        dateStyle: 'short',
        flagNone: '/packages/pwix_i18n/images/flag-none.png',
        language: DEFAULT,
        namespace: null,
        timeStyle: 'medium',
        translations: null
    },

    // should be *in same terms* called both by the client and the server
    configure: function( o ){
        console.log( 'pwix:i18n configure() with', o );
        pwixI18n.conf = {
            ...pwixI18n.conf,
            ...o
        };
        pwixI18n.language( pwixI18n.conf.language );
    },

    // the managed namespaces
    namespaces: {},

    // server-specific data and functions
    server: {}
};
