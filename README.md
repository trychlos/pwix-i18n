# pwix:i18n

## What is it

Yet another very simple package to handle internationalization in Meteor.

Aims to works both on client and server sides.

## Usage

```
import { pwixI18n as i18n } from 'meteor/pwix:i18n';

import './myapp.fr_FR.i18n.js';

i18n.configure({ language: 'fr_FR' });

const namespace = 'myapp';
i18n.set( namespace, myapp.fr );

const key = 'my.key';
console.log( 'language='+i18n.language, 'key='+key, 'translated='+i18n.label( namespace, key ));
```

## Configuration

The package's behavior is configurable via the `pwixI18n.configure()` function, callable with options as a single object parameter.

Only options to be modified have to be provided. Known options are:

<table>
<tr><td style="vertical-align:top;">
language
</td><td style="vertical-align:top;">
The chosen language, defaulting to 'en_US'.
</td></tr>

<tr><td style="vertical-align:top;">
dateStyle
</td><td style="vertical-align:top;">
The way dates must be displayed, defaulting to 'short'.<br />
Reference is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat</a>
</td></tr>

<tr><td style="vertical-align:top;">
timeStyle
</td><td style="vertical-align:top;">
The way times must be displayed, defaulting to 'medium'.<br />
Reference is <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat</a>
</td></tr>
</table>

Please note that `pwixI18n.configure()` call MUST be made in exactly the same terms both in client and server sides.

## Translation management

### Translations namespaces

The available translations, whether for an application or a package, must obviously be provided to the package.
They can be namespaced, or not.

In all your translated strings are in a single object, which may be the case for example for a small package or a small application, then you can just provide this single object to each function which expects a namespace.

Contrarily, if you get an object per language, then you should probably let pwixI18n allocate a namespace for you, and manage it.

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

Example, in a package:

```
pwixI18n.set( <my_package_namespace>, <my_translations_object> );
...
pwixI18n.label( <my_package_namespace>, <my.key> );
```
or
```
pwixI18n.label( <my_translations_object>, <my.key> );
```
or
```
pwixI18n.set( <my_package_namespace>, <language_a>, <my_translations_object_a> );
pwixI18n.set( <my_package_namespace>, <language_b>, <my_translations_object_b> );
...
pwixI18n.label( <my_package_namespace>, <my.key> );
```

Most of the time, the application namespace is just the name of the application, the package namespace is just the name of the package. But entirely your choice.

Which one of these flavors will you choose mostly depends if you have chosen to have one object per language (at most), or one single object for all your managed translations. Maybe installing a namespace for a single one-object-all-translations is one call too much.

But, nonetheless, please note that:

- this choice MUST be made once per namespace (resp. per application, per package)

- whether you call `pwixI18n.set()` on client or server side will determine in which side the translations will be made available.

    It is common practice to call the function wich the same full set ob both client and server side.

### Keys namespace

The translation object provided to `pwixI18n.set()` is a standard Javascript object, with a simple structure :

- first key level is the language
- second level and followings are up to the developer
- final value (the leaf) is the translated string.

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

## Provides

### Global object

`pwixI18n`

### Methods

`pwixI18n.date( stamp [, language] )`

Returns the date only formatted according to i18n configuration.

`pwixI18n.dateTime( stamp [, language] )`

Returns the stamp formatted according to i18n configuration.

`pwixI18n.label( namespace, key, ... )`

Returns the localized string.<br />
When supplementary arguments are provided, they are used according to the standard `printf()` specifications.

`pwixI18n.language()`

Returns the configured language, making sure it is not null, defaulting to 'en-US'.

`pwixI18n.set( namespace, translations )`

Setup the managed translations for this namespace.

### Blaze helper

`_`

Example:

```
    {{_ namespace key }}
```

Obviously only available on the client.

---
P. Wieser
- Last updated on 2023, Jan. 28th
