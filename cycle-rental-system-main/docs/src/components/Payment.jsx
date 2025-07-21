import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  // Correct user parsing once, at the top level
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        const user = parsed.user ? parsed.user : parsed;  // support both shapes

        if (user && user.id) {
          setUserId(user.id);
        } else {
          toast.error("Invalid user data. Please log in again.");
          navigate('/login');
        }
      } else {
        toast.error("You must be logged in to proceed.");
        navigate('/login');
      }
    } catch (err) {
      console.error("Failed to parse user data from localStorage:", err);
      toast.error("User authentication error.");
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/plans');
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
        toast.error('Error loading plans. Please try again.');
      }
    };

    fetchPlans();
  }, []);

  const handlePlanSelect = (plan) => setSelectedPlan(plan);

  const handlePayment = async () => {
    if (!selectedPlan || !paymentMethod) {
      toast.error("Please select a plan and payment method!");
      return;
    }

    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          plan_id: selectedPlan.id,
          payment_method: paymentMethod,
        }),
      });

      if (response.ok) {
        setIsPaymentSuccessful(true);
        toast.success("Payment Successful!");
        setTimeout(() => {
          navigate('/available-cycles', { state: { paymentSuccess: true } });
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment">
      <h2>Select a Plan</h2>

      {plans.length === 0 ? (
        <p>Loading plans...</p>
      ) : (
        <div className="plans">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => handlePlanSelect(plan)}
              className={`plan-button ${selectedPlan?.id === plan.id ? 'selected' : ''}`}
            >
              {plan.name} - ₹{plan.price} for {plan.duration_days} days
            </button>
          ))}
        </div>
      )}

      {selectedPlan && (
        <div className="payment-form">
          <p>You selected: <strong>{selectedPlan.name}</strong></p>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="payment-method-dropdown"
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Cash">Cash</option>
          </select>

          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Processing payment...</p>
            </div>
          ) : (
            <button
              onClick={handlePayment}
              className="pay-button"
              disabled={loading}
            >
              Pay Now
            </button>
          )}
        </div>
      )}

      {isPaymentSuccessful && (
        <div className="success-container">
          <div className="checkmark-circle">
            <div className="checkmark"></div>
          </div>
          <p className="success-message">Payment Successful! Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
