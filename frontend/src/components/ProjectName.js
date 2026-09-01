import React, { useState, useEffect } from 'react';
import { Plus, Edit3, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import api from '../Api';
import './UserManagement.css';

const ProjectName = () => {
  const [data, setData] = useState([
    { id: 1, masId: 1, projectName: "CMRL", status: "Active", date: "25/02/2020" },
    { id: 2, masId: 2, projectName: "MMRCL", status: "Active", date: "25/02/2020" },
    { id: 3, masId: 3, projectName: "BMRCL", status: "Active", date: "24/10/2020" },
    { id: 4, masId: 4, projectName: "CMRL PHASE 2", status: "Active", date: "06/10/2021" },
    { id: 5, masId: 5, projectName: "ANDRITZ TECHNOLOGIES", status: "Active", date: "14/12/2024" },
    { id: 6, masId: 6, projectName: "TATA PROJECTS LIMITED CPRR - P", status: "Active", date: "18/07/2025" },
    { id: 7, masId: 7, projectName: "VIDVEDAA PVT LTD", status: "Active", date: "06/06/2026" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({ projectName: '', status: 'Active', date: '01/09/2026' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/projects');
      if (response.data && response.data.length > 0) setData(response.data);
    } catch (err) {
      console.warn('API fallback:', err);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: data.length + 1,
      masId: Math.floor(Math.random() * 50) + 8,
      projectName: formData.projectName.toUpperCase(),
      status: formData.status,
      date: formData.date || '01/09/2026'
    };
    setData([newRecord, ...data]);
    setIsAddModalOpen(false);
    showToast('Project Name added!');
    setFormData({ projectName: '', status: 'Active', date: '01/09/2026' });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setData(data.map(item => item.id === editingRecord.id ? { ...editingRecord } : item));
    setEditingRecord(null);
    showToast('Project Name updated!');
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete project "${name}"?`)) {
      setData(data.filter(item => item.id !== id));
      showToast('Project deleted.');
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filtered = data.filter(item => 
    item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.masId).includes(searchTerm)
  );

  return (
    <div className="user-management-container">
      <div className="um-header-row">
        <h1 className="um-title">Project Name</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">Home / <span>Project Name</span></div>
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
                <th>PROJECT NAME</th>
                <th>PROJECT STATUS</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: '#374151' }}>{index + 1}</td>
                  <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.masId}</td>
                  <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.projectName}</td>
                  <td style={{ color: '#374151' }}>{item.status}</td>
                  <td style={{ color: '#4b5563' }}>{item.date}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-action edit" onClick={() => setEditingRecord(item)}><Edit3 size={15} /></button>
                      <button className="btn-action delete" onClick={() => handleDelete(item.id, item.projectName)}><X size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-pagination">
          <div className="rows-per-page"><span>Rows per page:</span><select className="rows-select" defaultValue="100"><option value="100">100</option></select></div>
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
              <h3 className="modal-title">Add Project Name</h3>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field"><label className="field-label">Project Name</label><input type="text" className="field-input" required value={formData.projectName} onChange={(e) => setFormData({...formData, projectName: e.target.value})} /></div>
                  <div className="form-field"><label className="field-label">Project Status</label><select className="field-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
                  <div className="form-field full-width"><label className="field-label">Date</label><input type="text" className="field-input" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} /></div>
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
              <h3 className="modal-title">Edit Project Name</h3>
              <button className="modal-close-btn" onClick={() => setEditingRecord(null)}><X size={20} /></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field"><label className="field-label">Project Name</label><input type="text" className="field-input" required value={editingRecord.projectName} onChange={(e) => setEditingRecord({...editingRecord, projectName: e.target.value})} /></div>
                  <div className="form-field"><label className="field-label">Project Status</label><select className="field-select" value={editingRecord.status} onChange={(e) => setEditingRecord({...editingRecord, status: e.target.value})}><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
                  <div className="form-field full-width"><label className="field-label">Date</label><input type="text" className="field-input" value={editingRecord.date} onChange={(e) => setEditingRecord({...editingRecord, date: e.target.value})} /></div>
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

export default ProjectName;
