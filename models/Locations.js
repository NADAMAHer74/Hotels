const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Locations = sequelize.define("Locations", {
  location_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  location: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  visible: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
}, {
  tableName: 'locations',
  timestamps: false,
});

module.exports = Locations;
