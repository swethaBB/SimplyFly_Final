import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/Axios';
import { useRole } from '../../context/RoleContext';
import createFlightBg from '../../assets/createflight.png'; 

export default function CreateFlightPage() {
  const role = useRole();
  const navigate = useNavigate();

  if (role !== 'ADMIN' && role !== 'FLIGHT_OWNER') return <div>Access Denied</div>;

  const [form, setForm] = useState({
    flightName: '',
    flightNumber: '',
    totalSeats: '',
    fare: '',
    baggageInfo: '',
    departureDateTime: '',
    arrivalDateTime: '',
    routeId: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    let sanitizedValue = value;

    if (name === 'flightNumber') {
      sanitizedValue = value.trim(); // remove trailing spaces
    }

    if (name === 'routeId') {
      sanitizedValue = Number(value); // ensure it's a number
    }

    setForm(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const flightNumberPattern = /^[A-Z]{2}\d{3,4}$/;
    const trimmedFlightNumber = form.flightNumber.trim();

    if (!flightNumberPattern.test(trimmedFlightNumber)) {
      setMessage('❌ Flight number must start with 2 uppercase letters followed by 3–4 digits (e.g., AI123)');
      return;
    }

    const payload = {
      ...form,
      flightNumber: trimmedFlightNumber,
      routeId: Number(form.routeId)
    };

    axios.post('/api/flights/addflight', payload)
      .then(res => {
        setMessage(`✅ Flight "${res.data.flightName}" created successfully!`);
        setForm({
          flightName: '',
          flightNumber: '',
          totalSeats: '',
          fare: '',
          baggageInfo: '',
          departureDateTime: '',
          arrivalDateTime: '',
          routeId: ''
        });
      })
      .catch(err => {
        console.error('Error creating flight:', err);
        setMessage('❌ Failed to create flight. Please check your input.');
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${createFlightBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <div
        className="container text-white position-relative"
        style={{ maxWidth: '900px', padding: '40px' }}
      >
        <div className="d-flex justify-content-end mb-3">
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() =>
              navigate(role === 'ADMIN' ? '/admin/admindashboard' : '/owner/flightownerdashboard')
            }
          >
            ← Back to Dashboard
          </button>
        </div>

        <h2 className="mb-4 text-center" style={{ fontWeight: '600' }}>Create New Flight</h2>

        <form onSubmit={handleSubmit} className="row g-3">
          {[
            { label: 'Flight Name', name: 'flightName', type: 'text' },
            { label: 'Flight Number', name: 'flightNumber', type: 'text' },
            { label: 'Total Seats', name: 'totalSeats', type: 'number' },
            { label: 'Fare', name: 'fare', type: 'number' },
            { label: 'Baggage Info', name: 'baggageInfo', type: 'text' },
            { label: 'Departure DateTime', name: 'departureDateTime', type: 'datetime-local' },
            { label: 'Arrival DateTime', name: 'arrivalDateTime', type: 'datetime-local' },
            { label: 'Route ID', name: 'routeId', type: 'number' }
          ].map(({ label, name, type }) => (
            <div className="col-md-6" key={name}>
              <label className="form-label text-white">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          ))}

          <div className="col-12">
            <button type="submit" className="btn btn-success">Create Flight</button>
          </div>

          {message && (
            <div className="col-12 mt-3">
              <div className="alert alert-info">{message}</div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
