const Sequelize = require('sequelize');
const User = require('./user'); // Import the User model

module.exports = (sequelize, DataTypes) => {
  const Assignments = sequelize.define('Assignments', {
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      allowNull: false,
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
      type: DataTypes.DATE,
      allowNull: false
    },
    assignment_created: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
      readOnly: true
    },
    assignment_updated: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    }
    ,
    user_id: {
      type: DataTypes.UUID,  
      allowNull: false,
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
    }
    );

  // // Define the association with User
  // Assignments.associate = (models) => {
  //   Assignments.belongsTo(models.User,
  //     {
  //       foreignKey: 'user_id',
  //       onDelete: 'CASCADE'
  //     });
  // };

  // Assignments.belongsTo(User, { foreignKey: 'user_id' });

  return Assignments;
};
