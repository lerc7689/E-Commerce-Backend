const User = require('../models/User');
const sequelize = require('../utils/connection');
const app = require('../app.js');
const request = require('supertest');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

        const UserCreatedToLogin = {
            firstName : "Luis",
            lastName : "Ramirez",
            email: "luiseduardo7689@gmail.com",
            password :"123456",
            phone : "8297213784"
        }
        //aqui validamos que no haya un usuario ya creado con este email
        const userFound = await User.findOne({where:{email : UserCreatedToLogin.email}})

        if(!userFound){
            await request(app).post('/users').send(UserCreatedToLogin)
        }
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();