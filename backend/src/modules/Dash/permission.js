export default (sequelize, DataTypes) => {
  const Permission = sequelize.define("Permission", {
    key: DataTypes.STRING,
    description: DataTypes.STRING
  }, { tableName: "permissions" });

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, { through: "role_permissions", foreignKey: "permissionId", otherKey: "roleId" });
  };

  return Permission;
};
