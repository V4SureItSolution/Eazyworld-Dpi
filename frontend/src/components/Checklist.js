import React, { useState } from 'react';
import { 
  Plus, 
  Edit3, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  CheckSquare,
  Filter
} from 'lucide-react';
import './UserManagement.css';

const Checklist = () => {
  const [equipmentList] = useState([
    { code: "EQ-CRN-01", name: "MOBILE CRANE (HYDRAULIC)" },
    { code: "EQ-FL-04", name: "FORKLIFT (3.5T)" },
    { code: "EQ-TCR-02", name: "TOWER CRANE" },
    { code: "EQ-OH-07", name: "OVERHEAD GANTRY CRANE" },
    { code: "EQ-EXC-03", name: "HYDRAULIC EXCAVATOR" },
    { code: "EQ-BP-05", name: "BOOM PLACER" },
    { code: "EQ-AWP-09", name: "AERIAL WORK PLATFORM (SCISSOR LIFT)" }
  ]);

  const [selectedEquipmentFilter, setSelectedEquipmentFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [promptTarget, setPromptTarget] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [notification, setNotification] = useState(null);

  const [checklists, setChecklists] = useState([
    { id: 1, masId: 101, equipmentCode: 'EQ-CRN-01', equipmentName: 'MOBILE CRANE (HYDRAULIC)', checkpointTitle: 'Wire Rope & Hoist Drum Condition', checkType: 'Visual & Functional', inspectionCriteria: 'Inspect for kinks, bird-caging, broken wires, and drum spooling.', severity: 'Critical', status: 'Active', date: '21/11/2014' },
    { id: 2, masId: 102, equipmentCode: 'EQ-CRN-01', equipmentName: 'MOBILE CRANE (HYDRAULIC)', checkpointTitle: 'Anti-Two-Block (A2B) Limit Switch', checkType: 'Safety Device', inspectionCriteria: 'Test switch cut-off action to prevent hook block collision with boom tip.', severity: 'Critical', status: 'Active', date: '21/11/2014' },
    { id: 3, masId: 103, equipmentCode: 'EQ-CRN-01', equipmentName: 'MOBILE CRANE (HYDRAULIC)', checkpointTitle: 'Outrigger Extension & Hydraulic Locks', checkType: 'Mechanical & Hydraulic', inspectionCriteria: 'Ensure full outrigger beam extension and zero cylinder creep or hydraulic leaks.', severity: 'Major', status: 'Active', date: '21/11/2014' },
    { id: 4, masId: 104, equipmentCode: 'EQ-FL-04', equipmentName: 'FORKLIFT (3.5T)', checkpointTitle: 'Forks & Mast Assembly Inspection', checkType: 'Visual', inspectionCriteria: 'Check forks for heel cracks, deflection, and excessive wear at blade heel.', severity: 'Critical', status: 'Active', date: '01/04/2015' },
    { id: 5, masId: 105, equipmentCode: 'EQ-FL-04', equipmentName: 'FORKLIFT (3.5T)', checkpointTitle: 'Service & Parking Brake Operation', checkType: 'Functional', inspectionCriteria: 'Test full holding power on slope and positive braking pedal response.', severity: 'Critical', status: 'Active', date: '01/04/2015' },
    { id: 6, masId: 106, equipmentCode: 'EQ-FL-04', equipmentName: 'FORKLIFT (3.5T)', checkpointTitle: 'Audible Reverse Alarm & Flashing Beacon', checkType: 'Electrical & Safety', inspectionCriteria: 'Verify audible alarm sound level and strobe beacon illumination.', severity: 'Minor', status: 'Active', date: '01/04/2015' },
    { id: 7, masId: 107, equipmentCode: 'EQ-TCR-02', equipmentName: 'TOWER CRANE', checkpointTitle: 'Anemometer (Wind Speed Sensor)', checkType: 'Instrumentation', inspectionCriteria: 'Confirm real-time wind speed telemetry in operator cab and alarm cutoff.', severity: 'Critical', status: 'Active', date: '01/02/2014' },
    { id: 8, masId: 108, equipmentCode: 'EQ-OH-07', equipmentName: 'OVERHEAD GANTRY CRANE', checkpointTitle: 'Emergency Stop & Pendant Control Buttons', checkType: 'Control & Safety', inspectionCriteria: 'Verify pendant pushbuttons respond smoothly with immediate E-Stop power disconnection.', severity: 'Critical', status: 'Active', date: '05/02/2014' }
  ]);

  const [addFormData, setAddFormData] = useState({
    equipmentCode: 'EQ-CRN-01',
    checkpointTitle: '',
    checkType: 'Select',
    inspectionCriteria: '',
    severity: 'Select',
    status: 'Select',
    date: ''
  });

  const [editFormData, setEditFormData] = useState({
    id: null,
    equipmentCode: '',
    checkpointTitle: '',
    checkType: 'Visual & Functional',
    inspectionCriteria: '',
    severity: 'Critical',
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
    if (addFormData.checkType === 'Select') {
      alert('Please select a valid Inspection Type');
      return;
    }
    if (addFormData.severity === 'Select') {
      alert('Please select Severity');
      return;
    }
    if (addFormData.status === 'Select') {
      alert('Please select Status');
      return;
    }

    const matchedEq = equipmentList.find(eq => eq.code === addFormData.equipmentCode);
    const newRecord = {
      id: Date.now(),
      masId: Math.floor(Math.random() * 90) + 110,
      equipmentCode: addFormData.equipmentCode,
      equipmentName: matchedEq ? matchedEq.name : 'EQUIPMENT',
      checkpointTitle: addFormData.checkpointTitle.toUpperCase(),
      checkType: addFormData.checkType,
      inspectionCriteria: addFormData.inspectionCriteria,
      severity: addFormData.severity,
      status: addFormData.status,
      date: formatDate(addFormData.date)
    };

    setChecklists([newRecord, ...checklists]);
    setIsAddModalOpen(false);
    showToast('Checklist checkpoint added successfully!');
    setAddFormData({
      equipmentCode: equipmentList[0]?.code || 'EQ-CRN-01',
      checkpointTitle: '',
      checkType: 'Select',
      inspectionCriteria: '',
      severity: 'Select',
      status: 'Select',
      date: ''
    });
  };

  const handleConfirmEditPrompt = () => {
    if (!promptTarget) return;
    setEditFormData({
      id: promptTarget.id,
      equipmentCode: promptTarget.equipmentCode,
      checkpointTitle: promptTarget.checkpointTitle,
      checkType: promptTarget.checkType,
      inspectionCriteria: promptTarget.inspectionCriteria,
      severity: promptTarget.severity,
      status: promptTarget.status,
      date: promptTarget.date
    });
    setEditingRecord(promptTarget);
    setPromptTarget(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const matchedEq = equipmentList.find(eq => eq.code === editFormData.equipmentCode);
    setChecklists(checklists.map(item => {
      if (item.id === editFormData.id) {
        return {
          ...item,
          equipmentCode: editFormData.equipmentCode,
          equipmentName: matchedEq ? matchedEq.name : item.equipmentName,
          checkpointTitle: editFormData.checkpointTitle.toUpperCase(),
          checkType: editFormData.checkType,
          inspectionCriteria: editFormData.inspectionCriteria,
          severity: editFormData.severity,
          status: editFormData.status,
          date: editFormData.date
        };
      }
      return item;
    }));

    setEditingRecord(null);
    showToast('Checklist checkpoint updated successfully!');
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setChecklists(checklists.filter(item => item.id !== id));
      showToast('Checklist checkpoint deleted.');
    }
  };

  const filteredChecklists = checklists.filter(item => {
    const term = searchTerm.toLowerCase();
    const matchesEquipment = selectedEquipmentFilter === 'ALL' || item.equipmentCode === selectedEquipmentFilter;
    const matchesSearch = 
      item.checkpointTitle.toLowerCase().includes(term) ||
      item.equipmentCode.toLowerCase().includes(term) ||
      item.equipmentName.toLowerCase().includes(term) ||
      item.checkType.toLowerCase().includes(term) ||
      item.severity.toLowerCase().includes(term) ||
      String(item.masId).includes(term) ||
      item.status.toLowerCase().includes(term);
    return matchesEquipment && matchesSearch;
  });

  return (
    <div className="user-management-container">
      {/* Header Row */}
      <div className="um-header-row">
        <h1 className="um-title">Checklist</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / Registration / <span>Checklist</span>
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
        {/* Filter and Search Bar */}
        <div style={{
          padding: '1rem 1.75rem',
          borderBottom: '1px solid #f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>Filter by Equipment:</span>
            <select
              className="field-select"
              style={{ padding: '0.45rem 0.85rem', minWidth: '220px', fontSize: '0.85rem' }}
              value={selectedEquipmentFilter}
              onChange={(e) => setSelectedEquipmentFilter(e.target.value)}
            >
              <option value="ALL">All Equipments ({checklists.length})</option>
              {equipmentList.map(eq => (
                <option key={eq.code} value={eq.code}>
                  {eq.code} - {eq.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1, maxWidth: '360px' }}>
            <input 
              type="text" 
              className="search-input" 
              style={{ padding: '0.55rem 0.85rem', fontSize: '0.85rem' }}
              placeholder="Search checklist checkpoint..."
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
                <th>EQUIPMENT</th>
                <th>CHECKPOINT TITLE</th>
                <th>INSPECTION TYPE</th>
                <th>CRITERIA / ACCEPTANCE STANDARD</th>
                <th>SEVERITY</th>
                <th>STATUS</th>
                <th>POST ON DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredChecklists.length > 0 ? (
                filteredChecklists.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, color: '#374151' }}>{index + 1}</td>
                    <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.masId}</td>
                    <td>
                      <div>
                        <span className="badge-role" style={{ backgroundColor: '#4f46e5', fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                          {item.equipmentCode}
                        </span>
                        <div style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '0.25rem', fontWeight: 500 }}>
                          {item.equipmentName}
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600, color: '#1f2937' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <CheckSquare size={15} style={{ color: '#10b981', flexShrink: 0 }} />
                        <span>{item.checkpointTitle}</span>
                      </div>
                    </td>
                    <td style={{ color: '#4b5563', fontSize: '0.825rem' }}>{item.checkType}</td>
                    <td style={{ color: '#4b5563', fontSize: '0.825rem', maxWidth: '300px', lineHeight: '1.4' }}>
                      {item.inspectionCriteria}
                    </td>
                    <td>
                      <span style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: '12px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        backgroundColor: item.severity === 'Critical' ? '#fee2e2' : item.severity === 'Major' ? '#fef3c7' : '#e0f2fe',
                        color: item.severity === 'Critical' ? '#dc2626' : item.severity === 'Major' ? '#d97706' : '#0284c7'
                      }}>
                        {item.severity}
                      </span>
                    </td>
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
                          title="Edit Checklist"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button 
                          className="btn-action delete"
                          onClick={() => handleDelete(item.id, item.checkpointTitle)}
                          title="Delete Checklist"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                    No checklist items found matching "{searchTerm}"
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
            1-{filteredChecklists.length} of {filteredChecklists.length}
          </div>

          <div className="pagination-controls">
            <button className="page-btn" disabled><ChevronsLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronRight size={16} /></button>
            <button className="page-btn" disabled><ChevronsRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Add Checklist Modal (Green Header) */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header green">
              <h3 className="modal-title">Add Checklist</h3>
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
                  <div className="form-field full-width">
                    <label className="field-label">Target Equipment</label>
                    <select 
                      className="field-select"
                      value={addFormData.equipmentCode}
                      onChange={(e) => setAddFormData({...addFormData, equipmentCode: e.target.value})}
                    >
                      {equipmentList.map(eq => (
                        <option key={eq.code} value={eq.code}>
                          {eq.code} - {eq.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Checkpoint Title</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      required
                      placeholder="e.g. Limit Switch Cut-off Operation"
                      value={addFormData.checkpointTitle}
                      onChange={(e) => setAddFormData({...addFormData, checkpointTitle: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Inspection Type</label>
                    <select 
                      className="field-select"
                      value={addFormData.checkType}
                      onChange={(e) => setAddFormData({...addFormData, checkType: e.target.value})}
                    >
                      <option value="Select">Select</option>
                      <option value="Visual & Functional">Visual &amp; Functional</option>
                      <option value="Safety Device">Safety Device</option>
                      <option value="Mechanical & Hydraulic">Mechanical &amp; Hydraulic</option>
                      <option value="Electrical & Controls">Electrical &amp; Controls</option>
                      <option value="Load & Capacity">Load &amp; Capacity</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Severity Level</label>
                    <select 
                      className="field-select"
                      value={addFormData.severity}
                      onChange={(e) => setAddFormData({...addFormData, severity: e.target.value})}
                    >
                      <option value="Select">Select</option>
                      <option value="Critical">Critical (Immediate Fail)</option>
                      <option value="Major">Major</option>
                      <option value="Minor">Minor</option>
                    </select>
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

                  <div className="form-field full-width">
                    <label className="field-label">Inspection Criteria / Acceptance Standard</label>
                    <textarea 
                      className="field-input"
                      rows="3"
                      style={{ resize: 'vertical' }}
                      required
                      placeholder="Specify the testing method, permissible tolerances, or pass/fail conditions..."
                      value={addFormData.inspectionCriteria}
                      onChange={(e) => setAddFormData({...addFormData, inspectionCriteria: e.target.value})}
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
              Do you want to edit this checklist record?
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

      {/* Edit Checklist Modal (Violet Header) */}
      {editingRecord && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header purple">
              <h3 className="modal-title">Edit Checklist</h3>
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
                  <div className="form-field full-width">
                    <label className="field-label">Target Equipment</label>
                    <select 
                      className="field-select"
                      value={editFormData.equipmentCode}
                      onChange={(e) => setEditFormData({...editFormData, equipmentCode: e.target.value})}
                    >
                      {equipmentList.map(eq => (
                        <option key={eq.code} value={eq.code}>
                          {eq.code} - {eq.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Checkpoint Title</label>
                    <input 
                      type="text" 
                      className="field-input" 
                      required
                      value={editFormData.checkpointTitle}
                      onChange={(e) => setEditFormData({...editFormData, checkpointTitle: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Inspection Type</label>
                    <select 
                      className="field-select"
                      value={editFormData.checkType}
                      onChange={(e) => setEditFormData({...editFormData, checkType: e.target.value})}
                    >
                      <option value="Visual & Functional">Visual &amp; Functional</option>
                      <option value="Safety Device">Safety Device</option>
                      <option value="Mechanical & Hydraulic">Mechanical &amp; Hydraulic</option>
                      <option value="Electrical & Controls">Electrical &amp; Controls</option>
                      <option value="Load & Capacity">Load &amp; Capacity</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Severity Level</label>
                    <select 
                      className="field-select"
                      value={editFormData.severity}
                      onChange={(e) => setEditFormData({...editFormData, severity: e.target.value})}
                    >
                      <option value="Critical">Critical (Immediate Fail)</option>
                      <option value="Major">Major</option>
                      <option value="Minor">Minor</option>
                    </select>
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

                  <div className="form-field full-width">
                    <label className="field-label">Inspection Criteria / Acceptance Standard</label>
                    <textarea 
                      className="field-input"
                      rows="3"
                      style={{ resize: 'vertical' }}
                      required
                      value={editFormData.inspectionCriteria}
                      onChange={(e) => setEditFormData({...editFormData, inspectionCriteria: e.target.value})}
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

export default Checklist;
