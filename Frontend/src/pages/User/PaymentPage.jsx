import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../services/Axios';
import { toast } from 'react-toastify';
import bgpayment from '../../assets/bgadmin.png';
import { updateBookingStatus } from '../../services/BookingService';

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { bookingId, passengerName, email, seatNumbers, totalPrice } = state || {};

  const [initiated, setInitiated] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [bookingStatus, setBookingStatus] = useState('PENDING');

  const fetchBookingStatus = async () => {
    try {
      const res = await axios.get(`/api/bookings/${bookingId}`);
      setBookingStatus(res.data?.status || 'PENDING');
      if (res.data?.status === 'CONFIRMED') {
        setPaymentSuccess(true);
      }
    } catch (err) {
      toast.error("Failed to fetch booking status.");
    }
  };

  useEffect(() => {
    if (bookingId) {
      fetchBookingStatus();
    }
  }, [bookingId]);

  useEffect(() => {
    if (!bookingId || !totalPrice || bookingStatus === 'CONFIRMED') return;

    axios.get('/api/payments/initiate', {
      params: { bookingId, amount: totalPrice }
    })
      .then(() => {
        setInitiated(true);
        toast.info("Payment initialized.");
      })
      .catch(() => toast.error("Failed to initiate payment."));
  }, [bookingId, totalPrice, bookingStatus]);

  const handlePayment = async (method) => {
    if (!method || !bookingId || !totalPrice) return;

    setIsPaying(true);
    toast.info(`Processing ${method} payment...`);

    try {
      const res = await axios.post('/api/payments/pay', {
        bookingId,
        amount: totalPrice,
        method
      });

      if (res.data?.status === 'SUCCESS') {
        await updateBookingStatus(bookingId, 'CONFIRMED');
        await fetchBookingStatus();
        toast.success("✅ Payment successful!");
      } else {
        toast.error("❌ Payment failed.");
      }
    } catch (err) {
      toast.error(`❌ Payment error: ${err?.response?.data?.message || err.message}`);
    } finally {
      setIsPaying(false);
    }
  };

  const handleLogout = () => {
    // Clear any auth tokens if needed
    localStorage.clear();
    navigate('/login');
  };

  if (!bookingId) {
    return <h4 className="text-center text-danger mt-5">Booking ID not found.</h4>;
  }

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-start"
      style={{
        backgroundImage: `url(${bgpayment})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        paddingTop: '100px'
      }}
    >
      <div className="w-100 d-flex justify-content-end px-4">
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2 className="mb-4 fw-bold text-dark">Complete Your Payment</h2>

      <div style={{ maxWidth: '600px', width: '100%' }} className="px-3">
        <p className="fs-5"><strong>Passenger:</strong> {passengerName}</p>
        <p className="fs-5"><strong>Email:</strong> {email}</p>
        <p className="fs-5"><strong>Seats:</strong> {seatNumbers?.join(', ')}</p>
        <p className="fs-5"><strong>Total Fare:</strong> ₹{totalPrice}</p>
        <p className="fs-5"><strong>Status:</strong> {bookingStatus}</p>

        {!paymentSuccess ? (
          <div className="mt-4 p-4 bg-white rounded shadow-sm text-center">
            <h4 className="mb-3 fw-semibold">Choose Payment Method</h4>

            <button
              className="btn btn-primary me-2"
              disabled={isPaying}
              onClick={() => handlePayment('CARD')}
            >
              {isPaying ? 'Processing...' : 'Pay with Card'}
            </button>

            <button
              className="btn btn-success ms-2"
              disabled={isPaying}
              onClick={() => handlePayment('UPI')}
            >
              {isPaying ? 'Processing...' : 'Pay with UPI'}
            </button>

            <p className="mt-3 text-muted small">Your payment is secure and encrypted.</p>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-light rounded text-center">
            <h5 className="text-success">✅ Payment completed successfully!</h5>
            <p className="text-muted">Thank you for booking with SimplyFly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
