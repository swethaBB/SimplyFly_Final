import { useEffect, useState } from 'react';
import axios from '../../services/Axios';
import { useRole } from '../../context/RoleContext';
import manageFlightsBg from '../../assets/manageflights.png';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ManageFlightsPage() {
  const [flights, setFlights] = useState([]);
  const [editingFlight, setEditingFlight] = useState(null);
  const [viewMode, setViewMode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const role = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (viewMode) fetchFlights();
  }, [viewMode]);

  const fetchFlights = () => {
    axios.get('/api/flights/all')
      .then(res => setFlights(res.data))
      .catch(err => console.error('Error fetching flights:', err));
  };

  const handleDelete = (id) => {
    if (role !== 'ADMIN') return;
    axios.delete(`/api/flights/${id}`)
      .then(() => {
        setFlights(prev => prev.filter(f => f.id !== id));
        toast.success('Flight deleted');
      })
      .catch(() => toast.error('Delete failed'));
  };

  const handleUpdate = () => {
    if (role !== 'ADMIN') return;
    axios.put(`/api/flights/${editingFlight.id}`, editingFlight)
      .then(() => {
        setEditingFlight(null);
        fetchFlights();
        toast.success('Flight updated');
      })
      .catch(() => toast.error('Update failed'));
  };

  const updateFlightStatus = (id, status) => {
    axios.patch(`/api/flights/${id}/status`, { status })
      .then(() => {
        toast.success(`Status updated to ${status}`);
        fetchFlights();
      })
      .catch((err) => {
        console.error('Status update failed:', err);
        toast.error(err.response?.data || 'Failed to update status');
      });
  };

  const filteredFlights = flights.filter(f =>
    f.flightName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.flightNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="d-flex justify-content-center align-items-start vh-100"
      style={{
        backgroundImage: `url(${manageFlightsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        paddingTop: '40px'
      }}
    >
      <div className="container text-white" style={{ maxWidth: '1000px' }}>
        {/* Back to Owner Dashboard */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10
          }}
        >
          <button
            type="button"
            className="btn btn-outline-light"
            style={{ backgroundColor: 'transparent', borderWidth: '2px' }}
            onClick={() => navigate('/owner/flightownerdashboard')}
          >
            ← Back to Dashboard
          </button>
        </div>

        <h2 className="mb-4 text-center">Manage Flights</h2>

        <div className="mb-4 d-flex gap-3 justify-content-center">
          <button className="btn btn-primary" onClick={() => setViewMode('LIST')}>List All Flights</button>
          <button className="btn btn-warning" onClick={() => setViewMode('EDIT')}>Edit</button>
          {role === 'ADMIN' && (
            <button className="btn btn-danger" onClick={() => setViewMode('DELETE')}>Delete</button>
          )}
        </div>

        {viewMode === 'LIST' && (
          <>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search by flight name or number"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredFlights.map(f => (
              <div key={f.id} className="card bg-transparent border-light text-white mb-2 p-3">
                <h5>{f.flightName} ({f.flightNumber})</h5>
                <p>From {f.route?.origin || 'Unknown'} to {f.route?.destination || 'Unknown'}</p>
                <p>Fare: ₹{f.fare} | Seats: {f.totalSeats}</p>
                <p>Baggage: {f.baggageInfo}</p>
                <p>Departure: {f.departureDateTime} | Arrival: {f.arrivalDateTime}</p>
                <select
                  className="form-select mt-2"
                  value={f.status || 'SCHEDULED'}
                  onChange={(e) => updateFlightStatus(f.id, e.target.value)}
                >
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="DELAYED">Delayed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            ))}
          </>
        )}

        {viewMode === 'EDIT' && flights.map(f => (
          <div key={f.id} className="card bg-transparent border-light text-white mb-2 p-3">
            <h5>{f.flightName} ({f.flightNumber})</h5>
            <p>From {f.route?.origin || 'Unknown'} to {f.route?.destination || 'Unknown'}</p>
            <button className="btn btn-warning" onClick={() => setEditingFlight(f)}>Edit</button>
          </div>
        ))}

        {viewMode === 'DELETE' && flights.map(f => (
          <div key={f.id} className="card bg-transparent border-light text-white mb-2 p-3">
            <h5>{f.flightName} ({f.flightNumber})</h5>
            <p>From {f.route?.origin || 'Unknown'} to {f.route?.destination || 'Unknown'}</p>
            <button className="btn btn-danger" onClick={() => handleDelete(f.id)}>Delete</button>
          </div>
        ))}

        {editingFlight && (
          <div className="card bg-transparent border-light text-white mt-4 p-3">
            <h4>Edit Flight</h4>
            <input
              type="text"
              className="form-control mb-2"
              value={editingFlight.flightName}
              onChange={(e) => setEditingFlight({ ...editingFlight, flightName: e.target.value })}
              placeholder="Flight Name"
            />
            <input
              type="text"
              className="form-control mb-2"
              value={editingFlight.flightNumber}
              onChange={(e) => setEditingFlight({ ...editingFlight, flightNumber: e.target.value })}
              placeholder="Flight Number"
            />
            <input
              type="number"
              className="form-control mb-2"
              value={editingFlight.fare}
              onChange={(e) => setEditingFlight({ ...editingFlight, fare: e.target.value })}
              placeholder="Fare"
            />
            <input
              type="number"
              className="form-control mb-2"
              value={editingFlight.totalSeats}
              onChange={(e) => setEditingFlight({ ...editingFlight, totalSeats: e.target.value })}
              placeholder="Total Seats"
            />
            <input
              type="text"
              className="form-control mb-2"
              value={editingFlight.baggageInfo}
              onChange={(e) => setEditingFlight({ ...editingFlight, baggageInfo: e.target.value })}
              placeholder="Baggage Info"
            />
            <input
              type="datetime-local"
              className="form-control mb-2"
              value={editingFlight.departureDateTime}
              onChange={(e) => setEditingFlight({ ...editingFlight, departureDateTime: e.target.value })}
              placeholder="Departure DateTime"
            />
            <input
              type="datetime-local"
              className="form-control mb-2"
              value={editingFlight.arrivalDateTime}
              onChange={(e) => setEditingFlight({ ...editingFlight, arrivalDateTime: e.target.value })}
              placeholder="Arrival DateTime"
            />
            <input
              type="number"
              className="form-control mb-2"
              value={editingFlight.route?.id || ''}
              onChange={(e) => setEditingFlight({
                ...editingFlight,
                route: { ...editingFlight.route, id: parseInt(e.target.value) }
              })}
              placeholder="Route ID"
            />
            <div className="d-flex gap-2">
              <button className="btn btn-success" onClick={handleUpdate}>Save Changes</button>
              <button className="btn btn-secondary" onClick={() => setEditingFlight(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
