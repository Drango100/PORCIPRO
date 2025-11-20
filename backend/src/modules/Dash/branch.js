export default (sequelize, DataTypes) => {
  const Branch = sequelize.define("Branch", {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, { tableName: "branches" });

  Branch.associate = (models) => {
    Branch.belongsTo(models.Company, { foreignKey: "companyId" });
    Branch.hasMany(models.User, { foreignKey: "branchId" });
  };

  return Branch;
};
