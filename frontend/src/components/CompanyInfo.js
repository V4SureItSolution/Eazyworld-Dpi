import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import api from '../Api';
import './UserManagement.css';

const CompanyInfo = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({ name: '', code: '', status: 'Active' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/company-info');
      if (response.data) setData(response.data);
    } catch (err) {
      console.warn('API fallback:', err);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: data.length + 1,
      name: formData.name,
      code: formData.code,
      status: formData.status
    };
    setData([newRecord, ...data]);
    setIsAddModalOpen(false);
    showToast('Company Info added!');
    setFormData({ name: '', code: '', status: 'Active' });
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="user-management-container">
      <div className="um-header-row">
        <h1 className="um-title">Company Info</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">Home / <span>Company Info</span></div>
          <button className="btn-add-new" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={18} /><span>Add New</span>
          </button>
        </div>
      </div>

      {notification && (
        <div style={{ padding: '0.75rem 1.25rem', backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
          {notification}
        </div>
      )}

      <div className="um-card">
        <div className="um-search-container">
          <input type="text" className="search-input" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {data.length === 0 ? (
          <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: '#4b5563', fontWeight: 500, fontSize: '0.95rem' }}>
            There are no records to display
          </div>
        ) : (
          <div className="table-responsive">
            <table className="um-table">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>COMPANY NAME</th>
                  <th>CODE</th>
                  <th>STATUS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td>{item.code}</td>
                    <td>{item.status}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action delete" onClick={() => setData(data.filter(d => d.id !== item.id))}><X size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header green">
              <h3 className="modal-title">Add Company Info</h3>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field"><label className="field-label">Company Name</label><input type="text" className="field-input" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                  <div className="form-field"><label className="field-label">Company Code</label><input type="text" className="field-input" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} /></div>
                  <div className="form-field full-width"><label className="field-label">Status</label><select className="field-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-modal-close" onClick={() => setIsAddModalOpen(false)}>Close</button>
                <button type="submit" className="btn-modal-submit green">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyInfo;
