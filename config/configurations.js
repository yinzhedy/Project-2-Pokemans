// var Sequelize = require('sequelize');
// const sequelize = new Sequelize('pokemans', 'root', 'password', {
//     host: 'localhost',
//     port: 9000,
//     dialect: 'mysql',
//     password: '',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//         },
//         operatorsAliases: 0
//     });

// module.exports = sequelize;

const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 9000,
      operatorsAliases: 0,
      password: '',
    }
  );
}

module.exports = sequelize;
