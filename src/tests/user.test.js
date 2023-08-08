const request = require('supertest');
const app = require('../app.js');

let id;
let token;

test("POST /users  debe crear un usuario", async () => {
    const newUser = {
        firstName : "Antonio",
        lastName : "Banderas",
        email: "luiseduardo7689@gmail.com",
        password :"123456",
        phone : "8297213784"
    }
    const res = await request(app).post("/users").send(newUser);
    id = res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.name).toBe(newUser.name);
    expect(res.body.id).toBeDefined();
})


test("POST /users/login  debe logear un usuario", async () => {
    const userToLogin = {
        email: "luiseduardo7689@gmail.com",
        password :"123456"
    }
    const res = await request(app).post("/users/login").send(userToLogin);
    token = res.body.token;
	expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
})

test("POST /users/login  user de credenciales incorrectas", async () => {
    const userIncorrect = {
        email: "incorrecto@gmail.com",
        password :"123456"
    }
    const res = await request(app).post("/users/login").send(userIncorrect);
	expect(res.status).toBe(401);
})

test("GET /users debe retornar los usuarios", async() => {
    const res = (await request(app).get("/users").set('Authorization', `Bearer ${token}`));
	expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test("GET /users/:id  debe encontrar un usuario por el id", async() => {
    const res = await request(app).get(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
})

test("PUT /users/:id  debe actualizar un usuario", async () => {
    const updatedUser = {
        firstName : "Luis",
        lastName : "Ramirez",
        email: "luiseduardo7689@gmail.com",
        password :"123456",
        phone : "8297213784"
    }

    const res = await request(app).put(`/users/${id}`).send(updatedUser).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedUser.name);
})


test("DELETE /users  debe eliminar un usuario", async () => {
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});