import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Payment.css';
import Sidebar from './StudentSidebar';

function Payments() {
  const studentId = 1;
  const [history, setHistory] = useState([]);
  const [newPayment, setNewPayment] = useState({
    fee_type: 'Hostel',
    amount: '',
    description: '',
    upi_id: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/payments/${studentId}`)
      .then(res => setHistory(res.data));
  }, [studentId]);

  const handlePayment = async () => {
    if (!newPayment.upi_id.includes('@')) {
      alert("Enter valid UPI ID (example: name@okaxis)");
      return;
    }

    await axios.post('http://localhost:5000/payment', {
      studentId,
      ...newPayment
    });
    alert('Payment initiated via UPI');
    window.location.reload();
  };

  return (
    <>
      <Sidebar />
      <div className="container">
        <h2>Make a Payment</h2>

        <div className="form-group">
          <select
            value={newPayment.fee_type}
            onChange={e => setNewPayment({ ...newPayment, fee_type: e.target.value })}
          >
            <option value="Hostel">Hostel Fee</option>
            <option value="Mess">Mess Fee</option>
          </select>

          <input
            type="number"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={e => setNewPayment({ ...newPayment, amount: e.target.value })}
          />

          <input
            type="text"
            placeholder="UPI ID (e.g., user@okaxis)"
            value={newPayment.upi_id}
            onChange={e => setNewPayment({ ...newPayment, upi_id: e.target.value })}
          />

          <input
            type="text"
            placeholder="Description"
            value={newPayment.description}
            onChange={e => setNewPayment({ ...newPayment, description: e.target.value })}
          />

          <button onClick={handlePayment}>Pay with GPay / UPI</button>
        </div>

        <h3>Payment History</h3>
        <ul className="payment-history">
          {history.map(pay => (
            <li key={pay.id}>
              <strong>{pay.fee_type}</strong> - ₹{pay.amount} - {pay.description}{' '}
              <span className={`payment-status ${pay.status?.toLowerCase()}`}>({pay.status})</span>
              <br />
              on {new Date(pay.payment_date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
      </>
  );
}

export default Payments;
