const authRoute = require("./auth.route");
const authService = require("./users.services");
const authValidation = require("./users.validation");
const authController = require("./users.controller");

module.exports = { authRoute, authService, authValidation, authController };
