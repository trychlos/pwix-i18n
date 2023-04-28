/*
 * pwix:i18n/src/common/js/store.js
 *
 * Manage the localStore on the user device.
 */

pwixI18n.storeGet = function(){
    if( Meteor.isClient ){
        const key = pwixI18n.conf.languageKey;
        const language = key ? localStorage.getItem( key ) : null;
        //console.debug( 'storeGet', LANGUAGE_K, language );
        return language;
    }
    return null;
};

pwixI18n.storeSet = function( language ){
    if( Meteor.isClient ){
        const key = pwixI18n.conf.languageKey;
        if( key ){
            localStorage.setItem( LANGUAGE_K, language );
            //console.debug( 'storeSet', LANGUAGE_K, language );
        }
    }
};
