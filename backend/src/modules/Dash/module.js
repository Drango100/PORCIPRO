export default (sequelize, DataTypes) => {
  const Module = sequelize.define("Module", {
    key: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, { tableName: "modules" });

  Module.associate = (models) => {
    // modules are reference data
  };

  return Module;
};
