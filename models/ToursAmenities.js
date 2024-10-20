const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ToursAmenities = sequelize.define("ToursAmenities", {
  tours_tour_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: "Tours",
      key: "tour_id",
    },
    onDelete: "CASCADE",
  },
  amenities_amenities_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: "Amenities",
      key: "amenities_id",
    },
    onDelete: "CASCADE",
  },
  available: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
}, {
  tableName: 'tours_has_amenities',
  timestamps: false, // If you don't want created_at, updated_at columns
});

module.exports = ToursAmenities;
