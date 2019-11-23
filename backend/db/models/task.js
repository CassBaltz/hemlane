'use strict';
module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('Task', {
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
    });
  Task.associate = function(models) {
    Task.hasMany(models.Action);
    Task.belongsTo(models.Todo);
  };
  return Task;
};