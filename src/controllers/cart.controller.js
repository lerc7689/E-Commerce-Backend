const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const results = await Cart.findAll({
        include: { model : Product,  include:[Image]},
        where:{userId : req.user.id}
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const id = req.user.id;
    const { quantity, productId } = req.body;
    const result = await Cart.create({ 
        quantity, 
        productId,
        userId : id
    });
    return res.status(201).json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Cart.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { quantity} = req.body;
    const result = await Cart.update(
        { quantity},
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    remove,
    update
}