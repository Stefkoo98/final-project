require('../../pkg/db');
const config = require('../../pkg/config');
const express = require('express');
const fileUpload = require('express-fileupload');
const jwt = require('express-jwt');
const handlers = require('./handlers/storage');

const api = express();

api.use(express.json());
api.use(jwt({
    secret: config.get('security').secret,
    algorithms: config.get('security').algorithms
}).unless({
    path: [
        { url: /\/api\/v1\/storage\/users\/.*/, methods: ['GET'] },
    ]
}));

api.use(fileUpload());

api.post('/api/v1/storage/upload', handlers.upload);
api.get('/api/v1/storage/get-file-list', handlers.getFileList);
api.post('/api/v1/storage/recipe-upload', handlers.recipeUpload)
api.get('/api/v1/storage/users/:filename', handlers.download);
api.delete('/api/v1/storage/:filename/remove-file', handlers.removeFile);

api.listen(config.get('services').storage.port, err => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server successfuly started on port ${config.get('services').storage.port}`);
});