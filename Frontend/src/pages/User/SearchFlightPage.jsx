import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlightCard from '../../components/FlightCard';
import axios from '../../services/Axios';
import bgsearch from '../../assets/searchflight.png'; 

export default function SearchFlightPage() {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [flights, setFlights] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!origin || !destination) return;

    axios.get('/api/flights/search', {
      params: {
        origin: origin.trim(),
        destination: destination.trim()
      }
    })
    .then(res => setFlights(res.data))
    .catch(err => console.error('Error fetching flights:', err));
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${bgsearch})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        width: '100vw',
        overflowY: 'auto',
        padding: '40px 20px'
      }}
    >

      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
  <button onClick={() => navigate('/user/userdashboard')} className="btn btn-outline-light">
    ← Back to Dashboard
  </button>
</div>

      <h2 className="text-white mb-4" style={{ fontWeight: '600', fontSize: '2rem' }}>
        Search Your Flight 
      </h2>

      <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '500px' }}>
        <div className="d-flex flex-column gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Origin City"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Enter Destination City"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100">Search</button>
        </div>
      </form>

      <div className="mt-5 px-3" style={{ width: '100%', maxWidth: '900px' }}>
        {flights.length > 0 && flights.map(f => (
          <FlightCard key={f.id} flight={f} onSelect={(id) => navigate(`/select-seat/${id}`)} />
        ))}
      </div>
      
    </div>
  );
}
