/*
 * pwix:i18n/src/common/js/constants.js
 *
 * Is imported before config.js in order the constants be available into the conf.
 */

pwixI18n.C = {
    // positionning the label vs the flag in the piLanguageSelector dropdown button
    BtnLabel: {
        NONE:  'BTNLABEL_NONE',
        LEFT:  'BTNLABEL_LEFT',
        ABOVE: 'BTNLABEL_ABOVE',
        RIGHT: 'BTNLABEL_RIGHT',
        BELOW: 'BTNLABEL_BELOW'
    },
    // default language
    Defaults: {
        language: 'en'
    },
    // verbosity levels
    Verbose: {
        NONE:       0,
        CONFIGURE:  0x01 <<  0,
        COMPONENTS: 0x01 <<  1,
        LANGUAGE:   0x01 <<  2,
        DUMP:       0x01 <<  3
    }
};

// reference for piLanguageSelector
const keys = Object.keys( pwixI18n.C.BtnLabel );
pwixI18n.btnLabelPosition = keys.map( function( v ){ return pwixI18n.C.BtnLabel[v]; });

// not exported
//
NOLANG = 'NOLANG';
I18N = 'pwixI18n:i18n:namespace';

// the cookie name for the preferred language, defined here to be available anywhere
COOKIE_RESPONSIBLE = 'pwix:i18n';
COOKIE_PREFERRED_LANGUAGE = 'preferred_language';
COOKIE_PREFERRED_LANGUAGE_STORE = 'pwix:i18n/preferred_language';
