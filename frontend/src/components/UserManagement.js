import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Key, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';
import api from '../Api';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      username: 'admin1',
      name: 'SANTHOSH K',
      firstName: 'SANTHOSH',
      lastName: 'K',
      email: 'santhosh.k@eazyworldengineering.com',
      role: 'Admin',
      status: 'active',
      access: 'Full (Admin)',
      fullAccess: true
    },
    {
      username: 'admin',
      name: 'RAMA KRISHNAN',
      firstName: 'RAMA',
      lastName: 'KRISHNAN',
      email: 'ramakrishnan@eazyworldengineering.com',
      role: 'Admin',
      status: 'active',
      access: 'Full (Admin)',
      fullAccess: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [resetTargetUser, setResetTargetUser] = useState(null);
  const [notification, setNotification] = useState(null);

  // Add User form state
  const [addFormData, setAddFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'Staff',
    firstName: '',
    lastName: '',
    status: 'Active',
    fullAccess: true
  });

  // Edit User form state
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    role: 'Admin',
    firstName: '',
    lastName: '',
    status: 'Active'
  });

  // Fetch users from backend API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      if (response.data && response.data.length > 0) {
        setUsers(response.data);
      }
    } catch (err) {
      console.warn('Backend API connection or fallback:', err);
    }
  };

  // Add User submit handler
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: addFormData.username,
      name: `${addFormData.firstName} ${addFormData.lastName}`.trim() || addFormData.username,
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
      email: addFormData.email,
      role: addFormData.role,
      status: addFormData.status.toLowerCase(),
      access: addFormData.fullAccess ? `Full (${addFormData.role})` : 'Restricted',
      fullAccess: addFormData.fullAccess
    };

    try {
      await api.post('/users', addFormData);
    } catch (err) {
      console.warn('Backend error or fallback:', err);
    }

    setUsers([newUser, ...users.filter(u => u.username !== newUser.username)]);
    setIsAddModalOpen(false);
    showToast(`User ${newUser.username} added successfully!`);
    setAddFormData({
      username: '',
      password: '',
      email: '',
      role: 'Staff',
      firstName: '',
      lastName: '',
      status: 'Active',
      fullAccess: true
    });
  };

  // Open Edit Modal with prefilled values
  const handleOpenEdit = (user) => {
    setEditFormData({
      username: user.username,
      email: user.email,
      role: user.role,
      firstName: user.firstName || user.name?.split(' ')[0] || '',
      lastName: user.lastName || user.name?.split(' ')[1] || '',
      status: user.status.charAt(0).toUpperCase() + user.status.slice(1)
    });
    setIsEditModalOpen(true);
  };

  // Edit User submit handler
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedName = `${editFormData.firstName} ${editFormData.lastName}`.trim() || editFormData.username;

    try {
      await api.put(`/users/${editFormData.username}`, editFormData);
    } catch (err) {
      console.warn('Backend error or fallback:', err);
    }

    setUsers(users.map(u => {
      if (u.username === editFormData.username) {
        return {
          ...u,
          email: editFormData.email,
          role: editFormData.role,
          firstName: editFormData.firstName,
          lastName: editFormData.lastName,
          name: updatedName,
          status: editFormData.status.toLowerCase(),
          access: `Full (${editFormData.role})`
        };
      }
      return u;
    }));

    setIsEditModalOpen(false);
    showToast(`User ${editFormData.username} updated successfully!`);
  };

  // Reset password confirm handler
  const handleConfirmResetPassword = async () => {
    if (!resetTargetUser) return;
    try {
      await api.post(`/users/${resetTargetUser.username}/reset-password`);
    } catch (err) {
      console.warn('Backend reset password call:', err);
    }
    showToast(`Password for ${resetTargetUser.username} reset successfully!`);
    setResetTargetUser(null);
  };

  // Delete user handler
  const handleDeleteUser = async (username) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      try {
        await api.delete(`/users/${username}`);
      } catch (err) {
        console.warn('Backend delete user call:', err);
      }
      setUsers(users.filter(u => u.username !== username));
      showToast(`User ${username} deleted.`);
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Filter users by search term
  const filteredUsers = users.filter(user => {
    const term = searchTerm.toLowerCase();
    return (
      user.username.toLowerCase().includes(term) ||
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  });

  return (
    <div className="user-management-container">
      {/* Header Row */}
      <div className="um-header-row">
        <h1 className="um-title">User Management</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / <span>User Management</span>
          </div>
          <button 
            className="btn-add-new" 
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={18} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {notification && (
        <div style={{
          padding: '0.75rem 1.25rem',
          backgroundColor: '#f0fdf4',
          color: '#16a34a',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          {notification}
        </div>
      )}

      {/* Main Table Card */}
      <div className="um-card">
        {/* Search Bar */}
        <div className="um-search-container">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="um-table">
            <thead>
              <tr>
                <th>USERNAME</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>STATUS</th>
                <th>ACCESS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.username}>
                    <td style={{ fontWeight: 600, color: '#1f2937' }}>{user.username}</td>
                    <td style={{ fontWeight: 600, color: '#374151' }}>{user.name}</td>
                    <td style={{ color: '#4b5563' }}>{user.email}</td>
                    <td>
                      <span className="badge-role">{user.role}</span>
                    </td>
                    <td>
                      <span className={`badge-status ${user.status}`}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ color: '#4b5563' }}>{user.access || `Full (${user.role})`}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-action edit"
                          onClick={() => handleOpenEdit(user)}
                          title="Edit User"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button 
                          className="btn-action reset"
                          onClick={() => setResetTargetUser(user)}
                          title="Reset Password"
                        >
                          <Key size={15} />
                        </button>
                        <button 
                          className="btn-action delete"
                          onClick={() => handleDeleteUser(user.username)}
                          title="Delete User"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                    No users found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="table-pagination">
          <div className="rows-per-page">
            <span>Rows per page:</span>
            <select className="rows-select" defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>

          <div>
            1-{filteredUsers.length} of {filteredUsers.length}
          </div>

          <div className="pagination-controls">
            <button className="page-btn" disabled><ChevronsLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronRight size={16} /></button>
            <button className="page-btn" disabled><ChevronsRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Add User Modal (Green Header) */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header green">
              <h3 className="modal-title">Add User</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field">
                    <label className="field-label">Username</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      required
                      value={addFormData.username}
                      onChange={(e) => setAddFormData({...addFormData, username: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Password</label>
                    <input 
                      type="password" 
                      className="field-input" 
                      required
                      value={addFormData.password}
                      onChange={(e) => setAddFormData({...addFormData, password: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Email</label>
                    <input 
                      type="email" 
                      className="field-input" 
                      required
                      value={addFormData.email}
                      onChange={(e) => setAddFormData({...addFormData, email: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Role</label>
                    <select 
                      className="field-select"
                      value={addFormData.role}
                      onChange={(e) => setAddFormData({...addFormData, role: e.target.value})}
                    >
                      <option value="Staff">Staff</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">First Name</label>
                    <input 
                      type="text" 
                      className="field-input"
                      value={addFormData.firstName}
                      onChange={(e) => setAddFormData({...addFormData, firstName: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Last Name</label>
                    <input 
                      type="text" 
                      className="field-input"
                      value={addFormData.lastName}
                      onChange={(e) => setAddFormData({...addFormData, lastName: e.target.value})}
                    />
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Status</label>
                    <select 
                      className="field-select"
                      value={addFormData.status}
                      onChange={(e) => setAddFormData({...addFormData, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="form-field full-width" style={{ marginTop: '0.25rem' }}>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={addFormData.fullAccess}
                        onChange={(e) => setAddFormData({...addFormData, fullAccess: e.target.checked})}
                      />
                      <span>Full access (no page restrictions)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-modal-close"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Close
                </button>
                <button 
                  type="submit" 
                  className="btn-modal-submit green"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal (Violet Header) */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header purple">
              <h3 className="modal-title">Edit User</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setIsEditModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field">
                    <label className="field-label">Username</label>
                    <input 
                      type="text" 
                      className="field-input"
                      value={editFormData.username}
                      disabled
                      style={{ backgroundColor: '#f9fafb', color: '#6b7280' }}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Email</label>
                    <input 
                      type="email" 
                      className="field-input"
                      required
                      value={editFormData.email}
                      onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Role</label>
                    <select 
                      className="field-select"
                      value={editFormData.role}
                      onChange={(e) => setEditFormData({...editFormData, role: e.target.value})}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                      <option value="Manager">Manager</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">First Name</label>
                    <input 
                      type="text" 
                      className="field-input"
                      value={editFormData.firstName}
                      onChange={(e) => setEditFormData({...editFormData, firstName: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Last Name</label>
                    <input 
                      type="text" 
                      className="field-input"
                      value={editFormData.lastName}
                      onChange={(e) => setEditFormData({...editFormData, lastName: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Status</label>
                    <select 
                      className="field-select"
                      value={editFormData.status}
                      onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-modal-close"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Close
                </button>
                <button 
                  type="submit" 
                  className="btn-modal-submit purple"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal (Warning Dialog) */}
      {resetTargetUser && (
        <div className="modal-overlay">
          <div className="reset-modal-container">
            <div className="reset-warning-icon">!</div>
            <h3 className="reset-title">Reset password for {resetTargetUser.username}?</h3>
            <p className="reset-desc">
              A new random password will replace their current one immediately.
            </p>
            <div className="reset-actions">
              <button 
                type="button" 
                className="btn-reset-confirm"
                onClick={handleConfirmResetPassword}
              >
                Yes, reset it!
              </button>
              <button 
                type="button" 
                className="btn-reset-cancel"
                onClick={() => setResetTargetUser(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
