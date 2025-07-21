import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Sequelize instance
sequelize.sync({ alter: true });

// Define the Payment model
const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Automatically increment the payment ID
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Ensure user_id is always provided
  },
  plan_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Ensure plan_id is always provided
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false, // Amount should be set once the payment is confirmed
  },
  payment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Default to current timestamp when payment is created
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    allowNull: false, // Ensure status is always provided
    defaultValue: 'pending', // Default payment status is 'pending'
  },
  payment_method: {
    type: DataTypes.STRING(50),
    allowNull: true, // Can be null if method isn't specified or isn't required
  }
}, {
  tableName: 'payments',     // Ensure it matches the actual table name in your database
  timestamps: false,         // Disable Sequelize's default timestamps (createdAt, updatedAt)
});

// Optional Associations
// Payment.belongsTo(User, { foreignKey: 'user_id' });
// Payment.belongsTo(Plan, { foreignKey: 'plan_id' });

export default Payment;
