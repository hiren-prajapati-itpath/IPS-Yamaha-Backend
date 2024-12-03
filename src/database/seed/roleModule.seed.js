const { Role, Module, RoleModule } = require('../models');
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
    module: 'dashboard',
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
        let role = rolesMap.get(permission.role);
        if (!role) {
          role = await Role.create({ role: permission.role });
          rolesMap.set(permission.role, role);
          logger.info(`Role "${permission.role}" created successfully.`);
        }

        let module = modulesMap.get(permission.module);
        if (!module) {
          module = await Module.create({ name: permission.module });
          modulesMap.set(permission.module, module);
          logger.info(`Module "${permission.module}" created successfully.`);
        }

        const existingMapping = await RoleModule.findOne({
          where: { role_id: role.id, module_id: module.id },
        });

        if (existingMapping) {
          existingMapping.permissions = permission.permissions;
          await existingMapping.save();
          logger.info(`Updated permissions for ${permission.role} on module ${permission.module}.`);
        } else {
          const [mapping, created] = await RoleModule.findOrCreate({
            where: { role_id: role.id, module_id: module.id },
            defaults: { permissions: permission.permissions },
          });

          if (created) {
            logger.info(`Mapping for ${permission.role} and ${permission.module} created successfully.`);
          }
        }
      })
    );

    logger.info('Dynamic Role-Module mappings seeded successfully!');
  } catch (err) {
    console.log('🚀 ~ seedRoleModules ~ err:', err);
    logger.error('Error seeding dynamic Role-Module mappings:', err.message);
  }
};

module.exports = { seedRoleModules };
