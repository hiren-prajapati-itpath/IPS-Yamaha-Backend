const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection-DB.config');
const Role = require('./role.model');
const RoleModule = require('./roleModule.model');
const { hashPassword, comparePassword } = require('../../services/bcrypt.service');

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
      model: Role,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
});

User.belongsTo(Role, { foreignKey: 'role_id' });

User.beforeCreate(async (user) => {
  if (user.password) {
    const hashedPassword = await hashPassword(user.password);
    user.setDataValue('password', hashedPassword);
  }
});

User.prototype.isPasswordMatch = async function (password) {
  const isMatch = await comparePassword(password, this.password);
  return isMatch;
};

module.exports = User;
