Package.describe({
    name: 'pwix:i18n',
    version: '1.0.0',
    summary: 'A Meteor internationalization package',
    git: 'https://github.com/trychlos/pwix-i18n',
    documentation: 'README.md'
});

Package.onUse( function( api ){
    configure( api );
    api.export([
        'pwixI18n'
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
    api.versionsFrom( '1.8.1' );
    api.use( 'ecmascript' );
    api.use( 'pwi:string-prototype' );
}

Npm.depends({
    'printf': '0.6.1'
});
