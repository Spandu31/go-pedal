import sequelize from '../config/database.js'; // Corrected import for default export
import { DataTypes } from 'sequelize'; // Import DataTypes

// Define Plan model
const Plan = sequelize.define('Plan', {
  name: {
    type: DataTypes.STRING, // Plan name (e.g., "Basic", "Premium")
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Price of the plan with 2 decimal points
    allowNull: false
  },
  duration_days: {
    type: DataTypes.INTEGER, // Duration in days for the plan
    allowNull: false
  }
}, { 
  timestamps: false // Disable the automatic creation of 'createdAt' and 'updatedAt' fields
});

export default Plan;
