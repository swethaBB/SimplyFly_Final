import React, { useEffect, useState } from 'react';
import {
  getAllRoutes,
  addRoute,
  updateRoute,
  deleteRoute,
} from '../../services/routeService';
import { useNavigate } from 'react-router-dom';
import routesBg from '../../assets/routes.png'; 

const RouteManager = () => {
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({
    origin: '',
    destination: '',
    durationMinutes: '',
    distanceKm: '',
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    const res = await getAllRoutes();
    setRoutes(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateRoute(editingId, form);
    } else {
      await addRoute(form);
    }
    setForm({
      origin: '',
      destination: '',
      durationMinutes: '',
      distanceKm: '',
    });
    setEditingId(null);
    fetchRoutes();
  };

  const handleEdit = (route) => {
    setForm({
      origin: route.origin,
      destination: route.destination,
      durationMinutes: route.durationMinutes,
      distanceKm: route.distanceKm,
    });
    setEditingId(route.id);
  };

  const handleDelete = async (id) => {
    await deleteRoute(id);
    fetchRoutes();
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start vh-100"
      style={{
        backgroundImage: `url(${routesBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        paddingTop: '40px'
      }}
    >
      <div className="container bg-light rounded p-4 position-relative" style={{ maxWidth: '1000px' }}>
        {/* Back Button */}
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
            className="btn btn-outline-dark"
            style={{ backgroundColor: 'transparent', borderWidth: '2px' }}
            onClick={() => navigate('/admin/admindashboard')}
          >
            ← Back to Dashboard
          </button>
        </div>

        <h2 className="mb-4 text-center">Manage Routes</h2>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row g-2">
            <div className="col">
              <input
                name="origin"
                value={form.origin}
                onChange={handleChange}
                className="form-control"
                placeholder="Origin"
                required
              />
            </div>
            <div className="col">
              <input
                name="destination"
                value={form.destination}
                onChange={handleChange}
                className="form-control"
                placeholder="Destination"
                required
              />
            </div>
            <div className="col">
              <input
                name="durationMinutes"
                type="number"
                value={form.durationMinutes}
                onChange={handleChange}
                className="form-control"
                placeholder="Duration (min)"
                required
              />
            </div>
            <div className="col">
              <input
                name="distanceKm"
                type="number"
                value={form.distanceKm}
                onChange={handleChange}
                className="form-control"
                placeholder="Distance (km)"
                required
              />
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary w-100">
                {editingId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.id}>
                  <td>{route.id}</td>
                  <td>{route.origin}</td>
                  <td>{route.destination}</td>
                  <td>{route.durationMinutes} min</td>
                  <td>{route.distanceKm} km</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(route)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(route.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RouteManager;
