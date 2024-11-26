const Joi = require('joi');
const { objectId } = require('../../shared/validations/custom.validation');

const createRole = {
  body: Joi.object().keys({
    role: Joi.string().required(),
  }),
};

const getRole = {
  params: Joi.object().keys({
    roleID: Joi.string().custom(objectId),
  }),
};

const updateRole = {
  params: Joi.object().keys({
    roleId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      role: Joi.string(),
    })
    .min(1),
};

const deleteRole = {
  params: Joi.object().keys({
    roleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRole,
  getRole,
  updateRole,
  deleteRole,
};
