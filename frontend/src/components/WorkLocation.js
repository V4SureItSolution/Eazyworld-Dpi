import React, { useState, useEffect } from 'react';
import { Plus, Edit3, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import api from '../Api';
import './UserManagement.css';

const WorkLocation = () => {
  const [data, setData] = useState([
    { id: 1, masId: 3, locationName: "THOUSAND LIGHTS", contractNo: "UAA 02", incharge: "MR.BALA MURUGAN" },
    { id: 2, masId: 6, locationName: "SHENOY NAGAR", contractNo: "UAA 05", incharge: "MR.KARTHIKEYAN" },
    { id: 3, masId: 8, locationName: "CASTING YARD-THIRUVERKADU", contractNo: "UAA 05", incharge: "MR.VENUGOPAL REDDY" },
    { id: 4, masId: 9, locationName: "PACHAYAPPA COLLEGE", contractNo: "UAA 04", incharge: "MR.MUNIYANDI" },
    { id: 5, masId: 12, locationName: "LIC", contractNo: "-", incharge: "MR.JAISHANKAR" },
    { id: 6, masId: 14, locationName: "CENTRAL", contractNo: "UAA 01", incharge: "MR.NAGA SESHU" },
    { id: 7, masId: 17, locationName: "THIRUVERKADU-REVAR YARD", contractNo: "UAA 05", incharge: "MR.VENUGOPAL REDDY" },
    { id: 8, masId: 18, locationName: "SAIDAPET", contractNo: "UAA 03", incharge: "MR.RAMESH" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({ locationName: '', contractNo: '', incharge: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/work-locations');
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
      locationName: formData.locationName.toUpperCase(),
      contractNo: formData.contractNo.toUpperCase() || '-',
      incharge: formData.incharge.toUpperCase()
    };
    setData([newRecord, ...data]);
    setIsAddModalOpen(false);
    showToast('Work Location Details added!');
    setFormData({ locationName: '', contractNo: '', incharge: '' });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setData(data.map(item => item.id === editingRecord.id ? { ...editingRecord } : item));
    setEditingRecord(null);
    showToast('Work Location Details updated!');
  };

  const handleDelete = (id, locationName) => {
    if (window.confirm(`Delete location "${locationName}"?`)) {
      setData(data.filter(item => item.id !== id));
      showToast('Location deleted.');
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filtered = data.filter(item => 
    item.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contractNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.incharge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-container">
      <div className="um-header-row">
        <h1 className="um-title">Work Location Details</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">Home / <span>Work Location Details</span></div>
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
                <th>LOCATION NAME</th>
                <th>CONTRACT NO</th>
                <th>INCHARGE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: '#374151' }}>{index + 1}</td>
                  <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.masId}</td>
                  <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.locationName}</td>
                  <td style={{ color: '#4b5563' }}>{item.contractNo}</td>
                  <td style={{ color: '#374151' }}>{item.incharge}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-action edit" onClick={() => setEditingRecord(item)}><Edit3 size={15} /></button>
                      <button className="btn-action delete" onClick={() => handleDelete(item.id, item.locationName)}><X size={16} /></button>
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
              <h3 className="modal-title">Add Work Location Details</h3>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field"><label className="field-label">Location Name</label><input type="text" className="field-input" required value={formData.locationName} onChange={(e) => setFormData({...formData, locationName: e.target.value})} /></div>
                  <div className="form-field"><label className="field-label">Contract No</label><input type="text" className="field-input" value={formData.contractNo} onChange={(e) => setFormData({...formData, contractNo: e.target.value})} /></div>
                  <div className="form-field full-width"><label className="field-label">Incharge</label><input type="text" className="field-input" value={formData.incharge} onChange={(e) => setFormData({...formData, incharge: e.target.value})} /></div>
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
              <h3 className="modal-title">Edit Work Location Details</h3>
              <button className="modal-close-btn" onClick={() => setEditingRecord(null)}><X size={20} /></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field"><label className="field-label">Location Name</label><input type="text" className="field-input" required value={editingRecord.locationName} onChange={(e) => setEditingRecord({...editingRecord, locationName: e.target.value})} /></div>
                  <div className="form-field"><label className="field-label">Contract No</label><input type="text" className="field-input" value={editingRecord.contractNo} onChange={(e) => setEditingRecord({...editingRecord, contractNo: e.target.value})} /></div>
                  <div className="form-field full-width"><label className="field-label">Incharge</label><input type="text" className="field-input" value={editingRecord.incharge} onChange={(e) => setEditingRecord({...editingRecord, incharge: e.target.value})} /></div>
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

export default WorkLocation;
