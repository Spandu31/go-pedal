import express from 'express';
import { rentCycle, completeRental, getAllCycles, addCycle, deleteCycle } from '../controllers/cyclesController.js';

const router = express.Router();

router.get('/', getAllCycles);
router.post('/', addCycle);
router.delete('/:id', deleteCycle);

router.post('/rent', rentCycle);
router.post('/complete', completeRental);

export default router;
