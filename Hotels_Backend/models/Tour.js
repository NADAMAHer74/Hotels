const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tour = sequelize.define(
  "Tour",
  {
    tour_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adultPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    kidsPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    childrenPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    durationInDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewStars: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tourImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    miniAge: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    maxGusts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    languagesSupport: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Tour;
