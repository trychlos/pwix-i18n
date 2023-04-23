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
 * - disableActive: whether to disable the currently active item, defaulting to true
 * - labelPosition: if both `buttonFlag` and `buttonLabel` are `true`, then the position of the label regarding the flag
 */

import '../../../common/js/index.js';

import './piLanguageSelector.html';
import './piLanguageSelector.less';

Template.piLanguageSelector.onCreated( function(){
    const self = this;

    self.PCK = {
        // components configuration
        languages: [ DEFAULT ],
        buttonFlag: true,
        buttonLabel: true,
        itemsFlag: true,
        itemsLabel: true,
        disableActive: true,
        labelPosition: PILS_LABEL_RIGHT,

        // components internal data
        acceptedPositions: [
            PILS_LABEL_ABOVE,
            PILS_LABEL_RIGHT,
            PILS_LABEL_BELOW,
            PILS_LABEL_LEFT
        ],

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
        self.PCK.boolParm( 'buttonLabel' );
        self.PCK.boolParm( 'itemsFlag' );
        self.PCK.boolParm( 'itemsLabel' );
        self.PCK.boolParm( 'disableActive' );
        if( Object.keys(  Template.currentData()).includes( 'labelPosition' )){
            const p = Template.currentData().labelPosition;
            if( self.PCK.acceptedPositions.includes( p )){
                self.PCK.labelPosition = p;
            } else {
                console.error( 'piLanguageSelector: invalid labelPosition', p );
            }
        }
    });

    //console.debug( 'self.PCK', self.PCK );
    console.debug( 'pwixI18n', pwixI18n );
});

Template.piLanguageSelector.helpers({
    // class of the button, depending of the relatives positions of flag and label
    buttonClass(){
        const PCK = Template.instance().PCK;
        return PCK.labelPosition;
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
        if( PCK.buttonFlag && PCK.buttonLabel ){
            let _content = '';
            switch( PCK.labelPosition ){
                case PILS_LABEL_NONE:
                    break;
                case PILS_LABEL_ABOVE:
                case PILS_LABEL_LEFT:
                    _content = _labelHtml + _flagHtml;
                    break;
                case PILS_LABEL_RIGHT:
                case PILS_LABEL_BELOW:
                    _content = _flagHtml + _labelHtml;
                    break;
            }
            //_result = '<div class="'+PCK.labelPosition+'">'+_content+'</div>';
            _result = _content;
        } else if( PCK.buttonFlag ){
            _result += _flagHtml;
        } else if( PCK.buttonLabel ){
            _result += _labelHtml;
        }
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
