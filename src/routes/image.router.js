const { getAll, create, remove, } = require('../controllers/image.controller');
const express = require('express');
const upload = require('../utils/multer');


const imageRouter = express.Router();

imageRouter.route('/')
    .post(upload.single('image'), create)
    .get(getAll)

imageRouter.route('/:id')
    .delete(remove)

module.exports = imageRouter;