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
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: [10],
          msg: "Points cannot be greater than 100"
        },
        min: {
          args: [1],
          msg: "Points cannot be less than 1"
        },
        isInt: {
          msg: "Points has to be whole number"
        }
      }
    },
    num_of_attempts: {
      type: DataTypes.INTEGER,
      validate: {
        max: {
          args: [100],
          msg: "Attempts cannot be greater than 100"
        },
        min: {
          args: [1],
          msg: "Attempts cannot be less than 1"
        },
        isInt: {
          msg: "Attempts has to be whole number"
        }
      }
    },
    deadline: {
      type: DataTypes.DATE
    },
    assignment_created: {
      type: DataTypes.DATE
    },
    assignment_updated: {
      type: DataTypes.DATE
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
  Assignments.associate = (models) => {
    Assignments.belongsTo(models.User,
      {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
  };

  return Assignments;
};
