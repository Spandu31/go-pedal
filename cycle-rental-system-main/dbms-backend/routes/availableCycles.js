// Import necessary modules
import express from 'express';
import { rentCycle, completeRental } from '../controllers/cyclesController.js';
import { getAvailableCyclesGroupedByHub } from '../controllers/getAvailableCyclesGroupedByHub.js';

const router = express.Router();  // Create a new router instance

// Route to get available cycles grouped by hubs
router.get('/available', getAvailableCyclesGroupedByHub);  // Fetch available cycles grouped by hub

// Route to rent a cycle
router.post('/rent', rentCycle);  // Rent a cycle (requires cycle ID and user ID in the body)

// Route to complete a rental and return the cycle
router.put('/return-cycle', completeRental);  // Mark a cycle as returned and update its status (renamed for clarity)

// Export the router to be used in the main server file (app.js or server.js)
export default router;
