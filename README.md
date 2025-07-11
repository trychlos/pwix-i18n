# pwix:i18n

## What is it ?

Yet another very simple package to handle internationalization in Meteor, light and easy.

Aims to works both on client and server sides.

## Installation

This Meteor package is installable with the usual command:

```sh
    meteor add pwix:i18n
```

## Usage

Very simple:

```js
    import { pwixI18n } from 'meteor/pwix:i18n';

    import './myapp.i18n.de.js';
    import './myapp.i18n.en_GB.js';
    import './myapp.i18n.en-US.js';
    import './myapp.i18n.fr.js';

    const key = 'my.key';
    console.log( 'language='+i18n.language(), 'key='+key, 'translated='+i18n.label( myapp.i18n, key ));
```

or more advanced:

```js
    import { pwixI18n as i18n } from 'meteor/pwix:i18n';

    import './myapp.i18n.de.js';
    import './myapp.i18n.en_GB.js';
    import './myapp.i18n.en-US.js';
    import './myapp.i18n.fr.js';

    i18n.configure({
        language: 'fr',
        namespace: 'my_namespace',
        translations: myapp.i18n
    });

    const key = 'my.key';
    console.log( 'language='+i18n.language(), 'key='+key, 'translated='+i18n.label( 'my_namespace', key ));
```

## Translation management

### Language identification

As far as `pwix:i18n` is concerned, the way you name your translations is - generally speaking - without any importance. More, if you are writing a somewhat relatively big package or application, you will have to deal with other packages, which each will have their own way to name their translations.

Nonetheless, and besides of quasi universal usages, some sort of normalization has been set up by the [Internet Engineering Task Force](https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force) (IETF) in its [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag)

Regarding the `-` _vs_ `_` debate, the Unicode specifications, in its 3rd [Unicode Language and Locale Identifiers](https://unicode.org/reports/tr35/tr35.html#Unicode_Language_and_Locale_Identifiers) chapter, clearly states that dash and underscore separators must be treated as equivalent.

The two flavors are quasi universally found: 'en-US' (dash-separated) and 'en_US' (underscore-separated), each being widely used in its own domain (e.g. Unix world is used to use 'en_US' for naming its locales, while PHP developers for example are more easy with 'en-US').

We make our best to be compliant with both versions.

Some useful links:

- [Internet Engineering Task Force on Wikipedia](https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force)
- The [IETF](https://www.ietf.org/) itself
- [BCP 47 links on W3C](https://www.w3.org/International/core/langtags/rfc3066bis.html)

### Translations object

The available translations, whether for an application or a package, must obviously be explicitely provided to the `pwix:i18n` package. This is done through a standard Javascript object, with the simple structure :

- first key level is the language identifier
- second level and followings are up to the developer
- final value (the leaf) is the translated string.

The translated string can be a [`printf()`](https://www.npmjs.com/package/printf) format specification.

Example:

```js
    {
        de: {
            ...
        }
        en_US: {
            first: {
                second: {
                    third: "this translated string is adressed with the 'first.second.third' key"
                }
            },
            another: "this one string with the 'another' key"
        }
    }
```

But NOT:

```js
    {
        de: {
            ...
        }
        en_US: {
            'first.second.third': "pwixI18n doesn't manage this structure; you have to use another separator than the dot '.'"
            another: "this one string with the 'another' key"
        }
    }
```

At least the second level is required, i.e. the `first` and `another` ones in this example.

The translated string can be an array of strings when the developer wishes use an array:

```js
    {
        fr: {
            first: {
                second: [
                    "first translated string",
                    "second string",
                    "third string",
                    ...
                ]
            }
        }
    }
```
In this case, the `label()` method will return the array itself.

### Translations namespace

If all your translated strings are in a single data structure as a well-formed translations object, which may be the case for example for a small package or a small application, then you can just provide this single object to each method which expects a translations object.

Contrarily, if you get an object per language, and do not care of aggregating them in a single translations object, then you can ask to `pwix:i18n` to allocate a namespace for you, and manage it.

As a convenience for the developer, `pwix:i18n` methods accept a namespace string each time a translations object is expected.

Example, in an application:

```js
    pwixI18n.set( <my_application_namespace>, <my_translations_object> );
    pwixI18n.label( <my_application_namespace>, <my.key> );
```

or

```js
    pwixI18n.label( <my_translations_object>, <my.key> );
```

or

```js
    pwixI18n.set( <my_application_namespace>, <language_a>, <my_translations_object_a> );
    pwixI18n.set( <my_application_namespace>, <language_b>, <my_translations_object_b> );
    pwixI18n.label( <my_application_namespace>, <my.key> );
```

Most of the time, the application namespace will be just the name of the application, the package namespace will be just the name of the package. But entirely your choice.

Which one of these flavors will you choose mostly depends if you have chosen to have one object per language (at most), or one single object for all your managed translations. Maybe installing a namespace for a single one-object-all-translations is one call too much.

## Provides

### `pwixI18n`

The exported `pwixI18n` global object provides following items:

#### Functions

##### `pwixI18n.date( stamp )`
##### `pwixI18n.date({ format: <format>, language: <language>, stamp: <stamp> })`

Returns the date only formatted according to current `pwix:i18n` configuration, with:

- `stamp` is the Date object to be rendered
- `language` defaults to currently configured language
- `format` defaults to configured date style, according to [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

##### `pwixI18n.dateTime( stamp [, language] )`
##### `pwixI18n.dateTime({ format: <format>, language: <language>, stamp: <stamp> })`

Returns the stamp formatted according to current `pwix:i18n` configuration, with:

- `stamp` is the Date object to be rendered
- `language` defaults to currently configured language
- `format` defaults to configured date and time styles, according to [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

##### `pwixI18n.defaultLanguage()`

Returns the default language which has been automatically computed at startup.

This has nothing to do with the language set via the `pwixI18n.configure()` method. Rather this is the default value computed by the package if no language at all is configured.

##### `pwixI18n.defaultLocale()`

Returns the current default locale for this runtime environment, as best as we can guess...

##### `pwixI18n.group( namespace, key )`

Returns the specified content.

May be useful when the translation file contains for example an array of strings...

##### `pwixI18n.label( namespace|translations_object, key, ... )`

Returns the localized string.

When supplementary arguments are provided, they are used according to the standard `printf()` specifications.

Because it depends of `pwixI18n.language()` reactive data source, it is itself able to react to language changes.

##### `pwixI18n.labelEx()`

An extension of the previous `pwixI18n.label` which also returns the localized string.

Differences is that this method takes arguments as a single object, with:

- name: mandatory, either a namespace or a translations object,
- key: mandatory, the name of the to-be-translated string
- language, optional, the language identifier, defaulting to the current language.

Letting the language be specified, this method allows the caller to ask for a translation different from the current one.

When additional arguments are provided, they are used according to the standard `printf()` specifications.

##### `pwixI18n.langEnumerate( language, cb )`

This method will call the provided `cb` callback with each to-be-tested language, starting with the provided identifer.

The callback may return `false` to stop the enumeration.

Example:
- if language='en_US', the callback will be successively called with 'en-US' and 'en' languages.

This is not a typo: internally `pwix:i18n` replaces underscores with hyphens, and so will be triggered the callback.

Callback prototype is `cb( language )`.

##### `pwixI18n.language( [language] )`

As a getter, returns the configured language, making sure it is not null, defaulting to hardcoded default language.

A reactive data source.

As a setter, configure the desired language.

##### `pwixI18n.namespace( namespace, translations_object )`
##### `pwixI18n.namespace( namespace, language, keyed_translated_strings )`
##### `pwixI18n.namespace({ language: <language>, namespace: <namespace>, translations: <translations_object> })`

Setup the managed translations for this namespace.

- in the first form, `language` is not specified, it is then expected that the `translations_object` is a standard translation object as described above,
  i.e an object keyed by language identifier(s), where values are keyed translated strings for these languages

- in the second form, with a specified `language`, then it is expected that `keyed_translated_strings` is just an object with keyed strings, without the language identifier level.

- the third accepted form accepts these same arguments inside of a single object, the `translations` key providing either a translation object or keyed translated strings depending of wether a `language` key is specified or not

Successive calls are additive: successively provided translations objects are added to the same namespace.

#### Constants

##### Label position

    - `pwixI18n.C.BtnLabel.NONE`
    - `pwixI18n.C.BtnLabel.LEFT`
    - `pwixI18n.C.BtnLabel.ABOVE`
    - `pwixI18n.C.BtnLabel.RIGHT`
    - `pwixI18n.C.BtnLabel.BELOW`

##### Hardcoded default language

    - `pwixI18n.C.Defaults.language`

##### Verbosity levels

    - `pwixI18n.C.Verbose.NONE`
    - `pwixI18n.C.Verbose.CONFIGURE`
    - `pwixI18n.C.Verbose.COMPONENTS`
    - `pwixI18n.C.Verbose.LANGUAGE`

##### `pwixI18n.btnLabelPosition`

The known positions of the label in the `piLanguageSelector` component, as an array.

### Blaze components

#### `piLanguageSelector`

A simple language selector, built as a Bootstrap dropdown

- An example of the dropdown button with default english

    ![dropdown button](/maintainer/png/english-dropdown.png)

- An example of the opened menu with two languages

    ![Example of the opened menu with two languages](/maintainer/png/opened-menu.png)

The component is configurable with an object passed as an argument, which may contain:

- `languages`

    An array of the languages to be displayed as dropdown items, defaulting to the single default language (`[ 'en' ]`).

    The provided array should at least include the default `pwixI18n.C.Defaults.language` language.

- `buttonFlag`

    Whether the country flag icon should be displayed in the dropdown menu button, defaulting to `true`.

- `buttonLabel`

    Where the language label should be displayed in the dropdown menu button, defaulting to `pwixI18n.C.BtnLabel.NONE`.

    Possible values are those recorded in `pwixI18n.btnLabelPosition` reference array.

- `itemsFlag`

    Whether the country flag icon should be displayed in the dropdown items, defaulting to `true`.

- `itemsLabel`

    Whether the language label should be displayed in the dropdown items, defaulting to `true`.

- `disableActive`

    Whether to disable the currently active item, defaulting to `true`.

### Blaze helper

#### `_`

Example:

```html
    {{_ namespace key }}
```

Obviously only available on the client.

## Configuration

The package's behavior can be configured through a call to the `pwixI18n.configure()` method, with just a single javascript object argument, which itself should only contains the options you want override.

Known configuration options are:

- `dateStyle`

    The way dates must be displayed, defaulting to `short`.

    See [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) for a specification reference.

- `language`

    The chosen language.

    If not explicitly configured, `pwix:i18n` makes its best to provide a suitable default:

    - if a previously chosen language has been stored on the local device, and the user has allowed the user of _cookies_ (if anyone has asked him), then use it (please note that this local storage is user-independant and device-only),

    - else use the language provided by the `pwixI18n.defaultLocale()` method,

    - else use the hardcoded `pwixI18n.C.Defaults.language`.

    In all cases, the language may also be defined later via the `pwixI18n.language()` method.

    A word of caution: if you, as an application developer, configure here a particular language, you are actually overriding the above default computing. So be sure of knowing what you do.

- `managed`

    An array of languages that the application is willing to manage.

    Default to just (`[ 'en' ]`).

- `storePreferredLanguage`

    Whether the application plans to let the user choose his preferred language, and store this preference as a local data.

    When enabled, this option will create a _cookie_, that the user may refuse.

    Default to `true`.

- `timeStyle`

    The way times must be displayed, defaulting to `medium`.

    See [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) for a specification reference.

- `verbosity`

    Define the expected verbosity level.

    The accepted value can be any or-ed combination of following:

    - `pwixI18n.C.Verbose.NONE`

        Do not display any trace log to the console

    - `pwixI18n.C.Verbose.COMPONENTS`

        Trace Blaze components life:

        - creation
        - rendering
        - destruction

    - `pwixI18n.C.Verbose.CONFIGURE`

        Trace `pwixI18n.configure()` calls and their result

    - `pwixI18n.C.Verbose.DUMP`

        Dump the `pwixI18n` global object at startup.

    - `pwixI18n.C.Verbose.LANGUAGE`

        Trace language computings.

Please note that `pwixI18n.configure()` method should be called in the same terms both in client and server sides.

Also note, as an explicit reminder for the fools, that, because the Meteor packages are instanciated at application level, they can be configured once at most, and only once at most. Each addtionnal call to `pwixI18n.configure()` will just override the previous one. You have been warned: **only the application should configure a package**.

## NPM peer dependencies

Starting with v 1.1.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#peer-npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`.

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 1.5.0:

```js
    'bootstrap': '^5.2',
    'lodash': '^4.17.0',
    '@popperjs/core': '^2.11.6',
    'printf': '^0.6.1'
```

## Translations

New and updated translations are willingly accepted, and more than welcome. Just be kind enough to submit a PR on the [Github repository](https://github.com/trychlos/pwix-i18n/pulls).

## Cookies and comparable technologies

`pwix:i18n` may use `localStorage` to record some valuable data.

### `pwix:i18n/preferred_language`

The last chosen language.

Allowed/disallowed through the `storePreferredLanguage` configuration parameter.

This is considered a disableable functional _cookie_, and is advertised as such to the CookieManager if present.

## Issues & help

In case of support or error, please report your issue request to our [Issues tracker](https://github.com/trychlos/pwix-i18n/issues).

---
P. Wieser
- Last updated on 2025, Jul. 7th