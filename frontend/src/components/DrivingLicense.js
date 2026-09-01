import React, { useState, useEffect } from 'react';
import { Plus, Edit3, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import api from '../Api';
import './UserManagement.css';

const DrivingLicense = () => {
  const [data, setData] = useState([
    { id: 1, masId: 1, type: "LMV", status: "Active", date: "04/04/2023" },
    { id: 2, masId: 2, type: "LMV TRANS", status: "Active", date: "04/04/2023" },
    { id: 3, masId: 3, type: "TRANS", status: "Active", date: "04/04/2023" },
    { id: 4, masId: 4, type: "HMV", status: "Active", date: "04/04/2023" },
    { id: 5, masId: 5, type: "HTV", status: "Active", date: "04/04/2023" },
    { id: 6, masId: 6, type: "NIL", status: "Active", date: "04/04/2023" },
    { id: 7, masId: 7, type: "CRANE", status: "Active", date: "04/08/2023" },
    { id: 8, masId: 8, type: "LDRXCV", status: "Active", date: "25/08/2023" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({ type: '', status: 'Active', date: '01/09/2026' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/driving-licenses');
      if (response.data && response.data.length > 0) setData(response.data);
    } catch (err) {
      console.warn('API fallback:', err);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: data.length + 1,
      masId: data.length + 1,
      type: formData.type.toUpperCase(),
      status: formData.status,
      date: formData.date || '01/09/2026'
    };
    setData([newRecord, ...data]);
    setIsAddModalOpen(false);
    showToast('Driving License Type added!');
    setFormData({ type: '', status: 'Active', date: '01/09/2026' });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setData(data.map(item => item.id === editingRecord.id ? { ...editingRecord } : item));
    setEditingRecord(null);
    showToast('Driving License Type updated!');
  };

  const handleDelete = (id, type) => {
    if (window.confirm(`Delete license type "${type}"?`)) {
      setData(data.filter(item => item.id !== id));
      showToast('License type deleted.');
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filtered = data.filter(item => 
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.masId).includes(searchTerm)
  );

  return (
    <div className="user-management-container">
      <div className="um-header-row">
        <h1 className="um-title">Driving License Type</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">Home / <span>Driving License Type</span></div>
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
                <th>DRIVING LICENSE TYPE</th>
                <th>DRIVING LICENSE STATUS</th>
                <th>DRIVING LICENSE DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: '#374151' }}>{index + 1}</td>
                  <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.masId}</td>
                  <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.type}</td>
                  <td style={{ color: '#374151' }}>{item.status}</td>
                  <td style={{ color: '#4b5563' }}>{item.date}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-action edit" onClick={() => setEditingRecord(item)}><Edit3 size={15} /></button>
                      <button className="btn-action delete" onClick={() => handleDelete(item.id, item.type)}><X size={16} /></button>
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
              <h3 className="modal-title">Add Driving License Type</h3>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field"><label className="field-label">Driving License Type</label><input type="text" className="field-input" required value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} /></div>
                  <div className="form-field"><label className="field-label">Driving License Status</label><select className="field-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
                  <div className="form-field full-width"><label className="field-label">Driving License Date</label><input type="text" className="field-input" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} /></div>
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
              <h3 className="modal-title">Edit Driving License Type</h3>
              <button className="modal-close-btn" onClick={() => setEditingRecord(null)}><X size={20} /></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field"><label className="field-label">Driving License Type</label><input type="text" className="field-input" required value={editingRecord.type} onChange={(e) => setEditingRecord({...editingRecord, type: e.target.value})} /></div>
                  <div className="form-field"><label className="field-label">Driving License Status</label><select className="field-select" value={editingRecord.status} onChange={(e) => setEditingRecord({...editingRecord, status: e.target.value})}><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
                  <div className="form-field full-width"><label className="field-label">Driving License Date</label><input type="text" className="field-input" value={editingRecord.date} onChange={(e) => setEditingRecord({...editingRecord, date: e.target.value})} /></div>
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

export default DrivingLicense;
