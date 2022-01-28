require('../../pkg/db');
const config = require('../../pkg/config');
const express = require('express');
const jwt = require('express-jwt');
const handlers = require('./handlers/recipes');

const api = express();

api.use(express.json());
api.use(jwt({
    secret: config.get('security').secret,
    algorithms: config.get('security').algorithms
}).unless({
    path: [
        '/api/v1/recipes/getall',
        { url: /\/api\/v1\/recipes\/getone\/.*/, methods: ['GET'] },
        { url: /\/api\/v1\/recipes\/category\/.*/, methods: ['GET'] },
    ]
}));

api.post('/api/v1/recipes/create', handlers.create);
api.get('/api/v1/recipes/getall', handlers.getAll);
api.get('/api/v1/recipes/getmine', handlers.getMine);
api.get('/api/v1/recipes/getone/:id', handlers.getOne);
api.get('/api/v1/recipes/category/:category', handlers.getCategory);
api.put('/api/v1/recipes/:id', handlers.getOne);
api.patch('/api/v1/recipes/:id', handlers.update)
api.delete('/api/v1/recipes/remove/:id', handlers.remove);

api.listen(config.get('services').recipes.port, err => {
    if (err) {
        return console.log('Could not start server', err);
    }
    console.log(`Server successfully started on port ${config.get('services').recipes.port}`);
});
