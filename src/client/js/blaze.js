/*
 * pwix:i18n/src/client/js/blaze.js
 *
 * Register global helpers.
 */

import { Template } from 'meteor/templating';

import '../../common/js/index.js';

// translation helper
//  expects two arguments:
//  - namespace or translations object or function
//  - key
Template.registerHelper( '_', function( namespace, key ){
    return pwixI18n.label( namespace, key );
});
