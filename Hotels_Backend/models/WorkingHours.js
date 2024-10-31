const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const WorkingHours = sequelize.define("WorkingHours", {
  working_hours_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  start_day: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  end_day: {
    type: DataTypes.STRING(45),
  },
  start_hour: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_hour: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  visible: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
}, {
  tableName: 'working_hours',
  timestamps: false,
});

module.exports = WorkingHours;
