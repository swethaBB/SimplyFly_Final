import { Link, useNavigate } from 'react-router-dom';
import { useRole } from '../../context/RoleContext';
import bdadmin from '../../assets/bgadmin.png';
import { cardStyle } from "../../utils/cardStyles";

export default function AdminDashboard() {
  const role = useRole();
  const navigate = useNavigate();

  if (role !== 'ADMIN') return <div>Access Denied</div>;

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${bdadmin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div className="text-center">
        {/* 🔓 Logout Button */}
        <button
          onClick={() => navigate('/login')}
          className="btn btn-outline-light mb-4"
          style={{ position: 'absolute', top: '20px', right: '30px' }}
        >
          Logout
        </button>

        <h2 style={{ color: 'white', fontWeight: '600', fontSize: '2rem', marginBottom: '30px' }}>
          Admin Dashboard
        </h2>

        <div className="d-flex flex-wrap justify-content-center gap-4">
          {/* First Row */}
          <Link to="/create-flight" className="text-decoration-none">
            <div style={cardStyle('/assets/createflight.png')}>
              <h5 className="card-title">✈️ Create Flight</h5>
              <p className="card-text">Add new flights with route, timing, and seat details.</p>
            </div>
          </Link>

          <Link to="/manage-flights" className="text-decoration-none">
            <div style={cardStyle('/assets/manageflight.png')}>
              <h5 className="card-title">🛠 Manage Flights</h5>
              <p className="card-text">Update or remove existing flight schedules.</p>
            </div>
          </Link>

          <Link to="/admin/bookings" className="text-decoration-none">
            <div style={cardStyle('/assets/booking.png')}>
              <h5 className="card-title">📋 View All Bookings</h5>
              <p className="card-text">Track user bookings and manage cancellations.</p>
            </div>
          </Link>

          {/* Second Row */}
          <Link to="/admin/users" className="text-decoration-none">
            <div style={cardStyle('/assets/manageuser.png')}>
              <h5 className="card-title">👥 Manage Users</h5>
              <p className="card-text">View and update user roles and access.</p>
            </div>
          </Link>

          <Link to="/admin/routes" className="text-decoration-none">
            <div style={cardStyle('/assets/manageroutes.png')}>
              <h5 className="card-title">🛣 Manage Routes</h5>
              <p className="card-text">Create and edit flight paths between cities.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
