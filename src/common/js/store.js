/*
 * pwix:i18n/src/common/js/store.js
 *
 * Manage the localStore on the user device.
 * Because we are talking of a client property, these methods are only to be callable from the server.
 */

const LANGUAGE_K = 'i18n-language';

pwixI18n.storeGet = function(){
    if( Meteor.isClient ){
        return localStorage.getItem( LANGUAGE_K );
    }
    return null;
};

pwixI18n.storeSet = function( language ){
    if( Meteor.isClient ){
        localStorage.setItem( LANGUAGE_K, language );
    }
};
