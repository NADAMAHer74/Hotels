const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tour = sequelize.define("Tour", {
  tour_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  location: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  adultPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  kidsPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  childrenPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  durationInDays: { type: DataTypes.INTEGER, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  reviewStars: { type: DataTypes.INTEGER, allowNull: true },
  overview: { type: DataTypes.TEXT, allowNull: false },
  tourImage: { type: DataTypes.MEDIUMTEXT, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  time: { type: DataTypes.TIME, allowNull: false },
  miniAge: { type: DataTypes.INTEGER, allowNull: false },
  maxGusts: { type: DataTypes.INTEGER, allowNull: false },
  languagesSupport: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Tour;
