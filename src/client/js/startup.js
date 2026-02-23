/*
 * pwix:i18n/src/client/js/startup.js
 */

Meteor.startup(() => {
    if( Meteor.CookieManager ){
        Meteor.CookieManager.publish({
            responsible: COOKIE_RESPONSIBLE,
            name: COOKIE_PREFERRED_LANGUAGE,
            description: pwixI18n.label( I18N, 'cookies.preferred_language' ),
            category: Meteor.CookieManager.C.Category.FUNCTIONALS,
            lifetime: pwixI18n.label( I18N, 'cookies.illimited' ),
            enabled: true,
            disableable: true
        });
    }
});
