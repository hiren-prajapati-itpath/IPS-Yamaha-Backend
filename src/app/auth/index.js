const authRoute = require("../auth/auth.route");
const authValidation = require("../auth/auth.validation");
const authService = require("../auth/auth.service");
const authController = require("../auth/auth.controller");

module.exports = { authRoute, authService, authValidation, authController };
