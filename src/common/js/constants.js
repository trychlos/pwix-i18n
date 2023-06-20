/*
 * pwix:i18n/src/common/js/constants.js
 *
 * Is imported before config.js in order the constants be available into the conf.
 */

// internal constants
//
NOLANG = 'NOLANG';
I18N = 'pwixI18n:i18n:namespace';

// the cookie name for the preferred language, defined here to be available anywhere
COOKIE_PREFERRED_LANGUAGE = 'pwix:i18n/preferred_language';

// exported constants
//

// default language
PI_DEFAULT_LANGUAGE = 'en';

// positionning the label vs the flag in the piLanguageSelector dropdown button
PI_BTNLABEL_NONE = 'PI_BTNLABEL_NONE';
PI_BTNLABEL_LEFT = 'PI_BTNLABEL_LEFT';
PI_BTNLABEL_ABOVE = 'PI_BTNLABEL_ABOVE';
PI_BTNLABEL_RIGHT = 'PI_BTNLABEL_RIGHT';
PI_BTNLABEL_BELOW = 'PI_BTNLABEL_BELOW';

// verbosity level
PI_VERBOSE_NONE        = 0;
PI_VERBOSE_CONFIGURE   = 0x01 <<  0;
PI_VERBOSE_COMPONENTS  = 0x01 <<  1;
PI_VERBOSE_LANGUAGE    = 0x01 <<  2;
PI_VERBOSE_DUMP        = 0x01 <<  3;
