/*
 * pwix:i18n/src/common/js/startup.js
 */

import { Logger } from 'meteor/pwix:logger';

const logger = Logger.get();

Meteor.startup(() => {
    logger.verbose({ verbosity: pwixI18n.configure().verbosity, against: pwixI18n.C.Verbose.DUMP }, 'pwixI18n', pwixI18n );
});
