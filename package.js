Package.describe({
    name: 'pwix:i18n',
    version: '1.3.3-rc',
    summary: 'A Meteor internationalization package',
    git: 'https://github.com/trychlos/pwix-i18n',
    documentation: 'README.md'
});

Package.onUse( function( api ){
    configure( api );
    api.export([
        'pwixI18n',
        'PI_BTNLABEL_NONE',
        'PI_BTNLABEL_LEFT',
        'PI_BTNLABEL_ABOVE',
        'PI_BTNLABEL_RIGHT',
        'PI_BTNLABEL_BELOW',
        'PI_DEFAULT_LANGUAGE',
        'PI_VERBOSE_NONE',
        'PI_VERBOSE_CONFIGURE',
        'PI_VERBOSE_COMPONENTS',
        'PI_VERBOSE_DUMP',
        'PI_VERBOSE_LANGUAGE'
    ]);
    api.mainModule( 'src/client/js/index.js', 'client' );
    api.mainModule( 'src/server/js/index.js', 'server' );
});

Package.onTest( function( api ){
    configure( api );
    api.use( 'tinytest' );
    api.use( 'pwix:i18n' );
    api.mainModule( 'test/js/index.js' );
});

function configure( api ){
    api.versionsFrom( '2.9.0' );
    api.use( 'blaze-html-templates@2.0.0', 'client' );
    api.use( 'ecmascript' );
    api.use( 'less@4.0.0', 'client' );
    api.use( 'tmeasday:check-npm-versions@1.0.2', 'server' );
    api.addFiles( 'src/client/components/piLanguageSelector/piLanguageSelector.js', 'client' );
    api.addAssets([
        // from https://www.monsieur-des-drapeaux.com/
        'resources/png/flag-allemagne.png',
        'resources/png/flag-autriche.png',
        'resources/png/flag-belgique.png',
        'resources/png/flag-bulgarie.png',
        'resources/png/flag-chypre.png',
        'resources/png/flag-croatie.png',
        'resources/png/flag-danemark.png',
        'resources/png/flag-en.png',
        'resources/png/flag-espagne.png',
        'resources/png/flag-estonie.png',
        'resources/png/flag-etats-unis.png',
        'resources/png/flag-europe.png',
        'resources/png/flag-finlande.png',
        'resources/png/flag-france.png',
        'resources/png/flag-grece.png',
        'resources/png/flag-hongrie.png',
        'resources/png/flag-irlande.png',
        'resources/png/flag-italie.png',
        'resources/png/flag-lettonie.png',
        'resources/png/flag-lituanie.png',
        'resources/png/flag-luxembourg.png',
        'resources/png/flag-malte.png',
        'resources/png/flag-none.png',
        'resources/png/flag-pays-bas.png',
        'resources/png/flag-pologne.png',
        'resources/png/flag-portugal.png',
        'resources/png/flag-republique-tcheque.png',
        'resources/png/flag-roumanie.png',
        'resources/png/flag-royaume-uni.png',
        'resources/png/flag-slovaquie.png',
        'resources/png/flag-slovenie.png',
        'resources/png/flag-suede.png'
    ], [
        'client', 'server'
    ]);
}

// NPM dependencies are checked in /src/server/js/check_npms.js
// See also https://guide.meteor.com/writing-atmosphere-packages.html#npm-dependencies
