const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Tour = require("./Tour");
const AdditionalService = require("./AdditionalService");

const Reservation = sequelize.define("Reservation", {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  adultQuantity: { type: DataTypes.INTEGER, allowNull: true },
  kidsQuantity: { type: DataTypes.INTEGER, allowNull: true },
  childQuantity: { type: DataTypes.INTEGER, allowNull: true },
});

// Define relations
User.hasMany(Reservation);
Reservation.belongsTo(User);

Tour.hasMany(Reservation);
Reservation.belongsTo(Tour);

Reservation.belongsToMany(AdditionalService, {
  through: "ReservationServices",
});
AdditionalService.belongsToMany(Reservation, {
  through: "ReservationServices",
});

module.exports = Reservation;
