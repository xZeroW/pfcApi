'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('projects', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false 
      },
      sub_fk: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'sub',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(1234),
        allowNull: false,
      },
      completion_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('projects');
  }
};
