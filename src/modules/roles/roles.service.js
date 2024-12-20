const httpStatus = require('http-status');
const { Role, RoleModule, Module } = require('../../database/models');
const ApiError = require('../../shared/utils/ApiError');

const createRole = async (roleBody) => {
  return Role.create(roleBody);
};

const getRoles = async (filter = {}, options = {}) => {
  return Role.paginate(filter, options);
};

const getRoleById = async (id) => {
  const role = await Role.findByPk(id);
  return role;
};

const getRoleByName = async (roleName) => {
  const role = await Role.findOne({ where: { role: roleName } });
  return role;
};

const assignPermissions = async (roleBody) => {
  const { roleName, moduleName, permissions } = roleBody;

  const role = await Role.findOne({ where: { role: roleName } });
  const module = await Module.findOne({ where: { name: moduleName } });

  if (!role || !module) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role or Module not found');
  }

  if (
    typeof permissions !== 'object' ||
    !Object.prototype.hasOwnProperty.call(permissions, 'read') ||
    !Object.prototype.hasOwnProperty.call(permissions, 'write') ||
    !Object.prototype.hasOwnProperty.call(permissions, 'update') ||
    !Object.prototype.hasOwnProperty.call(permissions, 'delete')
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid permissions format. Expected permissions with read, write, update, delete keys.'
    );
  }

  const existingMapping = await RoleModule.findOne({
    where: { role_id: role.id, module_id: module.id },
  });

  if (existingMapping) {
    existingMapping.permissions = permissions;
    await existingMapping.save();
    return { created: false, mapping: existingMapping };
  }

  const [mapping, created] = await RoleModule.findOrCreate({
    where: { role_id: role.id, module_id: module.id },
    defaults: {
      permissions,
    },
  });

  return { created, mapping };
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
  assignPermissions,
  getRoleByName,
};
