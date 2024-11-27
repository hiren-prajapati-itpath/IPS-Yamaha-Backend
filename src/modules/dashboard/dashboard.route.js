const express = require('express');

const checkPermission = require('../../middlewares/checkPermission.middleware');
const { dashboardController } = require('./dashboard.controller');

const router = express.Router();

router.get('/', checkPermission('read'), dashboardController.getDashboard);
router.post('/', checkPermission('write'), dashboardController.createDashboardEntry);
router.put('/:id', checkPermission('update'), dashboardController.updateDashboardEntry);
router.delete('/:id', checkPermission('delete'), dashboardController.deleteDashboardEntry);

module.exports = router;
