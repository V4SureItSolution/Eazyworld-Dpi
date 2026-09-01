import React, { useState, useEffect } from 'react';
import { Plus, Edit3, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import api from '../Api';
import './UserManagement.css';

const TrainerName = () => {
  const [data, setData] = useState([
    { id: 1, masId: 10, name: "RAMAKRISHNAN E", status: "Active", date: "14/11/2017" },
    { id: 2, masId: 13, name: "SANTHOSH.K", status: "Active", date: "10/10/2021" },
    { id: 3, masId: 15, name: "T.CHANDRAMOHAN", status: "Active", date: "06/02/2022" },
    { id: 4, masId: 16, name: "S.SIVANANDHAM", status: "Active", date: "03/07/2021" },
    { id: 5, masId: 17, name: "CLIENT INCHARGE", status: "Active", date: "03/03/2021" },
    { id: 6, masId: 18, name: "G.P.VENKATACHALAPATHY", status: "Active", date: "15/06/2022" },
    { id: 7, masId: 19, name: "DEVENDRA RAMAKANT JADHAV", status: "Active", date: "18/06/2022" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({ name: '', status: 'Active', date: '01/09/2026' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/trainers');
      if (response.data && response.data.length > 0) setData(response.data);
    } catch (err) {
      console.warn('API fallback:', err);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: data.length + 1,
      masId: Math.floor(Math.random() * 50) + 20,
      name: formData.name.toUpperCase(),
      status: formData.status,
      date: formData.date || '01/09/2026'
    };
    setData([newRecord, ...data]);
    setIsAddModalOpen(false);
    showToast('Trainer added!');
    setFormData({ name: '', status: 'Active', date: '01/09/2026' });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setData(data.map(item => item.id === editingRecord.id ? { ...editingRecord } : item));
    setEditingRecord(null);
    showToast('Trainer updated!');
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete trainer "${name}"?`)) {
      setData(data.filter(item => item.id !== id));
      showToast('Trainer deleted.');
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filtered = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.masId).includes(searchTerm)
  );

  return (
    <div className="user-management-container">
      <div className="um-header-row">
        <h1 className="um-title">Trainer Name</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">Home / <span>Trainer Name</span></div>
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
                <th>TRAINER NAME</th>
                <th>TRAINER STATUS</th>
                <th>POST ON DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: '#374151' }}>{index + 1}</td>
                  <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.masId}</td>
                  <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.name}</td>
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
              <h3 className="modal-title">Add Trainer Name</h3>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field"><label className="field-label">Trainer Name</label><input type="text" className="field-input" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
                  <div className="form-field"><label className="field-label">Trainer Status</label><select className="field-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
                  <div className="form-field full-width"><label className="field-label">Post On Date</label><input type="text" className="field-input" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} /></div>
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
              <h3 className="modal-title">Edit Trainer Name</h3>
              <button className="modal-close-btn" onClick={() => setEditingRecord(null)}><X size={20} /></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field"><label className="field-label">Trainer Name</label><input type="text" className="field-input" required value={editingRecord.name} onChange={(e) => setEditingRecord({...editingRecord, name: e.target.value})} /></div>
                  <div className="form-field"><label className="field-label">Trainer Status</label><select className="field-select" value={editingRecord.status} onChange={(e) => setEditingRecord({...editingRecord, status: e.target.value})}><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
                  <div className="form-field full-width"><label className="field-label">Post On Date</label><input type="text" className="field-input" value={editingRecord.date} onChange={(e) => setEditingRecord({...editingRecord, date: e.target.value})} /></div>
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

export default TrainerName;
