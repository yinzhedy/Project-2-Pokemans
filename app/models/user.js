var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

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


var User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

User.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// // create all defined tables in the specified database.
sequelize.sync({ force: true })
// sequelize.sync()
//     .then(() => console.log('users table has been successfully created, if one does not exist'))
//     .catch(error => console.log('This error occured', error));

// // export User model for use in other files.
module.exports = User;