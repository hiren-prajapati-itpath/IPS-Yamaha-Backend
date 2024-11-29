const Role = require('../models/role.model');
const Module = require('../models/module.model');
const RoleModule = require('../models/roleModule.model');
const logger = require('../../config/logger');

const permissions = [
  {
    role: 'admin',
    module: 'dashboard',
    permissions: { read: true, write: true, update: true, delete: true },
  },
  {
    role: 'admin',
    module: 'settings',
    permissions: { read: true, write: true, update: true, delete: true },
  },
  {
    role: 'distributor',
    module: 'distributorManagement',
    permissions: { read: true, write: false, update: false, delete: false },
  },
  {
    role: 'distributor',
    module: 'settings',
    permissions: { read: true, write: false, update: false, delete: false },
  },
  {
    role: 'SuperAdmin',
    module: 'dashboard',
    permissions: { read: true, write: true, update: true, delete: true },
  },
  {
    role: 'distributor',
    module: 'reports',
    permissions: { read: true, write: false, update: false, delete: false },
  },
];

const seedRoleModules = async () => {
  try {
    const rolesMap = new Map((await Role.findAll()).map((role) => [role.role, role]));
    const modulesMap = new Map((await Module.findAll()).map((module) => [module.name, module]));

    await Promise.all(
      permissions.map(async (permission) => {
        const role = rolesMap.get(permission.role);
        const module = modulesMap.get(permission.module);
        if (role && module) {
          const existingMapping = await RoleModule.findOne({
            where: { role_id: role.id, module_id: module.id },
          });

          if (existingMapping) {
            existingMapping.permissions = permission.permissions;
            await existingMapping.save();
          }
          const [mapping, created] = await RoleModule.findOrCreate({
            where: { role_id: role.id, module_id: module.id },
            defaults: { permissions: permission.permissions },
          });

          if (created) {
            logger.error(`Mapping for ${permission.role} and ${permission.module} created successfully.`);
          } else {
            logger.error(`Mapping for ${permission.role} and ${permission.module} already exists.`);
          }
        } else {
          logger.warn(`Skipping: Role "${permission.role}" or Module "${permission.module}" not found.`);
        }
      })
    );

    logger.info('Dynamic Role-Module mappings seeded successfully!');
  } catch (err) {
    logger.error('Error seeding dynamic Role-Module mappings:', err.message);
  }
};

module.exports = { seedRoleModules };
