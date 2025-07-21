// dbms-backend/config/db.js
import { Sequelize } from "sequelize";
import { config } from "dotenv";
config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false // optional: disables SQL query logging
  }
);

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Connected to MySQL DB via Sequelize"))
  .catch((err) => console.error("❌ Unable to connect to DB:", err));

export default sequelize;
