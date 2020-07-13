const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../app/models/User');
const Project = require('../app/models/Project');
const Task = require('../app/models/Task');

const connection = new Sequelize(dbConfig);

connection.authenticate().then(()=>{
   console.info('Connection has been established successfully.')
}).catch(err =>{
   console.error('Unable to connect to the database:', err);
});


User.init(connection);
Project.init(connection);
Task.init(connection);

Project.associate(connection.models);
Task.associate(connection.models);

module.exports = connection;
