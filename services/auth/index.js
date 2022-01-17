require('../../pkg/db');
const express = require('express');
const jwt = require('express-jwt');
const handlers = require('./handlers/auth')
const config = require('../../pkg/config');

const api = express();

api.use(express.json());
api.use(jwt({
    secret: config.get('security').secret,
    algorithms: config.get('security').algorithms
}).unless({ // you don't need jwt for these routes
    path: [
        '/api/v1/auth/login',
        '/api/v1/auth/create-account',
    ]
}));

api.post('/api/v1/auth/login', handlers.login);
api.get('/api/v1/auth/validate', handlers.validate);
api.get('/api/v1/auth/renew-jwt', handlers.renew);
api.post('/api/v1/auth/create-account', handlers.createAccount);
api.post('/api/v1/auth/forot-password', handlers.forgotPassword);
api.post('/api/v1/auth/reset-password', handlers.resetPassword);
api.get('/api/v1/auth/:id', handlers.getUser);
api.patch('/api/v1/auth/:id', handlers.updateUser);

api.listen(config.get('services').auth.port, err => {
    if (err) {
        return console.log('Could not start server', err);
    }
    console.log(`Server successfully started on port ${config.get('services').auth.port}`);
});