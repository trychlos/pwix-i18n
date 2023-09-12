# pwix:i18n

## ChangeLog

### 1.5.5

    Release date: 2023- 9-12

    - Back to Meteor 2.9.0

### 1.5.4

    Release date: 2023- 9-11

    - Fix pwixI18n.group() arguments name

### 1.5.3

    Release date: 2023- 9-11

    - Fix CookieManager publication at startup

### 1.5.2

    Release date: 2023- 9-10

    - Add missed global.js to git
    - Fix usage of constant when calling CookieManager.publish()
    - Optimize BtnLabelPosition array building
    - Minor optimization in piLanguageSelector component

### 1.5.1

    Release date: 2023- 9-10

    - Fix the global definition

### 1.5.0

    Release date: 2023- 9-10

    - Improve stylesheet (todo #7)
    - Constants PI_ are replaced with pwixI18n.C. (bumping release candidate number) (todo #10)
    - Update to most recent version of CookieManager (todo #9)
    - Change 'storePreferredLanguage' default to true
    - Bump Meteor required version to 2.13.2

### 1.4.0

    Release date: 2023- 6-22

    - Fix release dates in the documentation
    - Fix configure() checks

    Bump minor version number here as this should have been done on v 1.3.3 release, because of new (backward-compatible) API.

### 1.3.3

    Release date: 2023- 6-20

    - New pwixI18n.i18n.namespace() method returns the i18n namespace of this package (todo #6)
    - Replace merge dependency with lodash
    - configure() now acts both as a getter and a setter
    - Rename conf to _conf, making clearer that this is a private data
    - Merge defaults.js and config.js into configure.js

### 1.3.2

    Release date: 2023- 6- 2

    - piLanguageSelector default label position is now pwixI18n.C.BtnLabel.NONE
    - Fix piLanguageSelector display on small devices
    - Fix pwixI18n.label() when there are additional arguments
    - Add @popperjs/core missing dependecy (todo #5)

### 1.3.1

    Release date: 2023- 4-30

    - Fix ChangeLog

### 1.3.0

    Release date: 2023- 4-30

    - New piLanguageSelector configurable component
    - Introduce new storePreferredLanguage configuration parameter to record the user preference
    - Introduce a configurable array of languages managed by the application
    - Introduce a configurable verbosity level
    - Define 'en' as default language, and export it as pwixI18n.C.Defaults.language
    - pwixI18n.language() becomes a reactive data source
    - New pwixI18n.defaultLocale() method
    - New pwixI18n.labelEx() method
    - New pwixI18n.langEnumerate() method
    - Add Bootstrap and merge dependencies
    - Obsoletes pwixI18n.set() method for new pwixI18n.namespace() one: will be removed on v 2.0 version

### 1.2.0

    Release date: 2023- 2-15

    - Add pwixI18n.group() method

### 1.1.1

    Release date: 2023- 2- 2

    - Restrict tmeasday:check-npm-versions to server side

### 1.1.0

    Release date: 2023- 1-31

    - Replace hardcoded NPM dependencies with tmeasday:check-npm-versions (runtime, development environment only)

### 1.0.1

    Release date: 2023- 1-30

    - Add compliance with both dash ('-') and underscore ('_') separated language identifiers

### 1.0.0

    Release date: 2023- 1-28

    - Initial release

---
P. Wieser
- Last updated on 2023, Sept. 12th
