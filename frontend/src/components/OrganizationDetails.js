import React, { useState, useEffect } from 'react';
import { Plus, Edit3, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import api from '../Api';
import './UserManagement.css';

const OrganizationDetails = () => {
  const [data, setData] = useState([
    { id: 1, masId: 7, name: "CONSOLIDATED CONSTRUCTION CONSORTIUM LTD", code: "CCCL", status: "Inactive", date: "16/01/2017" },
    { id: 2, masId: 9, name: "HSSG INDIA PVT LTD", code: "HSSG", status: "Inactive", date: "16/01/2017" },
    { id: 3, masId: 10, name: "L & T SUCG JV", code: "L&T SUCG", status: "Active", date: "03/08/2013" },
    { id: 4, masId: 11, name: "L & T CONSTRUCTIONS - Trackwork", code: "L & T CONS", status: "Active", date: "11/01/2014" },
    { id: 5, masId: 12, name: "L & T CMRL Koyambedu Depot Project", code: "L & T CMRL", status: "Inactive", date: "16/01/2017" },
    { id: 6, masId: 13, name: "L & T GEO STRUCTURE", code: "", status: "Inactive", date: "16/01/2017" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({ name: '', code: '', status: 'Active', date: '01/09/2026' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/organization-details');
      if (response.data && response.data.length > 0) setData(response.data);
    } catch (err) {
      console.warn('API fallback:', err);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: data.length + 1,
      masId: Math.floor(Math.random() * 50) + 14,
      name: formData.name.toUpperCase(),
      code: formData.code.toUpperCase(),
      status: formData.status,
      date: formData.date || '01/09/2026'
    };
    setData([newRecord, ...data]);
    setIsAddModalOpen(false);
    showToast('Organization Details added!');
    setFormData({ name: '', code: '', status: 'Active', date: '01/09/2026' });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setData(data.map(item => item.id === editingRecord.id ? { ...editingRecord } : item));
    setEditingRecord(null);
    showToast('Organization Details updated!');
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      setData(data.filter(item => item.id !== id));
      showToast('Record deleted.');
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filtered = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-container">
      <div className="um-header-row">
        <h1 className="um-title">Organization Details</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">Home / <span>Organization Details</span></div>
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

        <div className="table-responsive">
          <table className="um-table">
            <thead>
              <tr>
                <th>NO</th>
                <th>MAS ID</th>
                <th>NAME</th>
                <th>CODE</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: '#374151' }}>{index + 1}</td>
                  <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.masId}</td>
                  <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.name}</td>
                  <td style={{ color: '#4b5563' }}>{item.code}</td>
                  <td style={{ color: '#374151' }}>{item.status}</td>
                  <td style={{ color: '#4b5563' }}>{item.date}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-action edit" onClick={() => setEditingRecord(item)}><Edit3 size={15} /></button>
                      <button className="btn-action delete" onClick={() => handleDelete(item.id, item.name)}><X size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-pagination">
          <div className="rows-per-page"><span>Rows per page:</span><select className="rows-select" defaultValue="10"><option value="10">10</option></select></div>
          <div>1-{filtered.length} of {filtered.length}</div>
          <div className="pagination-controls">
            <button className="page-btn" disabled><ChevronsLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronRight size={16} /></button>
            <button className="page-btn" disabled><ChevronsRight size={16} /></button>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header green">
              <h3 className="modal-title">Add Organization Details</h3>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field"><label className="field-label">Name</label><input type="text" className="field-input" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                  <div className="form-field"><label className="field-label">Code</label><input type="text" className="field-input" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} /></div>
                  <div className="form-field"><label className="field-label">Status</label><select className="field-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
                  <div className="form-field"><label className="field-label">Date</label><input type="text" className="field-input" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} /></div>
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

      {editingRecord && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header purple">
              <h3 className="modal-title">Edit Organization Details</h3>
              <button className="modal-close-btn" onClick={() => setEditingRecord(null)}><X size={20} /></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field"><label className="field-label">Name</label><input type="text" className="field-input" required value={editingRecord.name} onChange={(e) => setEditingRecord({...editingRecord, name: e.target.value})} /></div>
                  <div className="form-field"><label className="field-label">Code</label><input type="text" className="field-input" value={editingRecord.code} onChange={(e) => setEditingRecord({...editingRecord, code: e.target.value})} /></div>
                  <div className="form-field"><label className="field-label">Status</label><select className="field-select" value={editingRecord.status} onChange={(e) => setEditingRecord({...editingRecord, status: e.target.value})}><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
                  <div className="form-field"><label className="field-label">Date</label><input type="text" className="field-input" value={editingRecord.date} onChange={(e) => setEditingRecord({...editingRecord, date: e.target.value})} /></div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-modal-close" onClick={() => setEditingRecord(null)}>Close</button>
                <button type="submit" className="btn-modal-submit purple">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationDetails;
