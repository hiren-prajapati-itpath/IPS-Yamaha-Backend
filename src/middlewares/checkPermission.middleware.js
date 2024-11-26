const { RoleModule, Module } = require('../database/models');

const checkPermission = (permission) => async (req, res, next) => {
  const userRoleId = req.user.role_id;
  const moduleName = req.params.module;
  try {
    const roleModule = await RoleModule.findOne({
      where: { role_id: userRoleId },
      include: [{ model: Module, where: { name: moduleName } }],
    });

    if (roleModule && roleModule[permission]) {
      return next();
    }

    res.status(403).json({ error: 'Permission denied' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to validate permission' });
  }
};

module.exports = { checkPermission };
