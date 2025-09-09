import { Link } from 'react-router-dom';
import bguser from '../../assets/userbg.png';

export default function UserDashboard() {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${bguser})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
       <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <Link to="/login" className="btn btn-outline-light">← Back to Login</Link>
      </div>
      
      <div className="text-center p-5 rounded shadow text-white">
        <h2 className="mb-4">Welcome to User Dashboard</h2>
        <Link to="/user/search-flight" className="btn btn-outline-light">Search Flights</Link>
        

      </div>
      
    </div>
  );
}
