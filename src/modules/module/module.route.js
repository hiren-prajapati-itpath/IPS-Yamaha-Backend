const express = require('express');
const Controller = require('./module.controller');
const Validation = require('./module.validation');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.route('/').post(validate(Validation.createModule), Controller.createModule).get(Controller.getModules);

router
  .route('/:moduleId')
  .get(validate(Validation.getModule), Controller.getModule)
  .patch(validate(Validation.updateModule), Controller.updateModule)
  .delete(validate(Validation.deleteModule), Controller.deleteModule);

module.exports = router;
