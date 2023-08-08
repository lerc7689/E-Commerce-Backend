const request = require('supertest');
const app = require('../app.js');
require('../models')
const Product = require('../models/Product.js');

let id;
let token;
let userId;

beforeAll(async () =>{
    const res = await request(app).post('/users/login').send({
        email: "luiseduardo7689@gmail.com",
        password :"123456"
    });

    token = res.body.token;
    userId = res.body.id;
})

test("POST /cart  debe crear un cartProducts", async () => {
    const newProduct = await Product.create({
        "title" : "Iphone 13",
        "description" : "djhfjdhfldkm",
        "categoryId" : 3,
        "brand" : "Apple",
        "price" : 699
    
    })
    const newCart = {
        "quantity": 1,
        "userId": userId,
        "productId": newProduct.id
    }
    const res = await request(app).post("/cart").send(newCart).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    await newProduct.destroy();
	expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(newCart.quantity);
    expect(res.body.id).toBeDefined();
})

test("GET /cart debe retornar los cartProducts de un usuario", async() => {
    const res = await request(app).get("/cart").set('Authorization', `Bearer ${token}`);
	expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("PUT /cart/:id  debe actualizar un cartProducts", async () => {
    const updatedCart = {
        "quantity": 2
    }

    const res = await request(app).put(`/cart/${id}`).send(updatedCart).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(updatedCart.quantity);
})


test("DELETE /cart  debe eliminar un cartProducts", async () => {
    const res = await request(app).delete(`/cart/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});