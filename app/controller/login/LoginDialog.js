/**
 * Created by luis_blanco on 3/29/2015.
 */
Ext.define('Packt.controller.login.LoginDialog', {

    extend: 'Ext.app.Controller',

    alias: 'controller.login-dialog',

    views:[
        'login.LoginDialog'
    ],

    requires: [
        //'Packt.view.main.Main',
        'Packt.view.authentication.CapsLockTooltip',
        'Packt.util.Util',
        'Packt.util.SessionMonitor',
        'Packt.util.Fonts'
    ],

    init: function(application) {
        this.control({
            "login form button#submit": { // #1
                click: this.onButtonClickSubmit // #2
            },
            "login form button#cancel": { // #3
                click: this.onButtonClickCancel // #4
            }
        });
    },

    onButtonClickSubmit: function(button, e, options) {
        console.log('login submit'); // #5
    },
    onButtonClickCancel: function(button, e, options) {
        console.log('login cancel'); // #6
    },

    //onTextFieldSpecialKey: function (field, e, options) {
    //    if (e.getKey() === e.ENTER) {
    //        this.doLogin();
    //    }
    //},
    //
    //onTextFieldKeyPress: function (field, e, options) {
    //
    //    var charCode = e.getCharCode(),
    //        me = this;
    //
    //    if ((e.shiftKey && charCode >= 97 && charCode <= 122) ||
    //        (!e.shiftKey && charCode >= 65 && charCode <= 90)) {
    //        if (me.capslocktooltip === undefined) {
    //            me.capslocktooltip = Ext.Create('Packt.view.login.CapsLockTooltip');
    //        }
    //        me.capslocktooltip.show();
    //    } else {
    //        if (me.capslocktooltip !== undefined) {
    //            me.capslocktooltip.hide();
    //        }
    //    }
    //},

    //onButtonClickCancel: function (button, e, options) {
    //    //console.log('login cancel');
    //    var me = this;
    //    button.up('form').getForm().reset();
    //    //me.lookupReference('form').reset();
    //},
    //
    //onButtonClickSubmit: function (button, e, options) {
    //    var me = this;
    //
    //    debugger;
    //
    //    var formPanel = button.up('form'),
    //        login = button.up('login'),
    //        user = formPanel.down('textfield[name=userName]').getValue(),
    //        pass = formPanel.down('textfield[name=password]').getValue();
    //
    //    debugger;
    //
    //    if (formPanel.getForm().isValid()) {
    //        me.doLogin();
    //    }
    //
    //    //if (me.lookupReference('form').isValid()) {
    //    //    me.doLogin();
    //    //}
    //    //console.log('login submit');
    //},
    //
    //doLogin: function () {
    //
    //    var me = this,
    //        formPanel = button.up('form').getForm();
    //
    //    //var me = this,
    //    //    form = me.lookupReference('form');
    //
    //    this.getView().mask('Authenticating... Please wait...');
    //
    //    formPanel.submit({
    //        clientValidation: true,
    //        url: 'http://localhost:10108/api/authentication',
    //        scope: me,
    //        success: 'onLoginSuccess',
    //        failure: 'onLoginFailure'
    //    });
    //
    //},

    onLoginFailure: function (form, action) {

        this.getView().unmask();

        console.log(action);

        var result = Packt.util.Util.decodeJSON(action.response.responseText);

        //debugger;

        switch (action.failureType) {
            case Ext.form.action.Action.CLIENT_INVALID:
                Packt.util.Util.showErrorMsg('Form fields may not be submitted with invalid values');
                break;
            case Ext.form.action.Action.CONNECT_FAILURE:
                Packt.util.Util.showErrorMsg(action.response.statusText);
                break;
            case Ext.form.action.Action.SERVER_INVALID:
                Packt.util.Util.showErrorMsg(result.msg);
                break;
        }
    },

    onLoginSuccess: function (form, action) {
        this.getView().unmask();
        this.getView().close();
        console.log('Success');
        //debugger;
        Ext.create('Packt.view.main.Main');
        Packt.util.SessionMonitor.start();
    }
});