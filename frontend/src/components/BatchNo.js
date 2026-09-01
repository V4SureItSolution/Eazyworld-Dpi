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

const BatchNo = () => {
  const [batches, setBatches] = useState([
    { id: 1, masId: 9177, batchNo: "10845/745", city: "CMRL PHARES - 2", status: "Active", date: "01/09/2026" },
    { id: 2, masId: 9176, batchNo: "10844/745", city: "", status: "Active", date: "01/09/2026" },
    { id: 3, masId: 9175, batchNo: "10843/744", city: "CMRL PHARES - 2", status: "Active", date: "01/09/2026" },
    { id: 4, masId: 9174, batchNo: "10842/743", city: "CMRL PHARES - 2", status: "Active", date: "01/09/2026" },
    { id: 5, masId: 9173, batchNo: "10842/743", city: "CMRL PHARES - 2", status: "Active", date: "01/09/2026" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [notification, setNotification] = useState(null);

  // Form states
  const [addFormData, setAddFormData] = useState({
    batchNo: '',
    city: '',
    status: 'Active',
    date: '01/09/2026'
  });

  const [editFormData, setEditFormData] = useState({
    id: null,
    batchNo: '',
    city: '',
    status: 'Active',
    date: ''
  });

  useEffect(() => {
    fetchBatchNos();
  }, []);

  const fetchBatchNos = async () => {
    try {
      const response = await api.get('/batch-nos');
      if (response.data && response.data.length > 0) {
        setBatches(response.data);
      }
    } catch (err) {
      console.warn('Backend API connection fallback:', err);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newRecord = {
      id: batches.length + 1,
      masId: Math.floor(Math.random() * 900) + 9100,
      batchNo: addFormData.batchNo,
      city: addFormData.city,
      status: addFormData.status,
      date: addFormData.date || '01/09/2026'
    };

    try {
      await api.post('/batch-nos', addFormData);
    } catch (err) {
      console.warn('Backend API add fallback:', err);
    }

    setBatches([newRecord, ...batches]);
    setIsAddModalOpen(false);
    showToast('Batch No added successfully!');
    setAddFormData({ batchNo: '', city: '', status: 'Active', date: '01/09/2026' });
  };

  const handleOpenEdit = (record) => {
    setEditFormData({
      id: record.id,
      batchNo: record.batchNo,
      city: record.city,
      status: record.status,
      date: record.date
    });
    setEditingRecord(record);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/batch-nos/${editFormData.id}`, editFormData);
    } catch (err) {
      console.warn('Backend API edit fallback:', err);
    }

    setBatches(batches.map(b => {
      if (b.id === editFormData.id) {
        return {
          ...b,
          batchNo: editFormData.batchNo,
          city: editFormData.city,
          status: editFormData.status,
          date: editFormData.date
        };
      }
      return b;
    }));

    setEditingRecord(null);
    showToast('Batch No updated successfully!');
  };

  const handleDelete = async (id, batchNo) => {
    if (window.confirm(`Are you sure you want to delete batch "${batchNo}"?`)) {
      try {
        await api.delete(`/batch-nos/${id}`);
      } catch (err) {
        console.warn('Backend API delete fallback:', err);
      }
      setBatches(batches.filter(b => b.id !== id));
      showToast('Batch No deleted.');
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredBatches = batches.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      item.batchNo.toLowerCase().includes(term) ||
      item.city.toLowerCase().includes(term) ||
      String(item.masId).includes(term) ||
      item.status.toLowerCase().includes(term)
    );
  });

  return (
    <div className="user-management-container">
      {/* Header Row */}
      <div className="um-header-row">
        <h1 className="um-title">Batch No</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / <span>Batch No</span>
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
                <th>BATCH NO</th>
                <th>CITY</th>
                <th>BATCH STATUS</th>
                <th>BATCH ON DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.length > 0 ? (
                filteredBatches.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, color: '#374151' }}>{index + 1}</td>
                    <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.masId}</td>
                    <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.batchNo}</td>
                    <td style={{ color: '#4b5563' }}>{item.city}</td>
                    <td style={{ color: '#374151' }}>{item.status}</td>
                    <td style={{ color: '#4b5563' }}>{item.date}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-action edit"
                          onClick={() => handleOpenEdit(item)}
                          title="Edit Batch No"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button 
                          className="btn-action delete"
                          onClick={() => handleDelete(item.id, item.batchNo)}
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
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
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
            1-{filteredBatches.length} of {filteredBatches.length}
          </div>

          <div className="pagination-controls">
            <button className="page-btn" disabled><ChevronsLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronRight size={16} /></button>
            <button className="page-btn" disabled><ChevronsRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Add Batch No Modal (Green Header) */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header green">
              <h3 className="modal-title">Add Batch No</h3>
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
                    <label className="field-label">Batch No</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      required
                      value={addFormData.batchNo}
                      onChange={(e) => setAddFormData({...addFormData, batchNo: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">City</label>
                    <input 
                      type="text" 
                      className="field-input"
                      value={addFormData.city}
                      onChange={(e) => setAddFormData({...addFormData, city: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Batch Status</label>
                    <select 
                      className="field-select"
                      value={addFormData.status}
                      onChange={(e) => setAddFormData({...addFormData, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Batch On Date</label>
                    <input 
                      type="text" 
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

      {/* Edit Batch No Modal (Violet Header) */}
      {editingRecord && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header purple">
              <h3 className="modal-title">Edit Batch No</h3>
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
                    <label className="field-label">Batch No</label>
                    <input 
                      type="text" 
                      className="field-input"
                      required
                      value={editFormData.batchNo}
                      onChange={(e) => setEditFormData({...editFormData, batchNo: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">City</label>
                    <input 
                      type="text" 
                      className="field-input"
                      value={editFormData.city}
                      onChange={(e) => setEditFormData({...editFormData, city: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Batch Status</label>
                    <select 
                      className="field-select"
                      value={editFormData.status}
                      onChange={(e) => setEditFormData({...editFormData, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Batch On Date</label>
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

export default BatchNo;
