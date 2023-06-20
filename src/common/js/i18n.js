/*
 * pwix:i18n/src/common/js/i18n.js
 */

import '../i18n/de.js';
import '../i18n/en.js';
import '../i18n/en_US.js';
import '../i18n/fr.js';
import '../i18n/fr_FR.js';
import '../i18n/sp.js';

pwixI18n.namespace( I18N, pwixI18n.i18n );

/**
 * @returns {String} the i18n namespace of this package
 */
pwixI18n.i18n.namespace = function(){
    return I18N;
}
