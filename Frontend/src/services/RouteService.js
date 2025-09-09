import axios from './Axios';

export const addRoute = (routeData) =>
  axios.post('/api/routes/add', routeData);

export const getAllRoutes = () =>
  axios.get('/api/routes/all');

export const getRouteById = (id) =>
  axios.get(`/api/routes/${id}`);

export const updateRoute = (id, updatedData) =>
  axios.put(`/api/routes/${id}`, updatedData);

export const deleteRoute = (id) =>
  axios.delete(`/api/routes/${id}`);

export const getActiveRoutes = () =>
  axios.get('/api/routes/active');
