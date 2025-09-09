import { jwtDecode } from 'jwt-decode';

export const getRoleFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return 'USER'; 

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded"+JSON.stringify(decoded));
    return decoded.role || 'USER';
  } catch (err) {
    console.error('Invalid token:', err);
    return 'USER';
  }
};
