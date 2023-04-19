/*
 * pwix:i18n/src/common/js/index.js
 */

import './config.js';
import './constants.js';
import './functions.js';
import './i18n.js';
import './store.js';

// set here the default language (from local storage or environment default locale)
//  after having defined all the methods, but before the user has any chance to configure()
pwixI18n.conf.language = pwixI18n.defaultLanguage();
