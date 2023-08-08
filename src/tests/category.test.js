const request = require('supertest');
const app = require('../app.js');

let id;
let token;

beforeAll(async () =>{
    const res = await request(app).post('/users/login').send({
        email: "luiseduardo7689@gmail.com",
        password :"123456"
    });

    token = res.body.token;
})

test("POST /categories  debe crear un categoria", async () => {
    const newCategory = {
        name : "tecnologia"
    }
    const res = await request(app).post("/categories").send(newCategory).set('Authorization', `Bearer ${token}`);
    id = res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.name).toBe(newCategory.name);
    expect(res.body.id).toBeDefined();
})

test("GET /categories debe retornar los categorias", async() => {
    const res = await request(app).get("/categories");
	expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("PUT /categories/:id  debe actualizar una categoria", async () => {
    const updatedCategory = {
        name : "home"
    }

    const res = await request(app).put(`/categories/${id}`).send(updatedCategory).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedCategory.name);
})


test("DELETE /categories  debe eliminar una categoria", async () => {
    const res = await request(app).delete(`/categories/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});