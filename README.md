# pwix:i18n - README

## What is it

Yet another very simple package to handle internationalization in Meteor, light and easy.

Aims to works both on client and server sides.

## Usage

```
import { pwixI18n as i18n } from 'meteor/pwix:i18n';

import './myapp.de.i18n.js';
import './myapp.en_GB.i18n.js';
import './myapp.en-US.i18n.js';
import './myapp.fr_FR.i18n.js';

i18n.configure({
    language: 'fr',
    namespace: 'my_namespace',
    translations: myapp
});

const key = 'my.key';
console.log( 'language='+i18n.language(), 'key='+key, 'translated='+i18n.label( 'my_namespace', key ));
```

## Translation management

### Language identification

As far as `pwixI18n` is concerned, the way you name your translations is - generally speaking - without any importance. More, if you are writing a somewhat relatively big package or application, you will have to deal with other packages, which each will have their own way to name their translations.

Nonetheless, and besides of quasi universal usages, some sort of normalization has been set up by the [Internet Engineering Task Force](https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force) (IETF) in its [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag)

Regarding the `-` _vs_ `_` debate, the Unicode specifications, in its 3rd [Unicode Language and Locale Identifiers](https://unicode.org/reports/tr35/tr35.html#Unicode_Language_and_Locale_Identifiers) chapter, clearly states that dash and underscore separators must be treated as equivalent.

The two flavors are quasi universally found: 'en-US' (dash-separated) and 'en_US' (underscore-separated), each being widely used in its own domain (e.g. Unix world is used to use 'en_US' for naming its locales, while PHP developers for example are more easy with 'en-US').

We make our best to be compliant with both versions.

Some useful links:

- [Internet Engineering Task Force on Wikipedia](https://en.wikipedia.org/wiki/Internet_Engineering_Task_Force)
- The [IETF](https://www.ietf.org/) itself
- [BCP 47 links on W3C](https://www.w3.org/International/core/langtags/rfc3066bis.html)

### Translations object

The available translations, whether for an application or a package, must obviously be provided to the `pwixI18n` package.

The translations object to be provided to `pwixI18n` is a standard Javascript object, with a simple structure :

- first key level is the language identifier
- second level and followings are up to the developer
- final value (the leaf) is the translated string.

The translated string can be a [`printf()`](https://www.npmjs.com/package/printf) format specification.

Example:

```
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
```
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
```
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

Contrarily, if you get an object per language, and do not care of aggregating them in a single translations object, then you can ask to `pwixI18n` to allocate a namespace for you, and manage it.

As a convenience for the developer, the `pwixI18n` methods accept a namespace string each time a translations object is expected.

Example, in an application:

```
pwixI18n.set( <my_application_namespace>, <my_translations_object> );
...
pwixI18n.label( <my_application_namespace>, <my.key> );
```
or
```
pwixI18n.label( <my_translations_object>, <my.key> );
```
or
```
pwixI18n.set( <my_application_namespace>, <language_a>, <my_translations_object_a> );
pwixI18n.set( <my_application_namespace>, <language_b>, <my_translations_object_b> );
...
pwixI18n.label( <my_application_namespace>, <my.key> );
```

Most of the time, the application namespace will be just the name of the application, the package namespace will be just the name of the package. But entirely your choice.

Which one of these flavors will you choose mostly depends if you have chosen to have one object per language (at most), or one single object for all your managed translations. Maybe installing a namespace for a single one-object-all-translations is one call too much.

## Configuration

The package's behavior is configurable via the `pwixI18n.configure()` function, callable with options as a single object parameter.

Only options to be modified have to be provided. Managed options are:

<table>
<tr><td style="vertical-align:top;">
<tr><td style="vertical-align:top;">
dateStyle
</td><td style="vertical-align:top;">
The way dates must be displayed, defaulting to <code>short</code>.<br />
Reference is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat</a>
</td></tr>

language
</td><td style="vertical-align:top;">
The chosen language.<br />
If not configured, <code>pwixI18n</code> makes its best to provide a suitable default:
- if a previously chosen language has been stored on the local device, then use it (please note that this local storage is user-independant and device-only)
- else use the language provided by the <code>pwixI18n.defaultLocale()</code> method.
In all cases, the language may also be defined later via the <code>pwixI18n.language()</code> method.<br />
A word of caution: if you, as an application developer, configure here a particular language, you are actually overriding the above default computing. So be sure of knowing what you do.
</td></tr>

<tr><td style="vertical-align:top;">
namespace
</td><td style="vertical-align:top;">
Optionally, the namespace string to be used.<br />
If not configured, the namespace may be defined later via the <code>pwixI18n.namespace()</code> method (or not used at all).
</td></tr>

<tr><td style="vertical-align:top;">
timeStyle
</td><td style="vertical-align:top;">
The way times must be displayed, defaulting to <code>medium</code>.<br />
Reference is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat</a>
</td></tr>

<tr><td style="vertical-align:top;">
translations
</td><td style="vertical-align:top;">
Optionally, the translations object.<br />
If not configured, the translations object may be either passed to the corresponding methods, or set when calling the <code>pwixI18n.namespace()</code> method.
</td></tr>
</table>

Please note that `pwixI18n.configure()` method SHOULD be called made in exactly the same terms both in client and server sides.

## Provides

### Global object

`pwixI18n`

### Methods

#### `pwixI18n.date( stamp )`
#### `pwixI18n.date({ format: <format>, language: <language>, stamp: <stamp> })`

Returns the date only formatted according to current `pwixI18n` configuration, with:

- `stamp` is the Date object to be rendered
- `language` defaults to currently configured language
- `format` defaults to configured date style

#### `pwixI18n.dateTime( stamp [, language] )`
#### `pwixI18n.dateTime({ format: <format>, language: <language>, stamp: <stamp> })`

Returns the stamp formatted according to current `pwixI18n` configuration, with:

- `stamp` is the Date object to be rendered
- `language` defaults to currently configured language
- `format` defaults to configured date and time styles

#### `pwixI18n.defaultLanguage()`

Returns the default language which has been automatically be configured at startup.

THis has nothing to do with the language set via the `configure()` method. Rather this is the default value computed by the package if no language at all is configured.

#### `pwixI18n.defaultLocale()`

Returns the current default locale of the user, as best as we can guess...

#### `pwixI18n.group( namespace, key )`

Returns the specified content.<br />
May be useful when the translation file contains for example an array of strings...

#### `pwixI18n.label( namespace|translations_object, key, ... )`

Returns the localized string.<br />
When supplementary arguments are provided, they are used according to the standard `printf()` specifications.

#### `pwixI18n.language( [language] )`

As a getter, returns the configured language, making sure it is not null, defaulting to 'en-US'.

A reactive data source.

As a setter, configure the desired language.

#### `pwixI18n.langEnumerate( language, cb )`

This method will call the provided `cb` callback with each to-be-tested language, starting with the provided identifer.

The callback may return `false` to stop the enumeration.

Example:
- if language='en_US', the callback will be called with 'en-US' and 'en' languages.

This is not a typo: internally `pwixI18n` replaces underscores with hyphens, and so will be triggered the callback.

Callback prototype is `cb( language )`.

#### `pwixI18n.namespace( namespace, translations_object )`
#### `pwixI18n.namespace( namespace, language, keyed_translated_strings )`
#### `pwixI18n.namespace({ language: <language>, namespace: <namespace>, translations: <translations_object> })`

Setup the managed translations for this namespace.

- in the first form, `language` is not specified, it is then expected that the `translations_object` is a standard translation object as described above,
  i.e an object keyed by language identifier(s), where values are keyed translated strings for these languages

- in the second form, with a specified `language`, then it is expected that `keyed_translated_strings` is just an object with keyed strings, without the language identifier level.

- the third accepted form accepts these same arguments inside of a single object, the `translations` key providing either a translation object or keyed translated strings depending of wether a `language` key is specified or not

Successive calls are additive: successively provided translations objects are added to the same namespace.

### Blaze helper

`_`

Example:

```
    {{_ namespace key }}
```

Obviously only available on the client.

### Blaze components

### piLanguageSelector

A simple language selector, built as a Bootstrap dropdown.

The component is configurable with an object passed as an argument, and may contain:

- languages: an array of the languages to be displayed as dropdown items, defaulting to the single default language (`'en_US`)
- buttonFlag: whether the country flag icon should be displayed in the dropdown menu button, defaulting to `true`
- buttonLabel: whether the language label should be displayed in the dropdown menu button, defaulting to `true`
- itemsFlag: whether the country flag icon should be displayed in the dropdown items, defaulting to `true`
- itemsLabel: whether the language label should be displayed in the dropdown items, defaulting to `true`

## NPM peer dependencies

Starting with v 1.1.0, and in accordance with advices from [the Meteor Guide](https://guide.meteor.com/writing-atmosphere-packages.html#npm-dependencies), we no more hardcode NPM dependencies in the `Npm.depends` clause of the `package.js`. 

Instead we check npm versions of installed packages at runtime, on server startup, in development environment.

Dependencies as of v 1.3.0:
```
    'bootstrap': '^5.2',
    'printf': '^0.6.1'
```
Each of these dependencies should be installed at application level:
```
    meteor npm install <package> --save
```
---
P. Wieser
- Last updated on 2023, Apr. 18th
