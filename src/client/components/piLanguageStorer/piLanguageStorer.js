/*
 * /src/client/components/piLanguageStorer/piLanguageStorer.js
 */

import './piLanguageStorer.html';

Template.piLanguageStorer.onCreated( function(){
    const self = this;

    self.APP = {

        // returns the to-be-displayed icon as a html string
        //  'alt' tag is not used for this image because of button and li titles
        htmlIcon( it ){
            const icon = Meteor.APP.i18n[it].icon || Meteor.settings.public[Meteor.APP.name].general.drapeau.path;
            return '<img src="'+icon+'" />';
        },

        // returns the to-be-displayed label as a html string
        htmlLabel( it ){
            const label = pwixI18n.label( I18N, 'piLanguageStorer.'+it );
            return '<p>'+ self.APP.label( it )+'</p>';
        },

        // returns the label only
        label( it ){
            return label = pwixI18n.label( I18N, 'piLanguageStorer.'+it );
        },

        // returns the 'li' title
        title( it ){
            return pwixI18n.label( I18N, 'piLanguageStorer.li_title', self.APP.label( it ));
        }
    };
});

Template.piLanguageStorer.helpers({
    //currently selected item
    active_item(){
        const APP = Template.instance().APP;
        return APP.htmlIcon( pwixI18n.language());
    },

    // gives a localized title to the dropdown
    button_title(){
        return pwixI18n.label( I18N, 'piLanguageStorer.button_title' );
    },

    // display a item in the dropdown
    display_item( it ){
        const APP = Template.instance().APP;
        const current = ( it === pwixI18n.language());
        const classLabel = current ? ' active' : '';
        const ariaLabel = current ? ' aria-current="true"' : '';
        return ''
            +'<li title="'+APP.title( it )+'">'
            +'<a class="dropdown-item'+classLabel+'"'+ariaLabel+' href="#" language-selector-id="'+it+'">'
            +APP.htmlIcon( it )
            +APP.htmlLabel( it )
            +'</a></li>';
    },

    // list of available languages
    items_list(){
        return Object.keys( Meteor.APP.i18n );
    }
});

Template.piLanguageStorer.events({
    'click .dropdown-item'( event, instance ){
        const id = $( event.currentTarget ).attr( 'language-selector-id' );
        //console.debug( id );
        pwixI18n.language( id );
    }
});
