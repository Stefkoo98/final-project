const { Validator } = require('node-input-validator');

const AccountCreate = {
    first_name: 'required|minLength:3',
    last_name: 'required|minLength:4',
    email: 'required|email',
    birthday: 'required|string',
    password: 'required',
    repeat_password: 'required'
};

const AccountLogin = {
    email: 'required|email',
    password: 'required'
};

const AccountUpdate = {
    first_name: 'minLength:3',
    last_name: 'minLength:4',
    email: 'email',
    birthday: 'string',
    // password: '',
    // repeat_password: ''
}

const validate = async (data, schema) => {
    let sch;
    switch (schema) {
        case 'CREATE':
            sch = AccountCreate;
            break;
        case 'LOGIN':
            sch = AccountLogin;
            break;
        case 'UPDATE':
            sch = AccountUpdate;
            break;
    }
    let v = new Validator(data, sch);
    let e = await v.check();
    if (!e) {
        throw v.errors
    }
};

module.exports = validate;