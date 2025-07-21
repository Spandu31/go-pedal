import React from 'react';
import './Checkout.css';

const Checkout = () => {
  return (
    <div className="checkout-container">
      <div className="header">Checkout</div>

      <div className="highlight">Woohoo! You saved ₹21</div>

      <div className="section">
        <div className="row">
          <strong>Subscr</strong>
          <span>24 HOURS UNLIMITED TRIAL</span>
        </div>
        <div className="row">
          <strong>Subscription Charges</strong>
          <span className="price">₹79 <s className="original">₹100</s></span>
        </div>
        <div className="row">
          <strong>Subscription Validity</strong>
          <span>1 Day</span>
        </div>
        <div className="row">
          <strong>Late Return Charges</strong>
          <span>₹10 / Hour</span>
        </div>
      </div>

      <div className="promo-section">
        <strong>Use Promo Code</strong>
        <div className="promo-input">
          <input type="text" placeholder="Enter Promo Code here" />
          <button>Apply</button>
        </div>
      </div>

      <div className="summary">
        <h3>Summary</h3>
        <div className="row">
          <span>Subscription Charges</span>
          <span>₹100</span>
        </div>
        <div className="row">
          <span className="discount">Discount</span>
          <span className="discount">- ₹21</span>
        </div>
        <div className="row">
          <strong>Net Charges</strong>
          <strong>₹79</strong>
        </div>
        <div className="row">
          <span>Security Deposit (Refundable)</span>
          <span className="paid">Paid</span>
        </div>
        <hr />
        <div className="row total">
          <strong>Net Payable</strong>
          <strong>₹79</strong>
        </div>
      </div>

      <button className="pay-button">PROCEED TO PAY</button>
    </div>
  );
};

export default Checkout;
