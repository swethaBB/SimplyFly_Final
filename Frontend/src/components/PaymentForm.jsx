import React from 'react';

export default function PaymentForm({ onPay, isPaying = false }) {
  return (
    <div className="mt-4 p-4 bg-white rounded shadow-sm">
      <h4 className="mb-3 text-center" style={{ fontWeight: '600' }}>Choose Payment Method</h4>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary me-2"
          disabled={isPaying}
          onClick={() => onPay('CARD')}
        >
          {isPaying ? 'Processing...' : 'Pay with Card'}
        </button>

        <button
          className="btn btn-success"
          disabled={isPaying}
          onClick={() => onPay('UPI')}
        >
          {isPaying ? 'Processing...' : 'Pay with UPI'}
        </button>
      </div>

      <p className="mt-3 text-muted text-center" style={{ fontSize: '0.9rem' }}>
        Your payment is secure and encrypted.
      </p>
    </div>
  );
}
