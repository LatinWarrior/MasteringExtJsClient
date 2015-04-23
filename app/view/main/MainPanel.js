/**
 * Created by luis_blanco on 4/22/2015.
 */
Ext.define('Packt.view.main.MainPanel', {

    extend: 'Ext.tab.Panel',

    alias: 'widget.mainpanel',

    activeTab: 0,

    items: [{
        xtype: 'panel',
        closable: false,
        iconCls: 'home',
        title: 'Home'
    }]
});