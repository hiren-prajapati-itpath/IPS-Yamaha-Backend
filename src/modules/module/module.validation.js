const Joi = require('joi');
const { objectId } = require('../../shared/validations/custom.validation');

const createModule = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getModule = {
  params: Joi.object().keys({
    ModuleID: Joi.string().custom(objectId),
  }),
};

const updateModule = {
  params: Joi.object().keys({
    moduleId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

const deleteModule = {
  params: Joi.object().keys({
    moduleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createModule,
  getModule,
  updateModule,
  deleteModule,
};
