import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Cycle = sequelize.define('Cycle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  battery: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hub: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('available', 'rented', 'maintenance'),
    defaultValue: 'available',
  },
}, {
  tableName: 'cycles',
  timestamps: false,
});

export default Cycle;
