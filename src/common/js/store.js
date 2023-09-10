/*
 * pwix:i18n/src/common/js/store.js
 *
 * Manage the localStore on the user device.
 * Though this is a client-only feature, it is defined as a common code so that it may be called from anywhere.
 * 
 * If application doesn't use a cookie manager, then we consider that cookies are allowed.
 */

pwixI18n._store = {
    /**
     * @summary read from localStore
     */
    get( key ){
        let result =  null;
        if( Meteor.isClient && pwixI18n._conf.storePreferredLanguage ){
            let enabled = true;
            if( Meteor.CookieManager ){
                enabled = Meteor.CookieManager.isEnabled( key );
            }
            result = enabled ? localStorage.getItem( key ) : null;
        }
        return result;
    },
    
    /**
     * @summary write in localStore
     */
    set( key, value ){
        if( Meteor.isClient && pwixI18n._conf.storePreferredLanguage ){
            let enabled = true;
            if( Meteor.CookieManager ){
                enabled = Meteor.CookieManager.isEnabled( key );
            }
            if( enabled ){
                localStorage.setItem( key, value );
            }
        }
    }
};
