const httpStatus = require('http-status');
const { Module, Role, RoleModule } = require('../database/models');
const ApiError = require('../shared/utils/ApiError');
const { routeToModuleMap } = require('../shared/constants/constant');
const extractBaseRoute = require('../shared/utils/extractBaseRoute');

const checkPermission = (action) => {
  return async (req, res, next) => {
    const routePath = extractBaseRoute(req.originalUrl);
    console.log('🚀 ~ return ~ routePath:', routePath);

    const moduleName = routeToModuleMap[routePath];
    if (!moduleName) {
      return res.status(400).json({ message: 'Module not found for this route.' });
    }

    const userRole = req.user.role;

    const role = await Role.findOne({ where: { role: userRole } });
    const module = await Module.findOne({ where: { name: moduleName } });

    if (!role || !module) {
      return next(new ApiError(httpStatus.FORBIDDEN, `Access denied`));
    }

    const permissions = await RoleModule.findOne({
      where: { role_id: role.id, module_id: module.id },
    });

    if (permissions && permissions[action]) {
      next();
    } else {
      next(new ApiError(httpStatus.FORBIDDEN, `Access denied: No ${action} permission for this module.`));
    }
  };
};

module.exports = checkPermission;
