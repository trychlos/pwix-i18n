/*
 * pwix:i18n/src/common/js/store.js
 *
 * Manage the localStore on the user device.
 * 
 * Though this is a client-only feature, it is defined as a common code so that it may be called from anywhere.
 * 
 * If application doesn't use a cookie manager, then we consider that cookies are allowed.
 */

pwixI18n.storeGet = function( key ){
    let result =  null;
    if( Meteor.isClient ){
        let enabled = true;
        if( Meteor.cookieManager ){
            enabled = Meteor.cookieManager.isEnabled( key );
        }
        result = enabled ? localStorage.getItem( key ) : null;
    }
    return result;
};

pwixI18n.storeSet = function( key, value ){
    if( Meteor.isClient ){
        let enabled = true;
        if( Meteor.cookieManager ){
            enabled = Meteor.cookieManager.isEnabled( key );
        }
        if( enabled ){
            localStorage.setItem( key, value );
        }
    }
};
