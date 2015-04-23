/**
 * Created by luis_blanco on 4/22/2015.
 */
Ext.define('Packt.controller.menu.Menu', {

    extend: 'Ext.app.Controller',

    models: [
        'menu.Root',
        'menu.Item'
    ],

    stores: [
        'Menu'
    ],

    views: [
        'menu.Accordion',
        'menu.Item'
    ],

    refs: [{
        ref: 'mainPanel',
        selector: 'mainpanel'
    }],

    init: function (application) {

        var me = this;

        me.control({
            'mainmenu':{
                render: me.onPanelRender
            },
            'mainmenuitem':{
                select: me.onTreePanelSelect,
                itemClick: me.onTreePanelItemClick
            }
        })
    },

    onPanelRender: function(abstractcomponent, options){

        var me = this;

        me.getMenuStore().load(function(records, options, success){

            var menuPanel = Ext.ComponentQuery.query('mainmenu')[0];

            Ext.each(records, function(root){

                var menu = Ext.create('Packt.view.menu.Item',{
                    title: translations[root.get('text')],
                    iconCls: root.get('iconCls')
                });

                Ext.each(root.items(), function(items){
                    Ext.each(items.data.items, function(item){
                        menu.getRootNode().appendChild({
                            text: translations[item.get('text')],
                            leaf: item.get('isLeaf'),
                            iconCls: item.get('iconCls'),
                            id: item.get('id'),
                            className: item.get('className')
                        });
                    });
                });

                menuPanel.add(menu);
            });
        });
    }
});