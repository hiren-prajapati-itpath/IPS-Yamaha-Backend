const express = require('express');
const validate = require('../../middlewares/validate');

const authAppController = require('./auth.controller');
const authAppValidation = require('./auth.validation');

const router = express.Router();

router.post('/register', validate(authAppValidation.register), authAppController.register);
router.post('/login', validate(authAppValidation.login), authAppController.login);

module.exports = router;
