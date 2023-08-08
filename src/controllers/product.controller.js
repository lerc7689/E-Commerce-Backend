const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Image = require('../models/Image');
const {Op} = require('sequelize')

const getAll = catchError(async(req, res) => {
    const { title, categoryId } = req.query;
    const where = {};
    if(title) where.title = {[Op.iLike]: `%${title}%`};
    if(categoryId) where.categoryId = categoryId;
    console.log(title, categoryId);
    const results = await Product.findAll({
        include : [Image, Category],
        where
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.findByPk(id, {include:[Image, Category]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Product.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Product.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const productImages = catchError(async(req, res) => {
    const { id } = req.params;
    //const { path, filename } = req.file
    const findedProduct = await Product.findByPk(id);
    //if(!findedProduct) res.status(404).json({message:{"Product not found"}})
    //await uploadToCloudinary(path, filename);
    await findedProduct.setImages(req.body)
    const images = await findedProduct.getImages();
    // await Image.create({
    //     url : path,
    //     publicId : filename,
    //     productId: findedProduct.id
    // })

    return res.json(images)
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    productImages
}