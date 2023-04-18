/*
 * /src/client/components/piLanguageSelector/piLanguageSelector.js
 *
 * A simple language selector.
 * Configurable with the provided object:
 * 
 * - languages: array of desired languages in the selector, defaulting to only the default language (en_US)
 * - buttonFlag: whether the dropdown menu button displays the flag, defaulting to true
 * - buttonLabel: whether the dropdown menu button displays the label, defaulting to true
 * - itemsFlag: whether the dropdown items display flags, defaulting to true
 * - itemsLabel: whether the dropdown items display labels, defaulting to true
 */

import '../../../common/js/index.js';

import './piLanguageSelector.html';
import './piLanguageSelector.less';

Template.piLanguageSelector.onCreated( function(){
    const self = this;

    self.PCK = {
        languages: [ DEFAULT ],
        buttonFlag: true,
        buttonLabel: true,
        itemsFlag: true,
        itemsLabel: true,

        // get a boolean parameter
        boolParm( name ){
            if( Object.keys( Template.currentData()).includes( name )){
                const w = Template.currentData()[name];
                if( w === true || w === false ){
                    self.PCK[name] = w;
                }
            }
        },

        // returns the to-be-displayed icon as a html string
        //  'alt' tag is not used here because of button and li titles
        htmlIcon( it ){
            let _icon = null;
            const _enumCb = function( lang ){
                //console.debug( 'htmlIcon', lang );
                _icon = pwixI18n.labelEx({ name: PWIXI18NS, language: lang, key: 'flagIcon' });
                return _icon === null;
            };
            pwixI18n.langEnumerate( it, _enumCb );
            _icon = _icon || pwixI18n.conf.flagNone;
            return '<img src="'+_icon+'" />';
        },

        // returns the to-be-displayed label as a html string
        htmlLabel( it ){
            return '<p>'+ self.PCK.label( it )+'</p>';
        },

        // returns the label only
        label( it ){
            let _label = null;
            const _enumCb = function( lang ){
                //console.debug( 'label', lang );
                _label = pwixI18n.labelEx({ name: PWIXI18NS, language: lang, key: 'piLanguageSelector.'+lang });
                return _label === null;
            };
            pwixI18n.langEnumerate( it, _enumCb );
            return _label || '';
        },

        // returns the 'li' title
        title( it ){
            return pwixI18n.label( PWIXI18NS, 'piLanguageSelector.li_title', self.PCK.label( it ));
        }
    };

    // get component runtime configuration
    self.autorun(() => {
        if( Object.keys(  Template.currentData()).includes( 'languages' )){
            const a = Template.currentData().languages;
            if( Array.isArray( a )){
                self.PCK.languages = a;
            }
        }
        self.PCK.boolParm( 'buttonFlag' );
        self.PCK.boolParm( 'buttonLabel' );
        self.PCK.boolParm( 'itemsFlag' );
        self.PCK.boolParm( 'itemsLabel' );
    });

    //console.debug( 'pwixi18ns=', PWIXI18NS );
});

Template.piLanguageSelector.helpers({
    // currently selected item
    active_item(){
        const PCK = Template.instance().PCK;
        let _result = '';
        let _language = pwixI18n.language();
        if( PCK.buttonFlag ){
            _result += PCK.htmlIcon( _language );
        }
        if( PCK.buttonLabel ){
            _result += PCK.htmlLabel( _language );
        }
        return _result;
    },

    // gives a localized title to the dropdown
    button_title(){
        return pwixI18n.label( PWIXI18NS, 'piLanguageSelector.button_title' );
    },

    // display a item in the dropdown
    display_item( it ){
        const PCK = Template.instance().PCK;
        const current = ( it === pwixI18n.language());
        const classLabel = current ? ' active' : '';
        const ariaLabel = current ? ' aria-current="true"' : '';
        return ''
            +'<li title="'+PCK.title( it )+'">'
            +'<a class="dropdown-item'+classLabel+'"'+ariaLabel+' href="#" pi-language-selector-id="'+it+'">'
            +PCK.htmlIcon( it )
            +PCK.htmlLabel( it )
            +'</a></li>';
    },

    // list of available languages
    items_list(){
        const PCK = Template.instance().PCK;
        return PCK.languages;
    }
});

Template.piLanguageSelector.events({
    'click .dropdown-item'( event, instance ){
        const id = $( event.currentTarget ).attr( 'pi-language-selector-id' );
        //console.debug( id );
        pwixI18n.language( id );
    }
});
