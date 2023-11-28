const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Submission = sequelize.define('Submission', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        assignment_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        user_id: {
          type: DataTypes.UUID,  
          allowNull: false,
        },
        submission_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        submission_date: {
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
    },
        {
            timestamps: false, // Disable automatic timestamps
        }
    );

    return Submission;
};
