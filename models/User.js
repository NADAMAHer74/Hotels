const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM("Admin", "User"),
    defaultValue: "User",
  },
  password: { type: DataTypes.STRING, allowNull: false },
});

module.exports = User;
