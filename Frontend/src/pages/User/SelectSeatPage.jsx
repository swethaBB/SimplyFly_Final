import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SeatSelector from '../../components/SeatSelector';
import axios from '../../services/Axios';
import bgseats from '../../assets/seatbg.png';

export default function SelectSeatPage() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flight, setFlight] = useState(null);

  const seatFareMap = {
    ECONOMY: 2500,
    BUSINESS: 5000,
    FIRST: 8000
  };

  useEffect(() => {
    // Fetch flight details
    axios.get(`/api/flights/${flightId}`)
      .then(res => setFlight(res.data))
      .catch(err => console.error('Error fetching flight:', err));

    // Fetch available seats
    axios.get(`/api/seats/flight/${flightId}/available`)
      .then(res => {
        setSeats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching seats:', err);
        setLoading(false);
      });
  }, [flightId]);

  const calculateTotalPrice = (selectedSeats) => {
    return selectedSeats.reduce((sum, sn) => {
      const seat = seats.find(s => s.seatNumber.trim() === sn.trim());
      if (!seat) {
        console.warn(`Seat ${sn} not found in seat list`);
        return sum;
      }
      const fare = seatFareMap[seat.seatClass?.toUpperCase()] || 0;
      return sum + fare;
    }, 0);
  };

  const toggleSeat = seatNumber => {
    const updatedSelection = selected.includes(seatNumber)
      ? selected.filter(s => s !== seatNumber)
      : [...selected, seatNumber];

    setSelected(updatedSelection);
    const newTotal = calculateTotalPrice(updatedSelection);
    setTotalPrice(newTotal);
  };

  const handleProceed = async () => {
    try {
      const payload = {
        flightId: flightId,
        seatNumbers: selected,
        totalPrice: totalPrice
      };

      navigate(`/booking/${flightId}`, {
        state: {
          selected,
          totalPrice
        }
      });

    } catch (err) {
      console.error('Booking failed:', err);
      alert(err.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'SCHEDULED':
        return 'bg-success';
      case 'DELAYED':
        return 'bg-warning text-dark';
      case 'CANCELLED':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-start"
      style={{
        backgroundImage: `url(${bgseats})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
        overflowY: 'auto',
        paddingTop: '100px'
      }}
    >

      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
  <button onClick={() => navigate('/user/search-flight')} className="btn btn-outline-light">
    ← Back to Search
  </button>
</div>

      <h2 className="text-white mb-4" style={{ fontWeight: '600', fontSize: '2rem' }}>
        Select Seats
      </h2>

      <div style={{ width: '100%', maxWidth: '600px' }} className="px-3">
        {flight && (
          <p className="text-white fs-5">
            <strong>Status:</strong>{' '}
            <span className={`badge ${getStatusBadgeClass(flight.status)}`}>
              {flight.status}
            </span>
          </p>
        )}

        {flight?.status === 'CANCELLED' ? (
          <p className="text-danger fs-5">This flight has been cancelled. Booking is disabled.</p>
        ) : loading ? (
          <p className="text-white">Loading available seats...</p>
        ) : seats.length === 0 ? (
          <p className="text-white">No available seats found for this flight.</p>
        ) : (
          <>
            <SeatSelector seats={seats} selected={selected} toggleSeat={toggleSeat} />

            <p className="mt-4 text-white fs-5">
              <strong>Total Price:</strong> ₹{totalPrice}
            </p>

            <button
              className="btn btn-primary mt-2 w-100"
              disabled={selected.length === 0}
              onClick={handleProceed}
            >
              Proceed to Booking
            </button>
          </>
        )}
      </div>
    </div>
  );
}
