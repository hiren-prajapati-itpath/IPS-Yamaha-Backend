const Joi = require('joi');
const { password } = require('../../shared/validations/custom.validation');

const register = {
  body: Joi.object().keys({
    username: Joi.string().optional(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const headerSchema = {
  headers: Joi.object({
    authorization: Joi.string()
      .required()
      .pattern(/^Bearer\s/)
      .messages({
        'string.empty': 'Authorization header is required!',
        'string.pattern.base': "Authorization header must start with 'Bearer '",
      }),
  }).unknown(),
};

module.exports = {
  register,
  login,
  headerSchema,
};
