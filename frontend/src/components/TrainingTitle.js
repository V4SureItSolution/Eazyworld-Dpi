import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';
import api from '../Api';
import './UserManagement.css'; // Reusing common table and modal styles

const TrainingTitle = () => {
  const [titles, setTitles] = useState([
    { id: 1, masId: 4, title: "SAFE OPERATION OF EOT & GANTRY CRANES", status: "Active", date: "21/11/2014" },
    { id: 2, masId: 5, title: "SAFE OPERATION OF PILING RIG", status: "Active", date: "21/11/2014" },
    { id: 3, masId: 7, title: "SAFE OPERATION OF EXCAVATORS", status: "Active", date: "01/04/2015" },
    { id: 4, masId: 10, title: "SAFE OPERATION OF BOOM PLACER", status: "Active", date: "21/11/2014" },
    { id: 5, masId: 11, title: "SAFE OPERATION OF JIG LIFTS", status: "Active", date: "01/02/2014" },
    { id: 6, masId: 12, title: "SAFE OPERATION OF PILING RIG", status: "Active", date: "05/02/2014" },
    { id: 7, masId: 13, title: "SAFE OPERATION OF AERIAL LIFTS", status: "Active", date: "03/04/2014" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [promptTarget, setPromptTarget] = useState(null); // Record selected for edit prompt
  const [editingRecord, setEditingRecord] = useState(null); // Record selected for edit modal
  const [notification, setNotification] = useState(null);

  // Form states
  const [addFormData, setAddFormData] = useState({
    title: '',
    status: 'Select',
    date: ''
  });

  const [editFormData, setEditFormData] = useState({
    id: null,
    title: '',
    status: 'Active',
    date: ''
  });

  useEffect(() => {
    fetchTrainingTitles();
  }, []);

  const fetchTrainingTitles = async () => {
    try {
      const response = await api.get('/training-titles');
      if (response.data && response.data.length > 0) {
        setTitles(response.data);
      }
    } catch (err) {
      console.warn('Backend API connection fallback:', err);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (addFormData.status === 'Select') {
      alert('Please select a valid Title Status');
      return;
    }

    const formatDate = (dateStr) => {
      if (!dateStr) return '01/09/2026';
      const parts = dateStr.split('-');
      if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
      return dateStr;
    };

    const newRecord = {
      id: titles.length + 1,
      masId: Math.floor(Math.random() * 90) + 14,
      title: addFormData.title.toUpperCase(),
      status: addFormData.status,
      date: formatDate(addFormData.date)
    };

    try {
      await api.post('/training-titles', addFormData);
    } catch (err) {
      console.warn('Backend API add fallback:', err);
    }

    setTitles([newRecord, ...titles]);
    setIsAddModalOpen(false);
    showToast('Training Title added successfully!');
    setAddFormData({ title: '', status: 'Select', date: '' });
  };

  // Triggered when user clicks "Yes, edit it!" in the warning modal
  const handleConfirmEditPrompt = () => {
    if (!promptTarget) return;
    setEditFormData({
      id: promptTarget.id,
      title: promptTarget.title,
      status: promptTarget.status,
      date: promptTarget.date
    });
    setEditingRecord(promptTarget);
    setPromptTarget(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/training-titles/${editFormData.id}`, editFormData);
    } catch (err) {
      console.warn('Backend API edit fallback:', err);
    }

    setTitles(titles.map(t => {
      if (t.id === editFormData.id) {
        return {
          ...t,
          title: editFormData.title.toUpperCase(),
          status: editFormData.status,
          date: editFormData.date
        };
      }
      return t;
    }));

    setEditingRecord(null);
    showToast('Training Title updated successfully!');
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await api.delete(`/training-titles/${id}`);
      } catch (err) {
        console.warn('Backend API delete fallback:', err);
      }
      setTitles(titles.filter(t => t.id !== id));
      showToast('Training Title deleted.');
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredTitles = titles.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      String(item.masId).includes(term) ||
      item.status.toLowerCase().includes(term)
    );
  });

  return (
    <div className="user-management-container">
      {/* Header Row */}
      <div className="um-header-row">
        <h1 className="um-title">Training Title</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / <span>Training Title</span>
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
                <th>NO</th>
                <th>MAS ID</th>
                <th>TRAINING TITLE</th>
                <th>TITLE STATUS</th>
                <th>TITLE DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredTitles.length > 0 ? (
                filteredTitles.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, color: '#374151' }}>{index + 1}</td>
                    <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.masId}</td>
                    <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.title}</td>
                    <td style={{ color: '#374151' }}>{item.status}</td>
                    <td style={{ color: '#4b5563' }}>{item.date}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-action edit"
                          onClick={() => setPromptTarget(item)}
                          title="Edit Training Title"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button 
                          className="btn-action delete"
                          onClick={() => handleDelete(item.id, item.title)}
                          title="Delete Record"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                    No records found matching "{searchTerm}"
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
            1-{filteredTitles.length} of {filteredTitles.length}
          </div>

          <div className="pagination-controls">
            <button className="page-btn" disabled><ChevronsLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronRight size={16} /></button>
            <button className="page-btn" disabled><ChevronsRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Add Training Title Modal (Green Header) */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header green">
              <h3 className="modal-title">Add Training Title</h3>
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
                    <label className="field-label">Training Title</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      required
                      value={addFormData.title}
                      onChange={(e) => setAddFormData({...addFormData, title: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Title Status</label>
                    <select 
                      className="field-select"
                      value={addFormData.status}
                      onChange={(e) => setAddFormData({...addFormData, status: e.target.value})}
                    >
                      <option value="Select">Select</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Post On Date</label>
                    <input 
                      type="date" 
                      className="field-input"
                      value={addFormData.date}
                      onChange={(e) => setAddFormData({...addFormData, date: e.target.value})}
                    />
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

      {/* Edit Confirmation Alert Modal ("Are you sure?") */}
      {promptTarget && (
        <div className="modal-overlay">
          <div className="reset-modal-container">
            <div className="reset-warning-icon">!</div>
            <h3 className="reset-title">Are you sure?</h3>
            <p className="reset-desc">
              Do you want to edit this record?
            </p>
            <div className="reset-actions">
              <button 
                type="button" 
                className="btn-reset-confirm"
                onClick={handleConfirmEditPrompt}
              >
                Yes, edit it!
              </button>
              <button 
                type="button" 
                className="btn-reset-cancel"
                style={{ backgroundColor: '#dc2626' }}
                onClick={() => setPromptTarget(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Training Title Modal (Violet Header) */}
      {editingRecord && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header purple">
              <h3 className="modal-title">Edit Training Title</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setEditingRecord(null)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field">
                    <label className="field-label">Training Title</label>
                    <input 
                      type="text" 
                      className="field-input"
                      required
                      value={editFormData.title}
                      onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Title Status</label>
                    <select 
                      className="field-select"
                      value={editFormData.status}
                      onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Post On Date</label>
                    <input 
                      type="text" 
                      className="field-input"
                      value={editFormData.date}
                      onChange={(e) => setEditFormData({...editFormData, date: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-modal-close"
                  onClick={() => setEditingRecord(null)}
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
    </div>
  );
};

export default TrainingTitle;
