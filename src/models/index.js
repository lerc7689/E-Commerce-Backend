const Category = require("./Category");
const Product = require("./Product");
const Image = require('./Image');
const Cart = require("./Cart");
const User = require("./User");
const Purchase = require("./Purchase");


Product.belongsTo(Category);
Category.hasMany(Product);

Image.belongsTo(Product);
Product.hasMany(Image);

Cart.belongsTo(User);
User.hasMany(Cart);

Cart.belongsTo(Product);
Product.hasMany(Cart);


Purchase.belongsTo(Product);
Product.hasMany(Purchase);

Purchase.belongsTo(User);
User.hasMany(Purchase);


// Product.belongsToMany(Im  , {through: "MoviesGenres"})
// Genre.belongsToMany(Movie, {through: "MoviesGenres"})