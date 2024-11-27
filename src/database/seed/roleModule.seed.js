const Role = require('../models/role.model');
const Module = require('../models/module.model');
const RoleModule = require('../models/roleModule.model');

const permissions = [
  {
    role: 'deskAdmin',
    module: 'Dashboard',
    permissions: { read: true, write: true, update: true, delete: true },
  },
  {
    role: 'Admin',
    module: 'Settings',
    permissions: { read: true, write: true, update: true, delete: true },
  },
  {
    role: 'Distributor',
    module: 'DistributorManagement',
    permissions: { read: true, write: false, update: false, delete: false },
  },
  {
    role: 'Distributor',
    module: 'Settings',
    permissions: { read: true, write: false, update: false, delete: false },
  },
  {
    role: 'SuperAdmin',
    module: 'Dashboard',
    permissions: { read: true, write: true, update: true, delete: true },
  },
];

const seedRoleModules = async () => {
  try {
    const existingRoles = await Role.findAll();
    const existingModules = await Module.findAll();

    // Map Permissions Dynamically
    for (const permission of permissions) {
      const role = existingRoles.find((r) => r.name === permission.role);
      const module = existingModules.find((m) => m.name === permission.module);

      if (role && module) {
        const existingMapping = await RoleModule.findOne({
          where: {
            role_id: role.id,
            module_id: module.id,
          },
        });

        if (!existingMapping) {
          // Create mapping if it does not exist
          await RoleModule.create({
            role_id: role.id,
            module_id: module.id,
            ...permission.permissions,
          });
        } else {
          console.log(`Mapping for ${permission.role} and ${permission.module} already exists.`);
        }
      } else {
        console.warn(`Skipping: Role "${permission.role}" or Module "${permission.module}" not found in the database.`);
      }
    }

    console.log('Dynamic Role-Module mappings seeded successfully!');
  } catch (err) {
    console.error('Error seeding dynamic Role-Module mappings:', err.message);
  }
};

seedRoleModules();
