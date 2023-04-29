/*
 * pwix:i18n/src/common/js/index.js
 */

import './constants.js';
import './config.js';
//
import './functions.js';
import './i18n.js';
import './startup.js';
import './store.js';

// set here the default language (from local storage or environment default locale)
//  after having defined all the methods, but before the user has any chance to configure()
//console.debug( pwixI18n );
pwixI18n.conf.language = pwixI18n.defaultLanguage();
