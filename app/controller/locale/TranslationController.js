/**
 * Created by luis_blanco on 4/5/2015.
 */
Ext.define('Packt.controller.locale.TranslationController', {

    extend: 'Ext.app.Controller',

    alias: 'controller.translation',

    init: function () {
        var lang = localStorage ? (localStorage.getItem('user-lang') || 'en') : 'en',
            me = this,
            button = me.getView();

        button.setIconCls(lang);

        if (lang == 'en') {
            button.setText('English');
        } else if (lang == 'es') {
            button.setText('Español');
        } else {
            button.setText('Português');
        }
    },

    onMenuItemClick: function (item, e, options) {

        //console.log('In onMenuItemClick of TranslationController');

        //debugger;

        var me = this,
            menu = me.getView();

        menu.setIconCls(menu.iconCls);
        menu.setText(item.text);

        localStorage.setItem('user-lang', item.iconCls);

        window.location.reload();
    }
});