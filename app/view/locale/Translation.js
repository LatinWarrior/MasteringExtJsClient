/**
 * Created by luis_blanco on 4/5/2015.
 */
Ext.define('Packt.view.locale.Translation',{

    extend: 'Ext.button.Split',

    //requires: ['Packt.controller.locale.TranslationController'],
    //
    //controller: 'translation',

    xtype: 'translation',

    menu: {
        xtype: 'menu',
        defaults:{
            listeners: {
                click: 'onMenuItemClick'
            }
        },
        items:[{
            xtype: 'menuitem',
            iconCls: 'en',
            text: 'English'
        },{
            xtype: 'menuitem',
            iconCls: 'es',
            text: 'Español'
        },{
            xtype: 'menuitem',
            iconCls: 'pt_BR',
            text: 'Português'
        }]
    }
});