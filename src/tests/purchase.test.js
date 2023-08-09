const request = require('supertest');
const app = require('../app.js');
require('../models')

let token;

beforeAll(async () =>{
    const res = await request(app).post('/users/login').send({
        email: "luiseduardo7689@gmail.com",
        password :"123456"
    });

    token = res.body.token;
})



test("GET /purchases debe retornar los purchases", async() => {
    const res = await request(app).get('/purchases').set('Authorization', `Bearer ${token}`);
	expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})