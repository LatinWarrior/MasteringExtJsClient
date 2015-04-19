/**
 * Created by luis_blanco on 3/29/2015.
 */
Ext.define('Packt.controller.login.LoginDialog', {

    extend: 'Ext.app.Controller',

    alias: 'controller.login-dialog',

    requires: [
        //'Packt.view.main.Main',
        'Packt.util.MD5',
        'Packt.view.authentication.CapsLockTooltip',
        'Packt.util.Util',
        'Packt.util.SessionMonitor',
        'Packt.util.Fonts'
    ],

    views:[
        'login.LoginDialog',
        'authentication.CapsLockTooltip'
    ],

    init: function(application) {

        var me = this;

        me.control({
            "login-dialog form button#submit": { // #1
                click: me.onButtonClickSubmit // #2
            },
            "login-dialog form button#cancel": { // #3
                click: me.onButtonClickCancel // #4
            },
            "login-dialog form textfield": {
                specialkey: me.onTextFieldSpecialKey
            },
            "login-dialog form textfield[name=password]": {
                keypress: me.onTextFieldKeyPress
            }
        });

        // Putting this in her. Otherwise, it does not work. Stupid thing.
        Ext.apply(Ext.form.field.VTypes, {
            //  vtype validation function
            customPass: function(val, field) {
                //console.log('customPass called.');
                return /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/.test(val);
            },
            // vtype Text property: The error text to display when the validation function returns false
            customPassText: 'Not a valid password.  Length must be at least 6 characters and maximum of 20. Password must contain one digit, one letter lowercase, one letter uppercase, one special symbol @#$% and between 6 and 20 characters.'
        });
    },

    onButtonClickSubmit: function(button, e, options) {
        //console.log('login submit');
        var formPanel = button.up('form'),
            login = button.up('login'),
            user = formPanel.down('textfield[name=userName]').getValue(),
            pass = formPanel.down('textfield[name=password]').getValue();

        pass = Packt.util.MD5.encode(pass);

        if (formPanel.getForm().isValid()) {

            Ext.get(login.getEl()).mask("Authenticating... Please wait...",
                'loading');

            Ext.Ajax.request({
                url: 'http://localhost:10108/api/authentication',
                params: {
                    user: user,
                    password: pass
                },
                failure: function(conn, response, options, eOpts) {

                    Ext.get(login.getEl()).unmask();

                    Ext.Msg.show({
                        title:'Error!',
                        msg: conn.responseText,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                },
                success: function(conn, response, options, eOpts) {

                    Ext.get(login.getEl()).unmask();

                    var result = Ext.JSON.decode(conn.responseText, true); // #1

                    if (!result){ // #2
                        result = {};
                        result.success = false;
                        result.msg = conn.responseText;
                    }

                    if (result.success) { // #3
                        login.close(); // #4
                        Ext.create('Packt.view.navigation.MyViewport'); // #5
                    } else {
                        Ext.Msg.show({title:'Fail!',
                            msg: result.msg, // #6
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            });
        }
    },

    onButtonClickCancel: function(button, e, options) {
        //console.log('login cancel');
        button.up('form').getForm().reset();
    },

    onTextFieldSpecialKey: function (field, e, options) {
        //if (e.getKey() === e.ENTER) {
        //    this.doLogin();
        //}
        if (e.getKey() == e.ENTER){
            var submitBtn = field.up('form').down('button#submit');
            submitBtn.fireEvent('click', submitBtn, e, options);
        }
    },

    onTextFieldKeyPress: function (field, e, options) {

        var charCode = e.getCharCode(),
            me = this;

        if ((e.shiftKey && charCode >= 97 && charCode <= 122) ||
            (!e.shiftKey && charCode >= 65 && charCode <= 90)) {
            if (me.capslocktooltip === undefined) {
                me.capslocktooltip = Ext.widget('capslocktooltip'); //Ext.Create('Packt.view.authentication.CapsLockTooltip');
            }
            me.capslocktooltip.show();
        } else {
            if (me.capslocktooltip !== undefined) {
                me.capslocktooltip.hide();
            }
        }
    },

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