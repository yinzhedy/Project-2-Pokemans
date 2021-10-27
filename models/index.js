const User = require('./user');
const Card = require('./card');

User.hasMany(Card, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Card.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Card };
