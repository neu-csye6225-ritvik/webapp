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
    }
    ,
    idUser: {
      type: DataTypes.INTEGER
    },
    // Define other columns here
    // userId: {
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: 'User', // The name of the User model
    //     key: 'id',      // The name of the primary key in the User model
    //   },
    // },
  },
    {
      timestamps: false, // Disable automatic timestamps
    });

  // Define the association with User
  // Assignments.associate = (models) => {
  //   Assignments.belongsTo(models.User, {
  //     foreignKey: 'userId'
  //   });
  // };

  return Assignments;
};
