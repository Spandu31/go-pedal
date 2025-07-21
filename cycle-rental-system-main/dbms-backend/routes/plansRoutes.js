import { Router } from 'express';
const router = Router();
import { getAllPlans, createPlan } from '../controllers/plansController.js';

router.get('/', getAllPlans); // ✅ this should be just '/' not '/plans'
router.post('/', createPlan);
export default router;
