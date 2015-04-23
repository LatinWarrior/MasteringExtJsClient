/**
 * Created by luis_blanco on 4/20/2015.
 */
Ext.define('Packt.model.menu.Root', {

    extend: 'Ext.data.model',

    uses: [
        'Packt.model.menu.Item'
    ],

    idProperty: 'id',

    fields: [
        {
            name: 'text'
        },
        {
            name: 'iconCls'
        },
        {
            name: 'id'
        }
    ],

    hasMany: {
        model: 'Packt.model.menu.Item',
        foreignKey: 'menuId',
        name: 'items'
    }
});