const dashboardController = {
  getDashboard: (req, res) => {
    res.status(200).send('Dashboard data fetched successfully');
  },
  createDashboardEntry: (req, res) => {
    res.status(201).send('Dashboard entry created successfully');
  },
  updateDashboardEntry: (req, res) => {
    const { id } = req.params;
    res.status(200).send(`Dashboard entry with ID ${id} updated successfully`);
  },
  deleteDashboardEntry: (req, res) => {
    const { id } = req.params;
    res.status(200).send(`Dashboard entry with ID ${id} deleted successfully`);
  },
};

module.exports = { dashboardController };
