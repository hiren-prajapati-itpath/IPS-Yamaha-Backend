const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection-DB.config');
const Role = require('./role.model');
const Module = require('./module.model');

const RoleModule = sequelize.define('RoleModule', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  permissions: {
    type: DataTypes.JSONB,
    defaultValue: { read: false, write: false, update: false, delete: false },
  },
});

Role.belongsToMany(Module, {
  through: RoleModule,
  foreignKey: 'role_id',
});

Module.belongsToMany(Role, {
  through: RoleModule,
  foreignKey: 'module_id',
});

module.exports = RoleModule;
