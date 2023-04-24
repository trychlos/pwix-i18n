Package.describe({
    name: 'pwix:i18n',
    version: '1.2.1-rc',
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
        'PI_BTNLABEL_BELOW'
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
        'images/flag-allemagne.png',
        'images/flag-autriche.png',
        'images/flag-belgique.png',
        'images/flag-bulgarie.png',
        'images/flag-chypre.png',
        'images/flag-croatie.png',
        'images/flag-danemark.png',
        'images/flag-en.png',
        'images/flag-espagne.png',
        'images/flag-estonie.png',
        'images/flag-etats-unis.png',
        'images/flag-europe.png',
        'images/flag-finlande.png',
        'images/flag-france.png',
        'images/flag-grece.png',
        'images/flag-hongrie.png',
        'images/flag-irlande.png',
        'images/flag-italie.png',
        'images/flag-lettonie.png',
        'images/flag-lituanie.png',
        'images/flag-luxembourg.png',
        'images/flag-malte.png',
        'images/flag-none.png',
        'images/flag-pays-bas.png',
        'images/flag-pologne.png',
        'images/flag-portugal.png',
        'images/flag-republique-tcheque.png',
        'images/flag-roumanie.png',
        'images/flag-royaume-uni.png',
        'images/flag-slovaquie.png',
        'images/flag-slovenie.png',
        'images/flag-suede.png'
    ], [
        'client', 'server'
    ]);
}

// NPM dependencies are checked in /src/server/js/check_npms.js
// See also https://guide.meteor.com/writing-atmosphere-packages.html#npm-dependencies
