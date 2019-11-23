'use strict';
module.exports = (sequelize, Sequelize) => {
  const Action = sequelize.define(
    "Action",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      complete: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },
    {}
  );
  Action.associate = function(models) {
    Action.belongsTo(models.Task);
    Action.hasOne(models.Contact);
  };
  return Action;
};

