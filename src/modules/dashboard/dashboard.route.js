const express = require('express');

const { dashboardController } = require('./dashboard.controller');

const { authValidation } = require('../auth');

const checkPermission = require('../../middlewares/checkPermission.middleware');
const authMiddleware = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.get(
  '/',
  validate(authValidation.headerSchema),
  authMiddleware,
  checkPermission('read'),
  dashboardController.getDashboard
);
router.post('/', checkPermission('write'), dashboardController.createDashboardEntry);
router.put('/:id', checkPermission('update'), dashboardController.updateDashboardEntry);
router.delete('/:id', checkPermission('delete'), dashboardController.deleteDashboardEntry);

module.exports = router;
