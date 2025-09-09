import axios from './Axios';

export const registerAdmin = (adminData) =>
  axios.post('/api/users/register', adminData);

export const loginUser = (credentials) =>
  axios.post('/api/v1/auth/login', credentials);
  console.log('Sending login payload:', credentials);

export const addUser = (userData) =>
  axios.post('/api/users/adduser', userData);

export const getUserById = (id) =>
  axios.get(`/api/users/${id}`);

export const getAllUsers = () =>
  axios.get('/api/users/getall');

export const updateUser = (id, updatedData) =>
  axios.put(`/api/users/${id}`, updatedData);

export const deleteUser = (id) =>
  axios.delete(`/api/users/${id}`);

export const updateUserRole = (id, roleData) =>
  axios.put(`/api/users/${id}/role`, roleData);
