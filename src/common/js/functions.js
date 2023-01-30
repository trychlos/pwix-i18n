/*
 * pwix:i18n/src/common/js/functions.js
 *
 * Please note that [Unicode Language and Locale Identifiers](https://unicode.org/reports/tr35/tr35.html#Unicode_Language_and_Locale_Identifiers)
 * specifications clearly states that:
 *
 *      "[...]The "-" and "_" separators are treated as equivalent[...]"
 *
 * But it happens that Intl.DateTimeFormat() only knows about '-'-seaparated language identifiers.
 */

import printf from 'printf';

/**
 * @locus Anywhere
 * @param {Date|null} stamp 
 * @param {String|null} language 
 * @returns {String} the date only formatted according to i18n configuration
 */
pwixI18n.date = function( stamp, language=null ){
    const langId = pwixI18n.language( language ).replace( '_', '-' );
    const stampSrc = stamp || new Date();
    return new Intl.DateTimeFormat( langId, { dateStyle: pwixI18n.conf.dateStyle }).format( stampSrc );
};

/**
 * @locus Anywhere
 * @param {Date|null} stamp 
 * @param {String|null} language 
 * @returns {String} the stamp formatted according to i18n configuration
 */
pwixI18n.dateTime = function( stamp, language=null ){
    const langId = pwixI18n.language( language ).replace( '_', '-' );
    const stampSrc = stamp || new Date();
    //console.log( 'langId='+langId, 'parms=',{ dateStyle: pwixI18n.conf.dateStyle, timeStyle: pwixI18n.conf.timeStyle }, 'stamp='+stampSrc );
    return new Intl.DateTimeFormat( langId, { dateStyle: pwixI18n.conf.dateStyle, timeStyle: pwixI18n.conf.timeStyle }).format( stampSrc );
};

// returns the translated label, or empty if not found
function _get_content( translations, key ){
    const words = key.split( '.' );
    let content = translations;
    words.every(( w ) => {
        if( !Object.keys( content ).includes( w )){
            content = '';
            return false;
        }
        content = content[w];
        return true;
    });
    return content;
}

// returns the translations for the given language, or null
//  if 'en_US' is requested, try
//  - en_US
//  - en
//  - default language (here 'en_US')
function _get_group( translations, lang ){
    const langs = Object.keys( translations );
    if( langs.includes( lang )){
        return translations[lang];
    }
    // change '-' and '_'
    if( lang.includes( '-' )){
        lang = lang.replace( '-', '_' );
    } else if( lang.includes( '_' )){
        lang = lang.replace( '_', '-' );
    }
    if( langs.includes( lang )){
        return translations[lang];
    }
    // test with only language tag
    const words = lang.split( /[-_]/ );
    if( langs.includes( words[0] )){
        return translations[words[0]];
    }
    if( langs.includes( DEFAULT )){
        return translations[DEFAULT];
    }
    return null;
}

// returns the translations object, or null if not found
function _get_translations( name ){
    if( typeof name === 'object' ){
        return name;
    }
    if( typeof name === 'string' ){
        return pwixI18n.translations[name] || null;
    }
    return null;
}

/**
 * @locus Anywhere
 * @param {Object|String} name either the object translations, or a namespace previously registered via set() method,
 *  or a function which returns an object translations or a namespace string.
 * @param {String} key 
 * @returns {String} the localized string
 */
pwixI18n.label = function( name, key ){
    const xname = typeof name === 'function' ? name() : name;
    const translations = _get_translations( xname );
    let label = '';
    let group = null;
    if( !translations ){
        console.error( 'pwix:i18n label() unable to identify a translation object', name, key );
    } else {
        const lang = pwixI18n.language();
        group = _get_group( translations, lang );
        if( !group ){
            console.error( 'pwix:i18n label() unable to find a translation group', name, key );
        }
    }
    let content = group ? _get_content( group, key ) : '';
    if( arguments.length > 2 ){
        let _args = [ ...arguments ];
        _args.shift();
        _args.shift();
        //console.log( 'arguments', arguments, 'args', _args );
        //console.log( 'content', content );
        content = printf( content, _args );
    }
    return content;
};

/**
 * @locus Anywhere
 * @param {String|null} language 
 * @returns {String} the chosen language, making sure it is not null, defaulting to 'en-US'
 */
pwixI18n.language = function( language ){
    if( !language ){
        language = pwixI18n.conf.language;
    }
    if( !language ){
        language = 'en-US';
    }
    return language;
};

/**
 * @summary Initializes the translations for the given namespace, and maybe for the given language
 *  May be called either as pwixI18n.set( namespace, language, translations )
 * @locus Anywhere
 * @param {String} namespace
 * @param {String} language optional
 * @param {object} translations
 */
pwixI18n.set = function(){
    if( arguments.length !== 2 && arguments.length !== 3 ){
        console.error( 'pwix:i18n set() arguments error', arguments );
    } else {
        const namespace = arguments[0];
        if( !Object.keys( pwixI18n.translations ).includes( namespace )){
            pwixI18n.translations[namespace] = {};
        }
        let lang = NOLANG;
        let translations = arguments[1];
        if( arguments.length === 3 ){
            lang = arguments[1];
            translations = arguments[2];
        }
        pwixI18n.translations[namespace][lang] = translations;
    }
};
