/*
 * pwix:i18n/src/common/js/config.js
 */

//console.log( 'pwix:i18n/src/common/js/config.js defining globally exported pwixI18n object' );

pwixI18n = {
    // client-specific data and functions
    client: {},

    conf: {
        language: DEFAULT,
        dateStyle: 'short',
        timeStyle: 'medium'
    },

    // should be *in same terms* called both by the client and the server
    configure: function( o ){
        console.log( 'pwix:i18n configure() with', o );
        pwixI18n.conf = {
            ...pwixI18n.conf,
            ...o
        };
    },

    // the managed translations, keyed by namespaces
    translations: {},

    // server-specific data and functions
    server: {}
};
