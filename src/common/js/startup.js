/*
 * pwix:i18n/src/common/js/startup.js
 */

Meteor.startup(() => {
    if( pwixI18n.configure().verbosity & pwixI18n.C.Verbose.DUMP ){
        console.debug( 'pwixI18n', pwixI18n );
    }
});
