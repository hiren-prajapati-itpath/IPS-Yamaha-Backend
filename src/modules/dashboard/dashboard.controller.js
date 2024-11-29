const httpStatus = require('http-status');

const dashboardController = {
  getDashboard: (req, res) => {
    return res.successResponse(httpStatus.OK, { message: 'Dashboard data fetched successfully' });
  },
  createDashboardEntry: (req, res) => {
    return res.successResponse(httpStatus.OK, { message: 'Dashboard entry created successfully' });
  },
  updateDashboardEntry: (req, res) => {
    const { id } = req.params;
    return res.successResponse(httpStatus.OK, { message: `Dashboard entry with ID ${id} updated successfully` });
  },
  deleteDashboardEntry: (req, res) => {
    const { id } = req.params;
    return res.successResponse(httpStatus.OK, { message: `Dashboard entry with ID ${id} deleted successfully` });
  },
};

module.exports = { dashboardController };
