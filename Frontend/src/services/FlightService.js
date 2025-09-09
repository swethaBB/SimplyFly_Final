import axios from './Axios';

export const addFlight = (flightData) =>
  axios.post('/api/flights/addflight', flightData);

export const getFlightById = (id) =>
  axios.get(`/api/flights/${id}`);

export const getAllFlights = () =>
  axios.get('/api/flights/all');

export const updateFlight = (id, updatedData) =>
  axios.put(`/api/flights/${id}`, updatedData);

export const searchFlights = (origin, destination) =>
  axios.get('/api/flights/search', {
    params: { origin, destination }
  });
export const updateFlightStatus = (id, status) =>
  axios.patch(`/api/flights/${id}/status`, { status });
