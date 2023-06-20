/*
 * pwix:i18n/src/common/js/startup.js
 */

Meteor.startup(() => {
    if( pwixI18n._conf.verbosity & PI_VERBOSE_DUMP ){
        console.debug( 'pwixI18n', pwixI18n );
    }
});
