export default (sequelize, DataTypes) => {
  const Company = sequelize.define("Company", {
    name: DataTypes.STRING,
    nit: DataTypes.STRING,
    status: DataTypes.STRING
  }, { tableName: "companies" });

  Company.associate = (models) => {
    Company.hasMany(models.Branch, { foreignKey: "companyId" });
    Company.hasMany(models.Role, { foreignKey: "companyId" });
    Company.hasMany(models.User, { foreignKey: "companyId" });
  };

  return Company;
};
