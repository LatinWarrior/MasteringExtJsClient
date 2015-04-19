/**
 * Created by luis_blanco on 4/5/2015.
 */
Ext.define('Packt.controller.locale.TranslationManager', {

    extend: 'Ext.app.Controller',

    alias: 'controller.translation',

    views: [
        'Packt.view.locale.Translation'
    ],

    refs: [
        {
            ref: 'translation', // #2
            selector: 'translation'
        }
    ],

    init: function () {

        var me = this;

        me.control({
            "translation menuitem": { // #3
                click: me.onMenuItemClick
            },
            "translation": { // #4
                beforerender: me.onSplitButtonBeforeRender
            }
        });


    },

    onMenuItemClick: function (item, e, options) {

        //console.log('In onMenuItemClick of TranslationController');

        debugger;

        var me = this,
            menu = me.getTranslation(); // #9

        //var me = this,
        //    menu = me.getView();

        menu.setIconCls(menu.iconCls);
        menu.setText(item.text);

        localStorage.setItem('user-lang', item.iconCls);

        window.location.reload();
    },

    onSplitButtonBeforeRender: function (abstractcomponent, options) {

        // abstractcomponent is the button.

        var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en',
            me = this;
        //button = me.getView();

        abstractcomponent.iconCls = lang; // #6

        abstractcomponent.setIconCls(lang);

        if (lang == 'en') {
            abstractcomponent.setText('English');
        } else if (lang == 'es') {
            abstractcomponent.setText('Español');
        } else {
            abstractcomponent.setText('Português');
        }
    }
});