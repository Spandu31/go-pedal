import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/db.js';
import User from './userModel.js';
import Cycle from './cycleModel.js';

const Rental = sequelize.define('Rental', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cycle_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'rentals',
  timestamps: false,
});



export default Rental;
