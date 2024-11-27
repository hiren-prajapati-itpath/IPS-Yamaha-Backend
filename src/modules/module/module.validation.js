const Joi = require('joi');
const { validateUUID } = require('../../shared/validations/custom.validation');

const createModule = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getModule = {
  params: Joi.object().keys({
    moduleID: Joi.string().custom(validateUUID),
  }),
};

const updateModule = {
  params: Joi.object().keys({
    moduleId: Joi.required().custom(validateUUID),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
    })
    .min(1),
};

const deleteModule = {
  params: Joi.object().keys({
    moduleId: Joi.string().custom(validateUUID),
  }),
};

module.exports = {
  createModule,
  getModule,
  updateModule,
  deleteModule,
};
