import sequelize from '../config/database.js';

import User from './userModel.js';
import Cycle from './cycleModel.js';
import Rental from './rentalModel.js';
import Plan from './planModel.js';
import Payment from './paymentModel.js';

// Cycle and Rental
Cycle.hasMany(Rental, { foreignKey: 'cycle_id', as: 'rentals' });
Rental.belongsTo(Cycle, { foreignKey: 'cycle_id', as: 'cycle' });

// User and Rental
User.hasMany(Rental, { foreignKey: 'user_id', as: 'rentals' });
Rental.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// User and Payment
User.hasMany(Payment, { foreignKey: 'user_id', as: 'payments' });
Payment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Payment and Plan
Plan.hasMany(Payment, { foreignKey: 'plan_id', as: 'payments' });
Payment.belongsTo(Plan, { foreignKey: 'plan_id', as: 'plan' });

// Export all models and sequelize instance
export { sequelize, User, Cycle, Rental, Plan, Payment };
