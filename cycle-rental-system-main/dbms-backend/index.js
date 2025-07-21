import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import sequelize from './config/database.js';

// Load environment variables
config();

// Import route modules
import userRoutes from './routes/userRoutes.js';
import cyclesRoutes from './routes/cyclesRoutes.js';
import rentalsRoutes from './routes/rentalsRoutes.js';
import plansRoutes from './routes/plansRoutes.js';
import paymentsRoutes from './routes/paymentsRoutes.js';
import { getAvailableCyclesGroupedByHub } from './controllers/getAvailableCyclesGroupedByHub.js';


// Initialize Express app
const app = express();

// Enable CORS for all routes (allow all origins)
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

 // Use availableCycles routes for cycle-related requests


app.use('/api/users', userRoutes);
app.use('/api/cycles', cyclesRoutes);
app.use('/api/rentals', rentalsRoutes);  // rental routes here
app.use('/api/plans', plansRoutes);
app.use('/api/payments', paymentsRoutes);
app.get('/api/cycles/available', getAvailableCyclesGroupedByHub);

// Server port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Sync database and start server
sequelize.sync()
  .then(() => {
    console.log('Database synchronized.');
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error syncing database:', error);
  });

// Global Error Handling Middleware
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});
