const { getAll, create, remove, } = require('../controllers/image.controller');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');


const imageRouter = express.Router();

imageRouter.route('/')
    .post(verifyJWT, upload.single('image'), create)
    .get(verifyJWT, getAll)

imageRouter.route('/:id')
    .delete(verifyJWT, remove)

module.exports = imageRouter;