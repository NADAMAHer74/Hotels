const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Amenities = sequelize.define("Amenities", {
  amenities_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(70),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  rate: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Amenities;
