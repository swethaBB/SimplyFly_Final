import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Spinner, Toast, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userManageBg from '../../assets/usermanage.png'; // ✅ Add your background image

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const roleOptions = ['USER', 'ADMIN', 'FLIGHT_OWNER'];

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/users/getall', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setToastMsg('User deleted successfully');
      setShowToast(true);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
      setToastMsg('Failed to delete user');
      setShowToast(true);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:8080/api/users/${id}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setUsers(prev =>
        prev.map(user =>
          user.id === id ? { ...user, role: newRole } : user
        )
      );

      setToastMsg('Role updated successfully');
      setShowToast(true);
    } catch (err) {
      console.error('Error updating role:', err);
      setToastMsg('Failed to update role');
      setShowToast(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-start vh-100"
      style={{
        backgroundImage: `url(${userManageBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        paddingTop: '40px'
      }}
    >
      <div className="container bg-light rounded p-4 position-relative" style={{ maxWidth: '1000px' }}>
        {/* Back Button */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10
          }}
        >
          <Button
            variant="outline-dark"
            style={{ backgroundColor: 'transparent', borderWidth: '2px' }}
            onClick={() => navigate('/admin/admindashboard')}
          >
            ← Back to Dashboard
          </Button>
        </div>

        <h2 className="mb-4 text-center">User Management</h2>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Table striped bordered hover responsive className="text-center">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="6" className="text-center">No users found</td></tr>
              ) : (
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Form.Select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        size="sm"
                      >
                        {roleOptions.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </Form.Select>
                    </td>
                    <td>{user.contactNo}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => deleteUser(user.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}

        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="info"
          className="position-fixed bottom-0 end-0 m-3"
        >
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default UserManagement;
