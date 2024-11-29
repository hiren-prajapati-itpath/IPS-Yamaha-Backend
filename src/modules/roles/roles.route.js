const express = require('express');
const Controller = require('./roles.controller');
const Validation = require('./roles.validation');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.route('/').post(validate(Validation.createRole), Controller.createRole).get(Controller.getRoles);

router.route('/assignPermissions').post(Controller.assignPermissions);

router
  .route('/:roleId')
  .get(validate(Validation.getRole), Controller.getRole)
  .patch(validate(Validation.updateRole), Controller.updateRole)
  .delete(validate(Validation.deleteRole), Controller.deleteRole);

module.exports = router;
