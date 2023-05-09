/*
 * /src/client/components/piLanguageSelector/piLanguageSelector.js
 *
 * A simple language selector.
 * Configurable with the provided object:
 * 
 * - languages: array of desired languages in the selector, defaulting to only the default language (en)
 * - buttonFlag: whether the dropdown menu button displays the flag, defaulting to true
 * - buttonLabel: the position of the label regarding the flag, defaulting to PI_BTNLABEL_RIGHT
 * - itemsFlag: whether the dropdown items display flags, defaulting to true
 * - itemsLabel: whether the dropdown items display labels, defaulting to true
 * - disableActive: whether to disable the currently active item, defaulting to true
 */

import '../../../common/js/index.js';

import './piLanguageSelector.html';
import './piLanguageSelector.less';

Template.piLanguageSelector.onCreated( function(){
    const self = this;

    // be verbose
    if( pwixI18n.conf.verbosity & PI_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:i18n piLanguageSelector onCreated()' );
    }

    self.PCK = {
        // components configuration
        languages: [ PI_DEFAULT_LANGUAGE ],
        buttonFlag: true,
        buttonLabel: null,
        itemsFlag: true,
        itemsLabel: true,
        disableActive: true,

        // defaults
        buttonLabelDefault: PI_BTNLABEL_NONE,

        // get a boolean parameter
        boolParm( name ){
            if( Object.keys( Template.currentData()).includes( name )){
                const w = Template.currentData()[name];
                if( w === true || w === false ){
                    self.PCK[name] = w;
                } else {
                    console.error( 'piLanguageSelector: '+name+' argument expects a boolean, found', w );
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
        }
    };

    // get component runtime configuration
    self.autorun(() => {
        if( Object.keys(  Template.currentData()).includes( 'languages' )){
            const a = Template.currentData().languages;
            if( Array.isArray( a )){
                self.PCK.languages = [ ...a ];
            } else {
                console.error( 'piLanguageSelector: languages argument expects an array, found', a );
            }
        }
        self.PCK.boolParm( 'buttonFlag' );
        self.PCK.boolParm( 'itemsFlag' );
        self.PCK.boolParm( 'itemsLabel' );
        self.PCK.boolParm( 'disableActive' );
        if( Object.keys(  Template.currentData()).includes( 'buttonLabel' )){
            const p = Template.currentData().buttonLabel;
            if( pwixI18n.btnLabelPosition.includes( p )){
                self.PCK.buttonLabel = p;
            } else {
                console.error( 'piLanguageSelector: invalid buttonLabel', p );
            }
        } else {
            self.PCK.buttonLabel = self.PCK.buttonLabelDefault;
        }
    });

    //console.debug( 'self.PCK', self.PCK );
    //console.debug( 'pwixI18n', pwixI18n );
});

Template.piLanguageSelector.onRendered( function(){
    // be verbose
    if( pwixI18n.conf.verbosity & PI_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:i18n piLanguageSelector onRendered()' );
    }
});

Template.piLanguageSelector.helpers({
    // class of the button, depending of the relatives positions of flag and label
    buttonClass(){
        const PCK = Template.instance().PCK;
        return PCK.buttonLabel;
    },

    // gives a localized title to the dropdown
    buttonTitle(){
        return pwixI18n.label( PWIXI18NS, 'piLanguageSelector.button_title' );
    },

    // currently selected item
    dropdownButton(){
        const PCK = Template.instance().PCK;
        let _result = '';
        let _language = pwixI18n.language();
        let _flagHtml = PCK.htmlIcon( _language );
        let _labelHtml = PCK.htmlLabel( _language );
        switch( PCK.buttonLabel ){
            case PI_BTNLABEL_NONE:
                _result = PCK.buttonFlag ? _flagHtml : '';
                break;
            case PI_BTNLABEL_ABOVE:
            case PI_BTNLABEL_LEFT:
                _result = _labelHtml + ( PCK.buttonFlag ? _flagHtml : '' );
                break;
            case PI_BTNLABEL_RIGHT:
            case PI_BTNLABEL_BELOW:
                _result = ( PCK.buttonFlag ? _flagHtml : '' ) + _labelHtml;
                break;
        }
        //console.debug( 'dropdownButton', _result );
        return _result;
    },

    // display a item in the dropdown
    dropdownItem( it ){
        const PCK = Template.instance().PCK;
        const current = ( it === pwixI18n.language());
        let classLabel = current ? ' active' : '';
        if( current && PCK.disableActive ){
            classLabel += ' disabled';
        }
        const ariaLabel = current ? ' aria-current="true"' : '';
        let _result = ''
            +'<li>'
            +'<a class="dropdown-item'+classLabel+'"'+ariaLabel+' href="#" pi-language-selector-id="'+it+'">';
        if( PCK.itemsFlag ){
            _result += PCK.htmlIcon( it );
        }
        if( PCK.itemsLabel ){
            _result += PCK.htmlLabel( it );
        }
        _result += '</a></li>';
        return _result;
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

Template.piLanguageSelector.onDestroyed( function(){
    // be verbose
    if( pwixI18n.conf.verbosity & PI_VERBOSE_COMPONENTS ){
        console.debug( 'pwix:i18n piLanguageSelector onDestroyed()' );
    }
});
