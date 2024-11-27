const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection-DB.config');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Role;
