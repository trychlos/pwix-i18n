# pwix:i18n

## ChangeLog

### 1.3.3-rc

    Release date: 

    - Replace merge dependency with lodash
    - configure() now acts both as a getter and a setter
    - Rename conf to _conf, making clearer that this is a private data

### 1.3.2

    Release date: 2023- 6- 2

    - piLanguageSelector default label position is now PI_BTNLABEL_NONE
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
    - Define 'en' as default language, and export it as PI_DEFAULT_LANGUAGE
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
- Last updated on 2023, June, 2nd
