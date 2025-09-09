import React, { useEffect, useState } from 'react';
import {
  getAllBookings,
  getBookingsByStatus,
  getBookingsByFlightAndStatus,
  getBookingsByDateRange
} from '../../services/BookingService';
import { getPaymentByBookingId } from '../../services/PaymentService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bookingBg from '../../assets/bookingbg.png';
import { useNavigate } from 'react-router-dom';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    flightId: '',
    startDate: '',
    endDate: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const enrichAndFilterBookings = async (rawBookings) => {
    const enriched = await Promise.all(
      rawBookings.map(async (booking) => {
        if (!booking.paymentId) {
          try {
            const paymentRes = await getPaymentByBookingId(booking.id);
            return { ...booking, paymentId: paymentRes.data.id };
          } catch {
            return { ...booking, paymentId: null };
          }
        }
        return booking;
      })
    );

    // ✅ Strict filter: only bookings with valid passengerName and email
    return enriched.filter(
      b => !!b.passengerName?.trim() && !!b.email?.trim()
    );
  };

  const fetchAllBookings = async () => {
    try {
      const res = await getAllBookings();
      const filtered = await enrichAndFilterBookings(res.data);
      setBookings(filtered);
    } catch (err) {
      toast.error('Failed to fetch bookings');
    }
  };

  const handleFilter = async () => {
    try {
      let res;
      if (filters.flightId && filters.status) {
        res = await getBookingsByFlightAndStatus(filters.flightId, filters.status);
      } else if (filters.status) {
        res = await getBookingsByStatus(filters.status);
      } else if (filters.startDate && filters.endDate) {
        res = await getBookingsByDateRange(filters.startDate, filters.endDate);
      } else {
        return fetchAllBookings();
      }

      const filtered = await enrichAndFilterBookings(res.data);
      setBookings(filtered);
    } catch (err) {
      toast.error('Filter failed');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start vh-100"
      style={{
        backgroundImage: `url(${bookingBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        paddingTop: '40px'
      }}
    >
      <div className="container bg-light rounded p-4" style={{ maxWidth: '1000px' }}>
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-outline-dark"
            onClick={() => navigate('/admin/admindashboard')}
          >
            ← Back to Dashboard
          </button>
        </div>

        <h2 className="mb-3 text-center">📋 Booking List</h2>

        <div className="card p-3 mb-4">
          <h5>🔍 Filter Bookings</h5>
          <div className="row g-2">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Status (e.g. PENDING)"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Flight ID"
                value={filters.flightId}
                onChange={(e) => setFilters({ ...filters, flightId: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="datetime-local"
                className="form-control"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <input
                type="datetime-local"
                className="form-control"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              />
            </div>
          </div>
          <button className="btn btn-primary mt-3" onClick={handleFilter}>Apply Filters</button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Passenger</th>
                <th>Email</th>
                <th>Flight ID</th>
                <th>Status</th>
                <th>Seats</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">No bookings found</td>
                </tr>
              ) : (
                bookings.map(b => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.passengerName}</td>
                    <td>{b.email}</td>
                    <td>{b.flightId}</td>
                    <td>{b.status}</td>
                    <td>{b.seatNumbers.join(', ')}</td>
                    <td>₹{b.totalPrice}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
