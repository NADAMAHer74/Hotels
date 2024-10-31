const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Pages = sequelize.define("Pages", {
  page_id: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    allowNull: false,
  },
  page_name: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'pages',
  timestamps: false,
});

module.exports = Pages;
