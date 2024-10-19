const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AdditionalService = sequelize.define("AdditionalService", {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

module.exports = AdditionalService;
