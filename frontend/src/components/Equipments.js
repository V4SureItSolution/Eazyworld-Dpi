import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from 'lucide-react';
import './UserManagement.css';

const Equipments = () => {
  const [equipments, setEquipments] = useState([
    { id: 1, masId: 1, name: "MOBILE CRANE (HYDRAULIC)", code: "EQ-CRN-01", category: "Lifting Equipment", checkpoints: 8, status: "Active", date: "21/11/2014" },
    { id: 2, masId: 2, name: "FORKLIFT (3.5T)", code: "EQ-FL-04", category: "Material Handling", checkpoints: 6, status: "Active", date: "21/11/2014" },
    { id: 3, masId: 3, name: "TOWER CRANE", code: "EQ-TCR-02", category: "Lifting Equipment", checkpoints: 10, status: "Active", date: "01/04/2015" },
    { id: 4, masId: 4, name: "OVERHEAD GANTRY CRANE", code: "EQ-OH-07", category: "Heavy Machinery", checkpoints: 7, status: "Active", date: "21/11/2014" },
    { id: 5, masId: 5, name: "HYDRAULIC EXCAVATOR", code: "EQ-EXC-03", category: "Heavy Machinery", checkpoints: 9, status: "Active", date: "01/02/2014" },
    { id: 6, masId: 6, name: "BOOM PLACER", code: "EQ-BP-05", category: "Lifting Equipment", checkpoints: 6, status: "Active", date: "05/02/2014" },
    { id: 7, masId: 7, name: "AERIAL WORK PLATFORM (SCISSOR LIFT)", code: "EQ-AWP-09", category: "Safety & Lifting", checkpoints: 8, status: "Active", date: "03/04/2014" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [promptTarget, setPromptTarget] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [notification, setNotification] = useState(null);

  const [addFormData, setAddFormData] = useState({
    name: '',
    code: '',
    category: 'Select',
    checkpoints: '',
    status: 'Select',
    date: ''
  });

  const [editFormData, setEditFormData] = useState({
    id: null,
    name: '',
    code: '',
    category: 'Lifting Equipment',
    checkpoints: '',
    status: 'Active',
    date: ''
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return '01/09/2026';
    const parts = dateStr.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return dateStr;
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (addFormData.status === 'Select') {
      alert('Please select a valid Status');
      return;
    }

    const newRecord = {
      id: equipments.length + 1,
      masId: Math.floor(Math.random() * 90) + 14,
      name: addFormData.name.toUpperCase(),
      code: addFormData.code.toUpperCase(),
      category: addFormData.category === 'Select' ? 'General Equipment' : addFormData.category,
      checkpoints: Number(addFormData.checkpoints) || 5,
      status: addFormData.status,
      date: formatDate(addFormData.date)
    };

    setEquipments([newRecord, ...equipments]);
    setIsAddModalOpen(false);
    showToast('Equipment added successfully!');
    setAddFormData({
      name: '',
      code: '',
      category: 'Select',
      checkpoints: '',
      status: 'Select',
      date: ''
    });
  };

  const handleConfirmEditPrompt = () => {
    if (!promptTarget) return;
    setEditFormData({
      id: promptTarget.id,
      name: promptTarget.name,
      code: promptTarget.code,
      category: promptTarget.category,
      checkpoints: promptTarget.checkpoints,
      status: promptTarget.status,
      date: promptTarget.date
    });
    setEditingRecord(promptTarget);
    setPromptTarget(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEquipments(equipments.map(item => {
      if (item.id === editFormData.id) {
        return {
          ...item,
          name: editFormData.name.toUpperCase(),
          code: editFormData.code.toUpperCase(),
          category: editFormData.category,
          checkpoints: Number(editFormData.checkpoints) || item.checkpoints,
          status: editFormData.status,
          date: editFormData.date
        };
      }
      return item;
    }));

    setEditingRecord(null);
    showToast('Equipment updated successfully!');
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setEquipments(equipments.filter(item => item.id !== id));
      showToast('Equipment deleted.');
    }
  };

  const filteredEquipments = equipments.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.code.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      String(item.masId).includes(term) ||
      item.status.toLowerCase().includes(term)
    );
  });

  return (
    <div className="user-management-container">
      {/* Header Row */}
      <div className="um-header-row">
        <h1 className="um-title">Equipments</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / Registration / <span>Equipments</span>
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
                <th>EQUIPMENT NAME</th>
                <th>EQUIPMENT CODE</th>
                <th>CATEGORY</th>
                <th>CHECKPOINTS</th>
                <th>STATUS</th>
                <th>POST ON DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipments.length > 0 ? (
                filteredEquipments.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, color: '#374151' }}>{index + 1}</td>
                    <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.masId}</td>
                    <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.name}</td>
                    <td>
                      <span className="badge-role" style={{ backgroundColor: '#4f46e5', fontSize: '0.75rem' }}>
                        {item.code}
                      </span>
                    </td>
                    <td style={{ color: '#374151' }}>{item.category}</td>
                    <td style={{ color: '#374151', fontWeight: 600 }}>{item.checkpoints} Points</td>
                    <td>
                      <span className={`badge-status ${item.status.toLowerCase() === 'active' ? 'active' : 'inactive'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ color: '#4b5563' }}>{item.date}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-action edit"
                          onClick={() => setPromptTarget(item)}
                          title="Edit Equipment"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button 
                          className="btn-action delete"
                          onClick={() => handleDelete(item.id, item.name)}
                          title="Delete Equipment"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
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
            1-{filteredEquipments.length} of {filteredEquipments.length}
          </div>

          <div className="pagination-controls">
            <button className="page-btn" disabled><ChevronsLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronRight size={16} /></button>
            <button className="page-btn" disabled><ChevronsRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Add Equipment Modal (Green Header) */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header green">
              <h3 className="modal-title">Add Equipment</h3>
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
                    <label className="field-label">Equipment Name</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      required
                      placeholder="e.g. SAFE OPERATION OF FORKLIFT"
                      value={addFormData.name}
                      onChange={(e) => setAddFormData({...addFormData, name: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Equipment Code / Tag</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      required
                      placeholder="e.g. EQ-FL-01"
                      value={addFormData.code}
                      onChange={(e) => setAddFormData({...addFormData, code: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Equipment Category</label>
                    <select 
                      className="field-select"
                      value={addFormData.category}
                      onChange={(e) => setAddFormData({...addFormData, category: e.target.value})}
                    >
                      <option value="Select">Select</option>
                      <option value="Lifting Equipment">Lifting Equipment</option>
                      <option value="Material Handling">Material Handling</option>
                      <option value="Heavy Machinery">Heavy Machinery</option>
                      <option value="Safety & Lifting">Safety &amp; Lifting</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Checklist Inspection Points</label>
                    <input 
                      type="number" 
                      className="field-input" 
                      min="1"
                      placeholder="e.g. 8"
                      value={addFormData.checkpoints}
                      onChange={(e) => setAddFormData({...addFormData, checkpoints: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Status</label>
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

                  <div className="form-field">
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
                onClick={() => setPromptTarget(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Equipment Modal (Violet Header) */}
      {editingRecord && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header purple">
              <h3 className="modal-title">Edit Equipment</h3>
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
                    <label className="field-label">Equipment Name</label>
                    <input 
                      type="text" 
                      className="field-input"
                      required
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Equipment Code / Tag</label>
                    <input 
                      type="text" 
                      className="field-input"
                      required
                      value={editFormData.code}
                      onChange={(e) => setEditFormData({...editFormData, code: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Equipment Category</label>
                    <select 
                      className="field-select"
                      value={editFormData.category}
                      onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                    >
                      <option value="Lifting Equipment">Lifting Equipment</option>
                      <option value="Material Handling">Material Handling</option>
                      <option value="Heavy Machinery">Heavy Machinery</option>
                      <option value="Safety & Lifting">Safety &amp; Lifting</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Checklist Inspection Points</label>
                    <input 
                      type="number" 
                      className="field-input"
                      min="1"
                      value={editFormData.checkpoints}
                      onChange={(e) => setEditFormData({...editFormData, checkpoints: e.target.value})}
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

                  <div className="form-field">
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

export default Equipments;
