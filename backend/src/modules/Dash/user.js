import bcrypt from "bcryptjs";

export default (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { tableName: "users" });

  User.associate = (models) => {
    User.belongsTo(models.Company, { foreignKey: "companyId" });
    User.belongsTo(models.Branch, { foreignKey: "branchId" });
    User.belongsToMany(models.Role, { through: "user_roles", foreignKey: "userId", otherKey: "roleId" });
  };

  // Hook: hash password before create/update
  User.beforeCreate(async (user) => {
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  // instance method to compare
  User.prototype.comparePassword = async function (plain) {
    return await bcrypt.compare(plain, this.password);
  };

  return User;
};
