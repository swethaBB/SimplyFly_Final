import axios from './Axios';

export const addSeat = (seatData) =>
  axios.post('/api/seats/add', seatData);

export const getSeatById = (id) =>
  axios.get(`/api/seats/${id}`);

export const getAllSeats = () =>
  axios.get('/api/seats/all');

export const getAvailableSeatsByFlight = (flightId) =>
  axios.get(`/api/seats/flight/${flightId}/available`);

export const updateSeat = (id, updatedData) =>
  axios.put(`/api/seats/${id}`, updatedData);

export const deleteSeat = (id) =>
  axios.delete(`/api/seats/${id}`);
