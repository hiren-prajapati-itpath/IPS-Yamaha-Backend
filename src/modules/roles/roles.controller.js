const httpStatus = require('http-status');
const ApiError = require('../../shared/utils/ApiError');
const catchAsync = require('../../shared/utils/catchAsync');
const roleService = require('./roles.service');

const createRole = catchAsync(async (req, res) => {
  const role = await roleService.createRole(req.body);
  return res.successResponse(httpStatus.CREATED, { data: role });
});

const getRoles = catchAsync(async (req, res) => {
  const result = await roleService.getRoles();
  return res.successResponse(httpStatus.OK, { data: result });
});

const getRole = catchAsync(async (req, res) => {
  const role = await roleService.getRoleById(req.params.roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  return res.successResponse(httpStatus.OK, { data: role });
});

const assignPermissions = catchAsync(async (req, res) => {
  const roleBody = req.body;

  const { created, mapping } = await roleService.assignPermissions(roleBody);
  if (created) {
    return res.successResponse(httpStatus.CREATED, { data: mapping, message: 'Permissions assigned successfully' });
  }
  return res.successResponse(httpStatus.OK, { data: mapping, message: 'Permissions updated successfully' });
});

const updateRole = catchAsync(async (req, res) => {
  const role = await roleService.updateRoleById(req.params.roleId, req.body);
  return res.successResponse(httpStatus.OK, { data: role });
});

const deleteRole = catchAsync(async (req, res) => {
  await roleService.deleteRoleById(req.params.roleId);
  return res.successResponse(httpStatus.NO_CONTENT, {});
});

module.exports = {
  createRole,
  getRoles,
  assignPermissions,
  getRole,
  updateRole,
  deleteRole,
};
