const { hashPassword, comparePassword } = require('../../services/bcrypt.service');
const { Paginate } = require('./plugins');

module.exports = (sequelize, DataTypes) => {
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
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
  });

  // Apply the relationship between User and Role
  User.associate = (models) => {
    User.belongsTo(models.Role, { foreignKey: 'role_id' });
  };

  // Hash password before creating a new user
  User.beforeCreate(async (user) => {
    if (user.password) {
      const hashedPassword = await hashPassword(user.password);
      user.setDataValue('password', hashedPassword);
    }
  });

  // Instance method for password comparison
  User.prototype.isPasswordMatch = async function (password) {
    const isMatch = await comparePassword(password, this.password);
    return isMatch;
  };

  // Apply the paginate plugin
  Paginate(User);

  return User;
};
