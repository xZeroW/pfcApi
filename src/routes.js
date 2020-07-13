const express = require('express');

const { celebrate, Joi, Segments } = require('celebrate');

const projectController = require('./app/controllers/projectController');
const taskController = require('./app/controllers/taskController');

const Route = express.Router();

//Initial rote
Route.get('/', (req, res) => {return res.status(200).json({ ok: true })});

//Projects routes
Route.get('/projects', projectController.view);

Route.get('/projects/:projectid', projectController.findOne);

Route.post('/projects', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    completion_date: Joi.string(),
    status: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), projectController.create);

Route.patch('/projects/:projectid', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    completion_date: Joi.string(),
    status: Joi.number().integer(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), projectController.patch);

Route.delete('/projects/:projectid', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    projectid: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), projectController.dalete);


//Tasks routes
Route.get('/tasks/:projectid', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    projectid: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), taskController.view);

Route.post('/tasks/:projectid', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    completion_date: Joi.string(),
    status: Joi.number().integer().required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    projectid: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), taskController.create);

Route.patch('/tasks/:taskid', celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    completion_date: Joi.string(),
    status: Joi.number().integer(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    taskid: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), taskController.patch);

Route.delete('/tasks/:taskid/:projectid', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    projectid: Joi.number().integer().required(),
    taskid: Joi.number().integer().required(),
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), taskController.delete);


module.exports = Route;
