import express from 'express';
import { createRental, getRentalsByUser, returnRental, getAllCycles, deleteRental } from '../controllers/rentalsController.js';

const router = express.Router();

// Define routes for rental operations
router.post('/rentals', createRental);  // Create a rental
router.get('/rentals/:userId', getRentalsByUser);  // Get rentals by user
router.put('/rentals/:id/return', returnRental);  // Return a rental (PUT request)
router.get('/cycles', getAllCycles);  // Get all cycles
router.delete('/rentals/:id', deleteRental);  // DELETE request for deleting a rental

export default router;  // Export the router for use in index.js
