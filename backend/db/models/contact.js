'use strict';
module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define(
    "Contact",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
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
  Contact.associate = function(models) {
    Contact.belongsTo(models.Action);
  };
  return Contact;
};