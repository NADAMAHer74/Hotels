const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Destinations = sequelize.define("Destinations", {
  destination_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT("medium"),
    allowNull: false,
  },
  visible: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
}, {
  tableName: 'destinations',
  timestamps: false,
});

module.exports = Destinations;
