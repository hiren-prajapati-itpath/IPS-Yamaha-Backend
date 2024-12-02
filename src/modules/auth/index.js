const authRoute = require('./auth.route');
const authValidation = require('./auth.validation');
const authService = require('./auth.service');
const authController = require('./auth.controller');

module.exports = { authRoute, authService, authValidation, authController };
