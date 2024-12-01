const httpStatus = require('http-status');
const { Role } = require('../../database/models');
const ApiError = require('../../shared/utils/ApiError');

const createRole = async (roleBody) => {
  return Role.create(roleBody);
};

const getRoles = async () => {
  const roles = await Role.findAll();
  return roles;
};

const getRoleById = async (id) => {
  const role = await Role.findByPk(id);
  return role;
};

const updateRoleById = async (roleId, updateBody) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  const updateRole = await Role.update(updateBody, { where: { roleId } });
  return updateRole;
};

const deleteRoleById = async (roleId) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  await role.remove();
  return role;
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
