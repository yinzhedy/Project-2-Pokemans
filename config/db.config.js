var Sequelize = require('sequelize');
const sequelize = new Sequelize('pokemans', 'root', 'password', {
    host: 'localhost',
    port: 9000,
    dialect: 'mysql',
    password: '',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        },
        operatorsAliases: 0
    });
