module.exports = (sequelize, DataTypes) => {
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

  RoleModule.associate = (models) => {
    models.Role.belongsToMany(models.Module, {
      through: RoleModule,
      foreignKey: 'role_id',
    });

    models.Module.belongsToMany(models.Role, {
      through: RoleModule,
      foreignKey: 'module_id',
    });
  };

  return RoleModule;
};
