const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true
    // },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
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
    // account_created: {
    //   type: DataTypes.STRING
    // },
    // account_updated: {
    //   type: DataTypes.STRING
    // }
    account_created: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
      readOnly: true
    },
    account_updated: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
      readOnly: true
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
    User.hasMany(models.Assignments,
      { foreignKey: 'user_id' });
  };

  return User;
};
