const Sequelize = require('sequelize');
const User = require('./user'); // Import the User model

module.exports = (sequelize, DataTypes) => {
  const Assignments = sequelize.define('Assignments', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    points: {
      type: DataTypes.INTEGER

    },
    num_of_attempts: {
      type: DataTypes.STRING
    },
    deadline: {
      type: DataTypes.STRING
    },
    assignment_created: {
      type: DataTypes.STRING
    },
    assignment_updated: {
      type: DataTypes.STRING
    },
    idUser: {
      type: DataTypes.INTEGER
    }
    // Define other columns here
  },
    {
      timestamps: false, // Disable automatic timestamps
    });

  // Define the association with User
  Assignments.associate = (models) => {
    Assignments.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'user',
    });
  };

  return Assignments;
};
