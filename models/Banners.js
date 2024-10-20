const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Banners = sequelize.define("Banners", {
  banner_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  image: {
    type: DataTypes.TEXT("medium"),
    allowNull: false,
  },
  head: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  pages_page_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    references: {
      model: "Pages",
      key: "page_id",
    },
    onDelete: "CASCADE",
  },
}, {
  tableName: 'banners',
  timestamps: false,
});

module.exports = Banners;
