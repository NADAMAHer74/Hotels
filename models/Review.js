const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Tour = require("./Tour");

const Review = sequelize.define("Review", {
  rating: { type: DataTypes.INTEGER, allowNull: false }, // Rating out of 5
  comment: { type: DataTypes.TEXT, allowNull: true },
});

// Set up associations
User.hasMany(Review);
Review.belongsTo(User);

Tour.hasMany(Review);
Review.belongsTo(Tour);

module.exports = Review;
