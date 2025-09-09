import axios from './Axios';

// ✅ Create a new booking
export const bookSeat = (bookingData) =>
  axios.post('/api/bookings/bookingseat', bookingData);

// ✅ Get booking by ID
export const getBookingById = (id) =>
  axios.get(`/api/bookings/${id}`);

// ✅ Get bookings for logged-in user
export const getMyBookings = () =>
  axios.get('/api/bookings/me');

// ✅ Get bookings for a specific flight
export const getBookingsForFlight = (flightId) =>
  axios.get(`/api/bookings/flight/${flightId}`);

// ✅ Cancel a booking
export const cancelBooking = (id) =>
  axios.delete(`/api/bookings/${id}`);

// ✅ Admin: Get all bookings
export const getAllBookings = () =>
  axios.get('/api/bookings/all');

// ✅ Admin: Filter bookings by status
export const getBookingsByStatus = (status) =>
  axios.get(`/api/bookings/status/${status}`);

// ✅ Admin: Filter bookings by flight and status
export const getBookingsByFlightAndStatus = (flightId, status) =>
  axios.get(`/api/bookings/flight/${flightId}/status/${status}`);

// ✅ Admin: Filter bookings by date range (ISO format: yyyy-MM-ddTHH:mm:ss)
export const getBookingsByDateRange = (start, end) =>
  axios.get('/api/bookings/daterange', {
    params: { start, end }
  });

// ✅ Owner: Get bookings for flights owned by logged-in owner
export const getOwnerBookings = () =>
  axios.get('/api/owner/bookings');

// export const updateBookingStatus = async (bookingId, status) => {
//   console.log(`PATCH /api/bookings/${bookingId}/status with status=${status}`);
//   return axios.patch(`/api/bookings/${bookingId}/status`, { status });
// };

export const updateBookingStatus = async (bookingId, status) => {
  return axios.patch(`/api/bookings/${bookingId}/status`, null, {
    params: { status }
  });
};
