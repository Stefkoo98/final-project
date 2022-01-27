require('../../pkg/db');
const config = require('../../pkg/config');
const express = require('express');
const fileUpload = require('express-fileupload');
const jwt = require('express-jwt');
const handlers = require('./handlers/storage');

const api = express();

api.use(jwt({
    algorithms: config.get('security').algorithms,
    secret: config.get('security').secret
}));
api.use(fileUpload());

api.post('/api/v1/storage/upload', handlers.upload);
api.get('/api/v1/storage/getFileList', handlers.getFileList);
api.post('/api/v1/storage/recipeUpload', handlers.recipeUpload)
// api.get('/api/v1/storage/:filename/download', handlers.download);
// api.delete('/api/v1/storage/:filename/removeFile', handlers.removeFile);

api.listen(config.get('services').storage.port, err => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server successfuly started on port ${config.get('services').storage.port}`);
});