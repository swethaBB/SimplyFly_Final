import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../services/Axios';
import bgbooking from '../../assets/bookingbg.png';

export default function BookingPage() {
  const { flightId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [passengerName, setPassengerName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [flight, setFlight] = useState(null);

  const { selected, totalPrice } = location.state || {};

  useEffect(() => {
    axios.get(`/api/flights/${flightId}`)
      .then(res => setFlight(res.data))
      .catch(err => console.error('Error fetching flight:', err));
  }, [flightId]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'SCHEDULED': return 'bg-success';
      case 'DELAYED': return 'bg-warning text-dark';
      case 'CANCELLED': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const handleBooking = async () => {
    if (!passengerName.trim()) {
      setError('Passenger name is required');
      return;
    }
    if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setError('Valid email is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('jwt');
      const payload = {
        flightId,
        seatNumbers: selected,
        totalPrice,
        passengerName,
        email,
        status: 'PENDING'
      };

      const res = await axios.post('/api/bookings/bookingseat', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { bookingId, paymentRedirect } = res.data;

      localStorage.setItem('bookingId', bookingId);
      localStorage.setItem('passengerName', passengerName);
      localStorage.setItem('email', email);
      localStorage.setItem('seatNumbers', JSON.stringify(selected));
      localStorage.setItem('totalPrice', totalPrice);
      localStorage.setItem('flightId', flightId);

      navigate('/payment', {
        state: {
          bookingId,
          passengerName,
          email,
          seatNumbers: selected,
          totalPrice,
          flightId,
          paymentRedirect
        }
      });
    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.response?.data?.message || 'Booking failed. Try again.');
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-start"
      style={{
        backgroundImage: `url(${bgbooking})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        paddingTop: '100px'
      }}
    >

      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
  <button onClick={() => navigate(`/select-seat/${flightId}`)} className="btn btn-outline-dark">
    ← Back to Seats
  </button>
</div>

      <h2 className="mb-4" style={{ fontWeight: '600', fontSize: '2rem', color: 'black' }}>
        Confirm Booking
      </h2>

      <div style={{ width: '100%', maxWidth: '600px' }} className="px-3">
        {flight && (
          <p className="fs-5" style={{ color: 'black' }}>
            <strong>Flight Status:</strong>{' '}
            <span className={`badge ${getStatusBadgeClass(flight.status)}`}>
              {flight.status}
            </span>
          </p>
        )}

        {flight?.status === 'CANCELLED' && (
          <p className="text-danger fs-6 mb-3">
            This flight has been cancelled. Booking is disabled.
          </p>
        )}

        <div className="mb-3">
          <label className="form-label" style={{ color: 'black' }}>Passenger Name</label>
          <input
            type="text"
            className="form-control"
            value={passengerName}
            onChange={e => setPassengerName(e.target.value)}
            placeholder="Enter passenger name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ color: 'black' }}>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
        </div>

        <p className="fs-5" style={{ color: 'black' }}>
          <strong>Seats:</strong> {selected?.join(', ')}
        </p>
        <p className="fs-5" style={{ color: 'black' }}>
          <strong>Total Price:</strong> ₹{totalPrice}
        </p>

        {error && <p className="text-danger">{error}</p>}

        <button
          className="btn btn-success w-100 mt-3"
          onClick={handleBooking}
          disabled={loading || flight?.status === 'CANCELLED'}
        >
          {loading ? 'Processing...' : 'Confirm & Review Booking'}
        </button>
      </div>
    </div>
  );
}
