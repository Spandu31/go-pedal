import { Router } from 'express';
import { getPaymentsByUser, createPayment, getAllPayments } from '../controllers/paymentsController.js';

const router = Router();

router.get('/', getAllPayments);               // GET all payments
router.get('/:user_id', getPaymentsByUser);    // GET payments by user ID
router.post('/', createPayment);               // POST to create a new payment

export default router;
