import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.png';
import axios from '../services/Axios';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    contactNo: '',
    address: '',
    role: 'USER',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError('');
    setSuccess('');

    // Basic validation
    const { name, email, password, gender, contactNo, address, role } = form;
    if (!name || !email || !password || !gender || !contactNo || !address || !role) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/users/register', form);
      setSuccess('Registration successful!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.error || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '60px',
      }}
    >
      <div className="text-center p-4 rounded" style={{ minWidth: '320px', color: 'white' }}>
        <h2 className="mb-4" style={{ color: 'black' }}>Register on SimplyFly</h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          className="form-control mb-3"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        {/* Email with icon */}
        <div className="mb-3 position-relative">
          <input
            type="email"
            name="email"
            className="form-control ps-5"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <i
            className="bi bi-envelope position-absolute"
            style={{
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.2rem',
              color: '#888',
            }}
          ></i>
        </div>

        {/* Password with toggle */}
        <div className="mb-3 position-relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            className="form-control ps-5 pe-5"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <i
            className="bi bi-lock position-absolute"
            style={{
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.2rem',
              color: '#888',
            }}
          ></i>
          <i
            className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute`}
            onClick={() => setShowPassword(!showPassword)}
            style={{
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.2rem',
              color: '#888',
              cursor: 'pointer',
            }}
          ></i>
        </div>

        {/* Gender */}
        <select
          name="gender"
          className="form-control mb-3"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>

        {/* Contact No */}
        <input
          type="text"
          name="contactNo"
          className="form-control mb-3"
          placeholder="Contact Number"
          value={form.contactNo}
          onChange={handleChange}
        />

        {/* Address */}
        <input
          type="text"
          name="address"
          className="form-control mb-3"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />

        {/* Role */}
        <select
          name="role"
          className="form-control mb-3"
          value={form.role}
          onChange={handleChange}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FLIGHT_OWNER">Flight Owner</option>
        </select>

        {/* Register Button */}
        <button
          className="btn btn-outline-light w-100"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {/* Feedback */}
        {error && <div className="text-danger mt-2">{error}</div>}
        {success && <div className="text-success mt-2">{success}</div>}

        {/* Back to Login */}
        <div className="mt-3">
          <small style={{ color: 'black' }}>
            Already registered?{' '}
            <span
              style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}
