const request = require('supertest');
const app = require('../app.js');
require('../models')
const Image = require('../models/Image.js')

let id;
let token;

beforeAll(async () =>{
    const res = await request(app).post('/users/login').send({
        email: "luiseduardo7689@gmail.com",
        password :"123456"
    });

    token = res.body.token;
})

test("POST /products  debe crear un producto", async () => {
    const newProduct = {
        "title": "Iphone 13",
        "description": "djhfjdhfldkm",
        "categoryId": 3,
        "brand": "Apple",
        "price": 699
    }
    const res = await request(app).post("/products").send(newProduct).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.name).toBe(newProduct.name);
    expect(res.body.id).toBeDefined();
})

test("GET /products debe retornar los productos", async() => {
    const res = await request(app).get("/products");
	expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("GET /products/:id  debe encontrar un producto por el id", async() => {
    const res = await request(app).get(`/products/${id}`);
    expect(res.status).toBe(200);
})

test("PUT /products/:id  debe actualizar un producto", async () => {
    const updatedProduct = {
        "title": "Iphone 13",
        "description": "djhfjdhfldkm",
        "categoryId": 3,
        "brand": "Apple",
        "price": 699
    }

    const res = await request(app).put(`/products/${id}`).send(updatedProduct).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedProduct.name);
})

test("Post /products/:id/images  debe agregar imagenes a un producto", async () => {
    const image = await Image.create({
        "url": "http://res.cloudinary.com/dji3kgpwu/image/upload/v1690934712/NewsImages/321139.jpg",
        "publicId": "NewsImages/321139"
    })

    const res = await request(app).post(`/products/${id}/images`).send([image.id]).set('Authorization', `Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("DELETE /products  debe eliminar un producto", async () => {
    const res = await request(app).delete(`/products/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});