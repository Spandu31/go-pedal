import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);



// Test the connection (optional, but helpful for debugging)
sequelize.authenticate()
  .then(() => console.log('Connection to MySQL database established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Export the sequelize instance
export default sequelize;
