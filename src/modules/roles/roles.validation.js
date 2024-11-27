const Joi = require('joi');
const { validateUUID } = require('../../shared/validations/custom.validation');

const createRole = {
  body: Joi.object().keys({
    role: Joi.string().required(),
  }),
};

const getRole = {
  params: Joi.object().keys({
    roleID: Joi.string().custom(validateUUID),
  }),
};

const updateRole = {
  params: Joi.object().keys({
    roleId: Joi.required().custom(validateUUID),
  }),
  body: Joi.object()
    .keys({
      role: Joi.string(),
    })
    .min(1),
};

const deleteRole = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(validateUUID),
  }),
};

module.exports = {
  createRole,
  getRole,
  updateRole,
  deleteRole,
};
