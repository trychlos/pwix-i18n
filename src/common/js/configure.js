/*
 * pwix:i18n/src/common/js/configure.js
 */

import _ from 'lodash';

import { ReactiveVar } from 'meteor/reactive-var';

pwixI18n._conf = {};
pwixI18n._conf = new ReactiveVar( _conf );

pwixI18n._defaults = {
    dateStyle: 'short',
    flagNone: '/packages/pwix_i18n/images/flag-none.png',
    language: null,
    managed: [ pwixI18n.C.Defaults.language ],
    storePreferredLanguage: true,
    timeStyle: 'medium',
    verbosity: pwixI18n.C.Verbose.NONE
};

/**
 * @summary Get/set the package configuration
 *  Should be called *in same terms* by both the client and the server
 * @locus Anywhere
 * @param {Object} o the configuration options
 * @returns {Object} the package configuration
 */
pwixI18n.configure = function( o ){
    if( o && _.isObject( o )){
        // check that keys exist
        let built_conf = {};
        Object.keys( o ).forEach(( it ) => {
            if( Object.keys( pwixI18n._defaults ).includes( it )){
                built_conf[it] = o[it];
            } else {
                console.warn( 'pwix:i18n configure() ignore unmanaged key \''+it+'\'' );
            }
        });
        if( Object.keys( built_conf ).length ){
            _conf = _.merge( pwixI18n._defaults, _conf, built_conf );
            pwixI18n._conf.set( _conf );
            // be verbose if asked for
            if( _conf.verbosity & pwixI18n.C.Verbose.CONFIGURE ){
                console.debug( 'pwix:i18n configure() with', built_conf );
            }
        }
        // setup language
        pwixI18n.language( pwixI18n.configure().language );
    }
    // also acts as a getter
    return pwixI18n._conf.get();
};

_conf = _.merge( {}, pwixI18n._defaults );
pwixI18n._conf.set( _conf );

// the managed namespaces
pwixI18n.namespaces = {};
