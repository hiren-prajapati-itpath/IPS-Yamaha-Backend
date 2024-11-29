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
  role_id: {
    type: DataTypes.UUID,
    references: {
      model: Role,
      key: 'id',
    },
  },
  module_id: {
    type: DataTypes.UUID,
    references: {
      model: Module,
      key: 'id',
    },
  },
  permissions: {
    type: DataTypes.JSONB,
    defaultValue: { read: false, write: false, update: false, delete: false },
  },
});

Role.belongsToMany(Module, { through: RoleModule });
Module.belongsToMany(Role, { through: RoleModule });

module.exports = RoleModule;
