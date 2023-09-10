/*
 * pwix:i18n/src/common/js/functions.js
 * 
 * Languages management
 * 
 *    1. 'en_US' and 'en-US' are treated the same way (see README for a rationale)
 * 
 *    2. when the application requests for example 'en_US', the package searches the key by sucessively trying
 *          'en_US'
 *          'en-US'
 *          'en'
 *          pwixI18n.C.Defaults.language language
 *
 * Intl.DateTimeFormat()
 * 
 *    Please note that [Unicode Language and Locale Identifiers](https://unicode.org/reports/tr35/tr35.html#Unicode_Language_and_Locale_Identifiers)
 *    specifications clearly states that:
 *
 *        "[...]The "-" and "_" separators are treated as equivalent[...]"
 *
 *    But it happens that Intl.DateTimeFormat() only knows about '-'-separated language identifiers.
 * 
 * pwi 2023- 4-20
 *  String.replaceAll is only available starting with nodejs v15.0, while nodejs for Meteor 2.10 is only v14....
 */

import { Tracker } from 'meteor/tracker';

import printf from 'printf';

// search for translated string in the whole translations object for given language and key
// - language here is the requested language 'as-is', i.e. with either hyphens or underscores
//   once normalized, we are going to search in the whole translations object for the desired key
//   languages will be successively examined starting with the normalized provided language identifier,
//   then by successively removing a '-' part after another..
// Note that according to the Intl specification, language identifier is not case sensitive
//  see https://tc39.es/ecma402/#locales-currencies-tz
//
// returns null if none found
//
const _getTranslatedString = function( translationsObject, language, key ){
    // normalize the desired language string
    let _desiredLanguage = language.replace( /_/g, '-' ).toUpperCase();
    // normalize the keys of the provided translations object
    let _langsObj = {};
    Object.keys( translationsObject ).every(( id ) => {
        const _norm = id.replace( /_/g, '-' ).toUpperCase();
        _langsObj[_norm] = id;
        return true;
    });
    let _result = null;

    // internal enumeration callback
    const _enumCb = function( language ){
        if( Object.keys( _langsObj ).includes( language )){
            //console.debug( 'searching for', language );
            _result = _getTranslatedContent( translationsObject[_langsObj[language]], key );
        }
        // return false to stop the enumeration
        return _result === null;
    };
    
    pwixI18n.langEnumerate( _desiredLanguage, _enumCb );
    return _result;
};

// returns the keyed translated label, or null if not found
function _getTranslatedContent( translatedStrings, key ){
    //console.debug( translatedStrings, key );
    const _words = key.split( '.' );
    let _content = translatedStrings;
    _words.every(( w ) => {
        if( !Object.keys( _content ).includes( w )){
            _content = null;
            return false;
        }
        _content = _content[w];
        return true;
    });
    return _content;
};

// get the translations object specified either by the object itself of by its namespace
//  returns null if an error occurred
const _getTranslationsObject = function( arg ){
    let _obj = null;
    if( _isString( arg )){
        if( Object.keys( pwixI18n.namespaces ).includes( arg )){
            _obj = pwixI18n.namespaces[arg];
        } else {
            console.error( 'pwix:i18n _getTranslationsObject() unknown namespace', arg );
        }
    } else if( !_isTranslationsObject( arg )){
        console.error( 'pwix:i18n _getTranslationsObject() expects a translations object, found', arg );
    } else {
        _obj = arg;
    }
    return _obj;
}

// https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
// make sure we have a valid non-null Date
const _isDate = function( date ){
    return date && Object.prototype.toString.call( date ) === '[object Date]' && !isNaN( date );
};

// https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
// make sure we have a valid object
const _isJSObject = function( obj ){
    return obj && typeof obj === 'object' && !Array.isArray( obj );
};

// is the provided argument a string ?
const _isString = function( arg ){
    return arg && ( typeof arg === 'string' || arg instanceof String );
};

// is the provided object a translation object as defined in our README ?
//  from a purely syntaxic point of view, this is an object where first-level values are themselves objects
const _isTranslationsObject = function( obj ){
    if( !_isJSObject( obj )){
        return false;
    }
    let _ok = true;
    Object.keys( obj ).every(( lang ) => {
        _ok = _isJSObject( obj[lang] );
        return _ok;
    });
    return _ok;
};

// makes the language() method a reactive data source
let _languageRDS = {
    dep: null,
    value: null
};

// from the specified 'lang', try to compute a default compatible with the managed languages
const _managed = function( lang ){
    let _compatible = null;
    const _managedCb = function( candidate ){
        if( pwixI18n._conf.managed.includes( candidate )){
            _compatible = candidate;
            return false;
        }
        return true;
    };
    pwixI18n.langEnumerate( lang, _managedCb );
    if( !_compatible ){
        _compatible = pwixI18n.C.Defaults.language;
    }
    if( pwixI18n._conf.verbosity & pwixI18n.C.Verbose.LANGUAGE ){
        console.debug( 'pwixI18n._managed() converts', lang, 'to', _compatible );
    }
    return _compatible;
};

/**
 * @summary Render a date according to the currently selected locale
 * @locus Anywhere
 * @param {Object|Date} parm
 *  This method may be called with a Date Object, or with an object parameter:
 *  - stamp: the Date to be rendered
 *           no default
 *  - language: the language identifier to render
 *              defaulting to the currently configured language
 *  - format: the format to be used
 *            defaulting to the currently configured date style
 * @returns {String} the date only formatted according to i18n configuration
 */
pwixI18n.date = function( parm ){
    let _result = '';
    let _stamp = null;
    let _lang = pwixI18n._conf.language;
    let _format = pwixI18n._conf.dateStyle;
    let _errs = 0;
    // eliminate falsy values
    if( !parm ){
        console.error( 'pwix:i18n date() called with falsy argument' );
        _errs += 1;

    // expects a single parm
    } else if( arguments.length !== 1 ){
        console.error( 'pwix:i18n date() expects a single argument, found', arguments );
        _errs += 1;

    // do we have just the Date parm ?
    } else if( _isDate( parm )){
        _stamp = parm;

    // do we have a valid javascript Object ?
    } else if( !_isJSObject( parm )){
        console.error( 'pwix:i18n date() expects a Date or an Object argument, found', parm );
        _errs += 1;

    // expects - at least - a 'stamp' key
    } else if( !Object.keys( parm ).includes( 'stamp' )){
        console.error( 'pwix:i18n date() expects at least a \'stamp\' key in provided object argument' );
        _errs += 1;

    // a single object arg
    } else {
        _stamp = parm.stamp;
        if( Object.keys( parm ).includes( 'language' )){
            _lang = parm.language;
        }
        if( Object.keys( parm ).includes( 'format' )){
            _format = parm.format;
        }
    }
    if( !_errs ){
        _lang = _lang.replace( /_/g, '-' );
        _result = new Intl.DateTimeFormat( _lang, { dateStyle: _format }).format( _stamp );
    }
    return _result;
};

/**
 * @summary Render a date and time according to the currently selected locale
 * @locus Anywhere
 * @param {Object|Date} parm
 *  This method may be called with a Date Object, or with an object parameter:
 *  - stamp: the Date to be rendered
 *           no default
 *  - language: the language identifier to render
 *              defaulting to the currently configured language
 *  - dateFormat: the format to be used to render the date
 *                defaulting to the currently configured date style
 *  - timeFormat: the format to be used to render the time
 *                defaulting to the currently configured time style
 * @returns {String} the stamp formatted according to i18n configuration
 */
pwixI18n.dateTime = function( parm ){
    let _result = '';
    let _stamp = null;
    let _lang = pwixI18n._conf.language;
    let _dateFmt = pwixI18n._conf.dateStyle;
    let _timeFmt = pwixI18n._conf.timeStyle;
    let _errs = 0;
    // eliminate falsy values
    if( !parm ){
        console.error( 'pwix:i18n dateTime() called with falsy argument' );
        _errs += 1;

    // expects a single parm
    } else if( arguments.length !== 1 ){
        console.error( 'pwix:i18n dateTime() expects a single argument, found', arguments );
        _errs += 1;

    // do we have just the Date parm ?
    } else if( _isDate( parm )){
        _stamp = parm;

    // do we have a valid javascript Object ?
    } else if( !_isJSObject( parm )){
        console.error( 'pwix:i18n dateTime() expects a Date or an Object argument, found', parm );
        _errs += 1;

    // expects - at least - a 'stamp' key
    } else if( !Object.keys( parm ).includes( 'stamp' )){
        console.error( 'pwix:i18n dateTime() expects at least a \'stamp\' key in provided object argument' );
        _errs += 1;

    // a single object arg
    } else {
        _stamp = parm.stamp;
        if( Object.keys( parm ).includes( 'language' )){
            _lang = parm.language;
        }
        if( Object.keys( parm ).includes( 'dateFormat' )){
            _dateFmt = parm.dateFormat;
        }
        if( Object.keys( parm ).includes( 'timeFormat' )){
            _timeFmt = parm.timeFormat;
        }
    }
    if( !_errs ){
        _lang = _lang.replace( /_/g, '-' );
        _result = new Intl.DateTimeFormat( _lang, { dateStyle: _dateFmt, timeStyle: _timeFmt }).format( _stamp );
    }
    return _result;
};

/**
 * @summary Compute a suitable default:
 *  - because a previous language has been set on this terminal
 *  - by determining the default software locale
 *  - of with a hardcoded default
 * Note that none of these items is user-dependant..
 * @locus Anywhere
 * @returns {String} the to-be-configured default
 * This function is called before the application has any change of configure().
 */
pwixI18n.defaultLanguage = function(){
    let _lang = pwixI18n._storeGet( COOKIE_PREFERRED_LANGUAGE );
    if( _lang ){
        if( pwixI18n._conf.verbosity & pwixI18n.C.Verbose.LANGUAGE ){
            console.debug( 'pwixI18n.defaultLanguage() set from stored', _lang );
        }
        return _managed( _lang );
    }
    _lang = pwixI18n.defaultLocale();
    if( _lang ){
        if( pwixI18n._conf.verbosity & pwixI18n.C.Verbose.LANGUAGE ){
            console.debug( 'pwixI18n.defaultLanguage() set from defaultLocale()', _lang );
        }
        return _managed( _lang );
    }
    _lang = pwixI18n.C.Defaults.language;
    if( pwixI18n._conf.verbosity & pwixI18n.C.Verbose.LANGUAGE ){
        console.debug( 'pwixI18n.defaultLanguage() set from hardcoded DEFAULT', _lang );
    }
    return _managed( _lang );
};

/**
 * @summary Does its best to guess the current default locale of the user/device/terminal...
 * @locus Anywhere
 * @returns {String} the guessed default locale
 * 
 * See https://stackoverflow.com/questions/55385129/javascripts-standard-api-to-get-the-runtimes-default-locale
 */
pwixI18n.defaultLocale = function(){
    return new Intl.NumberFormat().resolvedOptions().locale;
};

/**
 * @locus Anywhere
 * @summary let the translations embed, for example, an array of strings
 *  Useful when populating list boxes.
 * @param {Object|String} arg either the translations object or a namespace previously registered via namespace() method.
 * @param {String} key 
 * @returns {Object} the object read from the translation language object
 */
pwixI18n.group = function( name, key ){
    const _translationsObject = _getTranslationsObject( arg );
    const _lang = pwixI18n.language();
    let _result = _translationsObject ? _getTranslatedString( _translationsObject, _lang, key ) : '';
    return _result;
};

/**
 * @summary Returns a localized string
 * @locus Anywhere
 * @param {Object|String} arg either the translations object or a namespace previously registered via namespace() method.
 * @param {String} key 
 *  Other parameters may be specified for the function, and will be passed as arguments to a printf() function
 *  which uses the translated string as a format specification.
 * @returns {String} the localized string, or null if not found or an error occured
 */
pwixI18n.label = function( arg, key ){
    let _args = [ ...arguments ];
    _args.shift();
    _args.shift();
    return pwixI18n.labelEx({ name: arg, key:key, language: pwixI18n.language() }, ..._args );
};

/**
 * @summary an extension of the above 'label()' method which let the caller specifies any argument
 * @locus Anywhere
 * @param {Object} parms an object which groups all method parameters, as:
 *  - name (mandatory) either the translations object, or a namespace previously registered via namespace() method
 *  - key (mandatory) the searched key as a string
 *  - language (optional) the requested language
 *    defaults to current language()
 * 
 *  Other parameters may be specified for the function, and will be passed as arguments to a printf() function.
 * 
 * @returns {String} the localized string
 */
pwixI18n.labelEx = function( parms ){
    //console.debug( arguments );
    let _errs = 0;
    let _result = '';
    // expects an object arg
    if( !_isJSObject( parms )){
        console.error( 'pwix:i18n labelEx() expects an Object argument, found', parms );
        _errs += 1;
    // expects a 'name' key
    } else if( !Object.keys( parms ).includes( 'name' )){
        console.error( 'pwix:i18n labelEx() expects that the Object argument provides a \'name\' key, not found' );
        _errs += 1;
    // expects a 'key' key
    } else if( !Object.keys( parms ).includes( 'key' )){
        console.error( 'pwix:i18n labelEx() expects that the Object argument provides a \'key\' key, not found' );
        _errs += 1;
    }
    if( !_errs ){
        //console.debug( parms, pwixI18n );
        const _translationsObject = _getTranslationsObject( parms.name );
        const _lang = parms.language || pwixI18n.language();
        _result = _translationsObject ? _getTranslatedString( _translationsObject, _lang, parms.key ) : '';
        if( _result && arguments.length > 1 ){
            let _args = [ ...arguments ];
            _args.shift();
            _result = printf( _result, ..._args );
        }
    }
    return _result;
};

/**
 * @summary A language enumerator.
 * @locus Anywhere
 * @param {String} language 
 * @param {Function} cb
 */
pwixI18n.langEnumerate = function( language, cb ){
    let _lang = language.replace( /_/g, '-' );
    let _ret = true;
    do {
        _ret = cb( _lang );
        if( _ret ){
            const _index = _lang.lastIndexOf( '-' );
            if( _index === -1 ){
                _ret = false;
            } else {
                _lang = _lang.substring( 0, _index );
            }
        }
    } while( _ret );
};

/**
 * Getter/Setter
 * @summary As a getter, returns the configured language, making sure it is not null, defaulting to 'en-US'. This is a reactive data source.
 *  As a setter, configure the desired language.
 * @locus Anywhere
 * @param {String|unset} language 
 * @returns {String} the chosen language, making sure it is not null, defaulting to hardcoded 'en'
 */
pwixI18n.language = function( language ){
    // initialize the dependency tracking
    if( !_languageRDS.dep ){
        _languageRDS.dep = new Tracker.Dependency();
        _languageRDS.value = pwixI18n._conf.language;
    }

    // is that a getter call ?
    if( arguments.length === 0 ){
        if( !_languageRDS.value ){
            console.warn( 'pwix:i18n.conf.language: falsy value detected' );
            _languageRDS.value = pwixI18n.C.Defaults.language;
        }
        _languageRDS.dep.depend();

    // or this is a setter
    } else if( language === null ){
        if( pwixI18n._conf.verbosity & pwixI18n.C.Verbose.LANGUAGE ){
            console.debug( 'pwixI18n.language() computing a default value' );
        }
        const _lang = pwixI18n.defaultLanguage();
        _languageRDS.value = _lang;
        pwixI18n._conf.language = _lang;
        pwixI18n._storeSet( COOKIE_PREFERRED_LANGUAGE, _lang );
        _languageRDS.dep.changed();

    } else if( language !== _languageRDS.value ){
        if( pwixI18n._conf.verbosity & pwixI18n.C.Verbose.LANGUAGE ){
            console.debug( 'pwixI18n.language() setting as', language );
        }
        _languageRDS.value = language;
        pwixI18n._conf.language = language;
        pwixI18n._storeSet( COOKIE_PREFERRED_LANGUAGE, language );
        _languageRDS.dep.changed();
    }
    return _languageRDS.value;
};

/**
 * @summary Gathers and organizes the translations for the given namespace, and maybe for the given language
 *  May be called either as pwixI18n.namespace( namespace, language, keyed_translated_strings )
 *                    or as pwixI18n.namespace( namespace, translations_object )
 *                    or with a single object argument, with keys:
 *                      - namespace
 *                      - translations
 *                      - (optional) language
 *  - if 'language' is specified, then it is expected that 'translations' is a single translation object without the language key,
 *    i.e. just an object with keyed strings;
 *  - if 'language' is not specified, then it is expected that 'translations' is a standard translation object as described in README,
 *    i.e an object keyed by language codes, where values are themselves translation objects for these languages.
 * @locus Anywhere
 */
pwixI18n.namespace = function(){
    let _errs = 0;
    let _namespace = null;
    let _translationObject = null;
    //console.debug( arguments );

    if( arguments.length === 0 ){
        console.error( 'pwix:i18n namespace() called without argument, expects at least one' );
        _errs += 1;

    // one argument is expected to be a single object
    } else if( arguments.length === 1 ){
        if( !_isJSObject( arguments[0] )){
            console.error( 'pwix:i18n namespace() expects an Object argument, found', arguments[0] );
            _errs += 1;
        } else if( !Object.keys( arguments[0] ).includes( 'namespace' )){
            console.error( 'pwix:i18n namespace() expects that argument provides a \'namespace\' key' );
            _errs += 1;
        } else if( !Object.keys( arguments[0] ).includes( 'translations' )){
            console.error( 'pwix:i18n namespace() expects that argument provides a \'translations\' key' );
            _errs += 1;
        } else {
            _namespace = arguments[0].namespace;
            if( !_isJSObject( arguments[0].translations )){
                console.error( 'pwix:i18n namespace() expects that \'translations\' be an object, found', arguments[0].translations );
                _errs += 1;
            } else {
                if( Object.keys( arguments[0] ).includes( 'language' )){
                    _translationObject = {};
                    _translationObject[arguments[0].language] = arguments[0].translations;
                } else if( !_isTranslationsObject( arguments[0].translations )){
                    console.error( 'pwix:i18n namespace() expects that \'translations\' be a translation object, found', arguments[0].translations );
                    _errs += 1;
                } else {
                    _translationObject = arguments[0].translations;
                }
            }
        }

    // two arguments are a namespace and a translation object
    } else if( arguments.length === 2 ){
        _namespace = arguments[0];
        if( !_isTranslationsObject( arguments[1] )){
            console.error( 'pwix:i18n namespace() expects a translation object, found', arguments[1] );
            _errs += 1;
        } else {
            _translationObject = arguments[1];
        }

    // three arguments are a namespace, a language identifier and keyed translated strings
    } else if( arguments.length === 3 ){
        _namespace = arguments[0];
        if( !_isString( arguments[1] )){
            console.error( 'pwix:i18n namespace() expects second argument be language identifier, found', arguments[1] );
            _errs += 1;
        }
        if( !_isJSObject( arguments[2] )){
            console.error( 'pwix:i18n namespace() expects third argument be keyed translated strings, found', arguments[2] );
            _errs += 1;
        }
        if( !_errs ){
            _translationObject = {};
            _translationObject[arguments[1]] = arguments[2];
        }

    // more is too many
    } else {
        console.error( 'pwix:i18n namespace() expects one to three arguments, found', arguments.length );
        _errs += 1;
    }
    if( !_errs ){
        //console.debug( _namespace, _translationObject );
        if( !Object.keys( pwixI18n.namespaces ).includes( _namespace )){
            pwixI18n.namespaces[_namespace] = {};
        }
        pwixI18n.namespaces[_namespace] = {
            ...pwixI18n.namespaces[_namespace],
            ..._translationObject
        };
    }
};

/**
 * @summary Define a namespace
 *  OBSOLETED
 *  WILL BE REMOVED ON 2.0 VERSION
 */
pwixI18n.set = function(){
    console.warn( 'pwix:i18n set() obsoleted method, redirected to namespace()' );
    pwixI18n.namespace( ...arguments );
};
