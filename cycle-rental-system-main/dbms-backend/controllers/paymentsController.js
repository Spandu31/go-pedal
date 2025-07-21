import Payment from '../models/paymentModel.js';
import Plan from '../models/planModel.js';
import sequelize from '../config/database.js';

// ✅ Get payments by user ID
export async function getPaymentsByUser(req, res) {
  const { user_id } = req.params;
  try {
    const payments = await Payment.findAll({ where: { user_id } });
    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: 'No payments found for this user' });
    }
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching user payments:', error);
    res.status(500).json({ message: 'Failed to fetch user payments', error: error.message });
  }
}

// ✅ Get all payments (admin or for debugging)
export async function getAllPayments(req, res) {
  try {
    const payments = await Payment.findAll();
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching all payments:', error);
    res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
  }
}

// ✅ Create a new payment entry
export async function createPayment(req, res) {
  const { user_id, plan_id, payment_method } = req.body;

  if (!user_id || !plan_id) {
    return res.status(400).json({ message: 'User ID and Plan ID are required' });
  }

  try {
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    const amount = plan.price;
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: 'Invalid plan price' });
    }

    const payment = await sequelize.transaction(async (t) => {
      const newPayment = await Payment.create(
        {
          user_id,
          plan_id,
          amount,
          payment_method,
          status: 'pending',
          payment_date: new Date()
        },
        { transaction: t }
      );
      return newPayment;
    });

    res.status(201).json({
      message: 'Payment successfully created!',
      payment: {
        id: payment.id,
        user_id: payment.user_id,
        plan_id: payment.plan_id,
        amount: payment.amount,
        payment_date: payment.payment_date,
        status: payment.status,
        payment_method: payment.payment_method,
        plan: {
          id: plan.id,
          name: plan.name,
          price: plan.price,
        },
      },
    });

  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ message: 'Error creating payment', error: error.message });
  }
}
