/*
 * pwix:i18n/src/common/js/constants.js
 */

// internal constants
//
NOLANG = 'NOLANG';
PWIXI18NS = 'pwixI18n:namespace';

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

pwixI18n.btnLabels = [
    PI_BTNLABEL_NONE,
    PI_BTNLABEL_ABOVE,
    PI_BTNLABEL_RIGHT,
    PI_BTNLABEL_BELOW,
    PI_BTNLABEL_LEFT
];

// verbosity level
PI_VERBOSE_NONE        = 0;
PI_VERBOSE_CONFIGURE   = 0x01 <<  0;
PI_VERBOSE_COMPONENTS  = 0x01 <<  1;
PI_VERBOSE_LANGUAGE    = 0x01 <<  2;
