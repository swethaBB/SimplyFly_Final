import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from '../../services/Axios';

export default function SearchRoutePage() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    axios.get('/routes')
      .then(res => setRoutes(res.data))
      .catch(err => console.error('Error fetching routes:', err));
  }, []);

  return (
    <div className="container mt-4">
      <Header title="Available Routes" />
      <ul className="list-group">
        {routes.map(r => (
          <li key={r.id} className="list-group-item">
            {r.origin} → {r.destination} ({r.durationMinutes} mins, {r.distanceKm} km)
          </li>
        ))}
      </ul>
    </div>
  );
}
