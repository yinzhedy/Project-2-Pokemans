const { Model, DataTypes } = require('sequelize');
var sequelize = require('../config/configurations');

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
class Card extends Model {}

Card.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'card',
  }
);

module.exports = Card;