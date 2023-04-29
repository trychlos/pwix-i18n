/*
 * pwix:i18n/src/common/js/store.js
 *
 * Manage the localStore on the user device.
 */

pwixI18n.storeGet = function( key ){
    let result =  null;
    if( Meteor.isClient ){
        let enabled = key;
        if( key && Meteor.cookieManager ){
            enabled = Meteor.cookieManager.isEnabled( key );
        }
        result = enabled ? localStorage.getItem( key ) : null;
    }
    return result;
};

pwixI18n.storeSet = function( key, value ){
    if( Meteor.isClient ){
        let enabled = key;
        if( key && Meteor.cookieManager ){
            enabled = Meteor.cookieManager.isEnabled( key );
        }
        if( enabled ){
            localStorage.setItem( key, value );
        }
    }
};
