/**
 * Created by luis_blanco on 4/19/2015.
 */
Ext.define('Packt.view.navigation.MyViewport', {

    extend: 'Ext.container.Viewport',

    alias: 'widget.mainviewport',

    requires: [
        //'Packt.view.Header',
        //'Packt.view.menu.Accordion',
        //'Packt.view.main.MainPanel'
    ],

    layout: {
        type: 'border'
    },

    items: [
        {
            //xtype: 'mainmenu',
            xtype: 'container',
            width: 185,
            collapsible: true,
            region: 'west'//,
            //style: 'background-color: #8FB488;'
        },
        {
            //xtype: 'appheader',
            xtype: 'container',
            region: 'north'
        },
        {
            //xtype: 'mainpanel',
            xtype: 'container',
            region: 'center'
        },
        {
            xtype: 'container',
            region: 'south',
            height: 30,
            style: 'border-top: 1px solid #4c72a4;',
            html: '<div id="titleHeader"><center><span style="font-size:10px;">Mastering ExtJS book - Loiane Groner - http://packtpub.com</span></center></div>'
        }
    ]
});