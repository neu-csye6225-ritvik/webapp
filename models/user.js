const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    account_created: {
      type: DataTypes.STRING
    },
    account_updated: {
      type: DataTypes.STRING
    }
    // Define other columns here
  }, {
    timestamps: false, // Disable automatic timestamps
  });

  User.beforeCreate((user) => {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 12);
    }
  });

  // Define the association with Assignments
  User.associate = (models) => {
    User.hasMany(models.Assignments, {
      foreignKey: 'UserId',
      as: 'assignments',
    });
  };

  return User;
};
