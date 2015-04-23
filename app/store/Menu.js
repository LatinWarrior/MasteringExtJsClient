/**
 * Created by luis_blanco on 4/22/2015.
 */
Ext.define('Packt.store.Menu', {

    extend: 'Ext.data.Store',

    requires: [
        'Packt.model.menu.Root'
    ],

    model: 'Packt.model.menu.Root',

    proxy: {
        type: 'ajax',
        url: 'http://localhost:10108/api/menus',
        reader: {
            type: 'json',
            root: ''
        }
    }
});