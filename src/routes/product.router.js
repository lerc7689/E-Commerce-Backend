const { getAll, create, getOne, remove, update, productImages } = require('../controllers/product.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')
const upload = require('../utils/multer');

const productRouter = express.Router();

productRouter.route('/')
    .get(getAll)
    .post(verifyJWT, create);

productRouter.route('/:id/images')
    .post( verifyJWT,  productImages)     

productRouter.route('/:id')
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = productRouter;