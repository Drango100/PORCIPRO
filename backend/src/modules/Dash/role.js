export default (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    name: DataTypes.STRING,
    moduleKey: DataTypes.STRING,
    description: DataTypes.TEXT
  }, { tableName: "roles" });

  Role.associate = (models) => {
    Role.belongsTo(models.Company, { foreignKey: "companyId" });
    Role.belongsToMany(models.Permission, { through: "role_permissions", foreignKey: "roleId", otherKey: "permissionId" });
    Role.belongsToMany(models.User, { through: "user_roles", foreignKey: "roleId", otherKey: "userId" });
  };

  return Role;
};
