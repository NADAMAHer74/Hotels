const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Phones = sequelize.define("Phones", {
  phone_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  phone_number: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  visible: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
}, {
  tableName: 'phones',
  timestamps: false,
});

module.exports = Phones;
