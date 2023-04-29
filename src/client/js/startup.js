/*
 * pwix:i18n/src/client/js/startup.js
 */

Meteor.startup(() => {
    if( Meteor.cookieManager ){
        Meteor.cookieManager.publish({
            name: COOKIE_PREFERRED_LANGUAGE,
            responsible: 'pwix:i18n',
            description: pwixI18n.label( PWIXI18NS, 'cookies.preferred_language' ),
            category: CM_CATEGORY_FUNCTIONALS,
            disableable: true
        });
    }
});
