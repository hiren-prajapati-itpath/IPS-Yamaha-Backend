const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection-DB.config');
const Role = require('./role.model');
const RoleModule = require('./roleModule.model');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.UUID,
    references: {
      model: RoleModule,
      key: 'id',
    },
  },
});

User.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = User;
