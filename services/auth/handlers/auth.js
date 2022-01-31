const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('../../../pkg/users/validate');
const user = require('../../../pkg/users');
const config = require('../../../pkg/config');


const login = async (req, res) => {
    try {
        await validator(req.body, 'LOGIN');
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad request');
    }

    try {
        let u = await user.getByEmail(req.body.email);
        if (!u) {
            return res.status(400).send('Bad request');
        }
        if (!bcrypt.compareSync(req.body.password, u.password)) {
            return res.status(400).send('Bad request. Wrong password');
        }
        // create JWT
        let token = jwt.sign({
            uid: u._id,
            email: u.email,
            full_name: `${u.first_name} ${u.last_name}`,
            exp: parseInt((new Date().getTime() + 24 * 60 * 60 * 1000) / 1000)
        }, config.get('security').secret);

        let response = {
            id: u._id,
            token: token
        };

        res.status(200).send(JSON.stringify(response));
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
};

const validate = (req, res) => {
    res.status(200).send('ok');
};

const getUser = async (req, res) => {
    try {
        let u = await user.getByID(req.params.id);
        if (!u) {
            return res.status(404).send('Not found');
        }
        const userData = {
            first_name: u.first_name,
            last_name: u.last_name,
            email: u.email,
            birthday: u.birthday,
            avatar: u.avatar
        }
        return res.status(200).send(JSON.stringify(userData));
    } catch (err) {
        console.error(err);
    }
}

const createAccount = async (req, res) => {
    try {
        await validator(req.body, 'CREATE');
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad request');
    }

    try {
        let data = req.body;
        data.password = bcrypt.hashSync(data.password);
        data.avatar = ''
        let u = await user.create(data);
        return res.status(201).send(u);
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).send('Bad request. Email already in use');
        }
        return res.status(500).send('Internal server error');
    }
};

const renew = (req, res) => {
    let token = jwt.sign({
        uid: req.user.uid,
        email: req.user.email,
        full_name: req.user.full_name,
        exp: parseInt((new Date().getTime() + 24 * 60 * 60 * 1000) / 1000)
    }, config.get('security').secret);
    res.status(200).send(token);
};

const updateUser = async (req, res) => {
    try {
        await validator(req.body, 'UPDATE');
    } catch (err) {
        console.log(err);
        return res.status(400).send('Bad request');
    }
    try {
        await user.update(req.user.uid, req.body)
        return res.status(200).send('ok');
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

const updateAvatar = async (req, res) => {
    try {
        await validator(req.body, 'AVATAR');
    } catch (err) {
        console.log(err)
        return res.status(400).send('Bad request');
    }

    try {
        await user.updateAvatar(req.user.uid, req.body.avatar);
        return res.status(200).send('ok');
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

module.exports = {
    login,
    validate,
    createAccount,
    renew,
    getUser,
    updateUser,
    updateAvatar
};