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
  ClipboardList
} from 'lucide-react';
import './UserManagement.css';

const EquipmentsChecklist = () => {
  // --- Equipments State ---
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
  const [promptTarget, setPromptTarget] = useState(null); // Equipment selected for edit prompt
  const [editingRecord, setEditingRecord] = useState(null); // Equipment selected for edit modal
  const [notification, setNotification] = useState(null);

  // Add & Edit Equipment form states
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

  // --- Checklist State (Below Equipments Section) ---
  const [selectedEquipmentFilter, setSelectedEquipmentFilter] = useState('ALL');
  const [checklistSearchTerm, setChecklistSearchTerm] = useState('');
  const [isAddChecklistModalOpen, setIsAddChecklistModalOpen] = useState(false);
  const [editingChecklistRecord, setEditingChecklistRecord] = useState(null);
  const [checklistPromptTarget, setChecklistPromptTarget] = useState(null);

  const [checklists, setChecklists] = useState([
    { id: 1, equipmentCode: 'EQ-CRN-01', equipmentName: 'MOBILE CRANE (HYDRAULIC)', checkpointTitle: 'Wire Rope & Hoist Drum Condition', checkType: 'Visual & Functional', inspectionCriteria: 'Inspect for kinks, bird-caging, broken wires, and proper drum spooling.', severity: 'Critical', status: 'Active' },
    { id: 2, equipmentCode: 'EQ-CRN-01', equipmentName: 'MOBILE CRANE (HYDRAULIC)', checkpointTitle: 'Anti-Two-Block (A2B) Limit Switch', checkType: 'Safety Device', inspectionCriteria: 'Test switch cut-off action to prevent hook block collision with boom tip.', severity: 'Critical', status: 'Active' },
    { id: 3, equipmentCode: 'EQ-CRN-01', equipmentName: 'MOBILE CRANE (HYDRAULIC)', checkpointTitle: 'Outrigger Extension & Hydraulic Locks', checkType: 'Mechanical & Hydraulic', inspectionCriteria: 'Ensure full outrigger beam extension and zero cylinder creep or hydraulic oil leaks.', severity: 'Major', status: 'Active' },
    { id: 4, equipmentCode: 'EQ-FL-04', equipmentName: 'FORKLIFT (3.5T)', checkpointTitle: 'Forks & Mast Assembly Inspection', checkType: 'Visual', inspectionCriteria: 'Check forks for heel cracks, deflection, and excessive wear at blade heel.', severity: 'Critical', status: 'Active' },
    { id: 5, equipmentCode: 'EQ-FL-04', equipmentName: 'FORKLIFT (3.5T)', checkpointTitle: 'Service & Parking Brake Operation', checkType: 'Functional', inspectionCriteria: 'Test full holding power on slope and positive braking pedal response.', severity: 'Critical', status: 'Active' },
    { id: 6, equipmentCode: 'EQ-FL-04', equipmentName: 'FORKLIFT (3.5T)', checkpointTitle: 'Audible Reverse Alarm & Flashing Beacon', checkType: 'Electrical & Safety', inspectionCriteria: 'Verify audible alarm sound level and strobe beacon illumination.', severity: 'Minor', status: 'Active' },
    { id: 7, equipmentCode: 'EQ-TCR-02', equipmentName: 'TOWER CRANE', checkpointTitle: 'Anemometer (Wind Speed Sensor)', checkType: 'Instrumentation', inspectionCriteria: 'Confirm real-time wind speed telemetry in operator cab and high-wind alarm cutoff.', severity: 'Critical', status: 'Active' },
    { id: 8, equipmentCode: 'EQ-OH-07', equipmentName: 'OVERHEAD GANTRY CRANE', checkpointTitle: 'Emergency Stop & Pendant Control Buttons', checkType: 'Control & Safety', inspectionCriteria: 'Verify pendant pushbuttons respond smoothly with immediate E-Stop power disconnection.', severity: 'Critical', status: 'Active' }
  ]);

  const [addChecklistData, setAddChecklistData] = useState({
    equipmentCode: 'EQ-CRN-01',
    checkpointTitle: '',
    checkType: 'Select',
    inspectionCriteria: '',
    severity: 'Select',
    status: 'Active'
  });

  const [editChecklistData, setEditChecklistData] = useState({
    id: null,
    equipmentCode: '',
    checkpointTitle: '',
    checkType: 'Visual & Functional',
    inspectionCriteria: '',
    severity: 'Critical',
    status: 'Active'
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

  // --- Equipment Handlers ---
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

  // --- Checklist Handlers ---
  const handleAddChecklistSubmit = (e) => {
    e.preventDefault();
    if (addChecklistData.checkType === 'Select') {
      alert('Please select a Check Type');
      return;
    }
    if (addChecklistData.severity === 'Select') {
      alert('Please select Severity');
      return;
    }

    const matchedEq = equipments.find(eq => eq.code === addChecklistData.equipmentCode);
    const newChecklist = {
      id: Date.now(),
      equipmentCode: addChecklistData.equipmentCode,
      equipmentName: matchedEq ? matchedEq.name : 'GENERAL EQUIPMENT',
      checkpointTitle: addChecklistData.checkpointTitle,
      checkType: addChecklistData.checkType,
      inspectionCriteria: addChecklistData.inspectionCriteria,
      severity: addChecklistData.severity,
      status: addChecklistData.status
    };

    setChecklists([newChecklist, ...checklists]);
    setIsAddChecklistModalOpen(false);
    showToast('Checklist item added successfully!');
    setAddChecklistData({
      equipmentCode: equipments[0]?.code || 'EQ-CRN-01',
      checkpointTitle: '',
      checkType: 'Select',
      inspectionCriteria: '',
      severity: 'Select',
      status: 'Active'
    });
  };

  const handleConfirmChecklistEditPrompt = () => {
    if (!checklistPromptTarget) return;
    setEditChecklistData({
      id: checklistPromptTarget.id,
      equipmentCode: checklistPromptTarget.equipmentCode,
      checkpointTitle: checklistPromptTarget.checkpointTitle,
      checkType: checklistPromptTarget.checkType,
      inspectionCriteria: checklistPromptTarget.inspectionCriteria,
      severity: checklistPromptTarget.severity,
      status: checklistPromptTarget.status
    });
    setEditingChecklistRecord(checklistPromptTarget);
    setChecklistPromptTarget(null);
  };

  const handleEditChecklistSubmit = (e) => {
    e.preventDefault();
    const matchedEq = equipments.find(eq => eq.code === editChecklistData.equipmentCode);
    setChecklists(checklists.map(item => {
      if (item.id === editChecklistData.id) {
        return {
          ...item,
          equipmentCode: editChecklistData.equipmentCode,
          equipmentName: matchedEq ? matchedEq.name : item.equipmentName,
          checkpointTitle: editChecklistData.checkpointTitle,
          checkType: editChecklistData.checkType,
          inspectionCriteria: editChecklistData.inspectionCriteria,
          severity: editChecklistData.severity,
          status: editChecklistData.status
        };
      }
      return item;
    }));

    setEditingChecklistRecord(null);
    showToast('Checklist item updated successfully!');
  };

  const handleDeleteChecklist = (id, title) => {
    if (window.confirm(`Are you sure you want to delete checklist item "${title}"?`)) {
      setChecklists(checklists.filter(c => c.id !== id));
      showToast('Checklist item removed.');
    }
  };

  // --- Filtering ---
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

  const filteredChecklists = checklists.filter(item => {
    const term = checklistSearchTerm.toLowerCase();
    const matchesEquipment = selectedEquipmentFilter === 'ALL' || item.equipmentCode === selectedEquipmentFilter;
    const matchesSearch = 
      item.checkpointTitle.toLowerCase().includes(term) ||
      item.equipmentCode.toLowerCase().includes(term) ||
      item.equipmentName.toLowerCase().includes(term) ||
      item.checkType.toLowerCase().includes(term) ||
      item.severity.toLowerCase().includes(term);
    return matchesEquipment && matchesSearch;
  });

  return (
    <div className="user-management-container">
      {/* SECTION 1: EQUIPMENTS */}
      <div className="um-header-row">
        <h1 className="um-title">Equipments Management</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / Registration / <span>Equipments</span>
          </div>
          <button 
            className="btn-add-new"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={18} />
            <span>Add Equipment</span>
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
          fontWeight: 600,
          marginBottom: '1rem'
        }}>
          {notification}
        </div>
      )}

      {/* Main Equipments Table Card */}
      <div className="um-card" style={{ marginBottom: '2.5rem' }}>
        {/* Search Bar */}
        <div className="um-search-container">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search equipment name, code, category..."
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

      {/* SECTION 2: CHECKLIST OF THE EQUIPMENTS (BELOW EQUIPMENTS SECTION) */}
      <div className="um-header-row" style={{ marginTop: '1rem' }}>
        <div>
          <h2 className="um-title" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.4rem' }}>
            <ClipboardList size={22} style={{ color: '#584bf7' }} />
            Inspection Checklists
          </h2>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
            Pre-operational and periodic third-party safety inspection checklist items per equipment
          </p>
        </div>
        <div className="um-header-right">
          <button 
            className="btn-add-new"
            style={{ backgroundColor: '#584bf7' }}
            onClick={() => setIsAddChecklistModalOpen(true)}
          >
            <Plus size={18} />
            <span>Add Checklist Point</span>
          </button>
        </div>
      </div>

      {/* Checklist Table Card */}
      <div className="um-card">
        {/* Filter and Search Bar for Checklist */}
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
              <option value="ALL">All Equipments ({checklists.length} items)</option>
              {equipments.map(eq => (
                <option key={eq.id} value={eq.code}>
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
              value={checklistSearchTerm}
              onChange={(e) => setChecklistSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Checklist Table */}
        <div className="table-responsive">
          <table className="um-table">
            <thead>
              <tr>
                <th>NO</th>
                <th>EQUIPMENT</th>
                <th>CHECKPOINT TITLE</th>
                <th>INSPECTION TYPE</th>
                <th>INSPECTION CRITERIA / ACCEPTANCE STANDARD</th>
                <th>SEVERITY</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredChecklists.length > 0 ? (
                filteredChecklists.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600, color: '#374151' }}>{index + 1}</td>
                    <td>
                      <div>
                        <span className="badge-role" style={{ backgroundColor: '#3b82f6', fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
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
                    <td style={{ color: '#4b5563', fontSize: '0.825rem', maxWidth: '320px', lineHeight: '1.4' }}>
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
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-action edit"
                          onClick={() => setChecklistPromptTarget(item)}
                          title="Edit Checklist Item"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button 
                          className="btn-action delete"
                          onClick={() => handleDeleteChecklist(item.id, item.checkpointTitle)}
                          title="Delete Checklist Item"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '2.5rem', color: '#9ca3af' }}>
                    No checklist items found matching criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Checklist Pagination */}
        <div className="table-pagination">
          <div className="rows-per-page">
            <span>Rows per page:</span>
            <select className="rows-select" defaultValue="10">
              <option value="10">10</option>
              <option value="25">25</option>
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

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* 1. Add Equipment Modal (Green Header - matches Add Training Title) */}
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

      {/* 2. Edit Equipment Confirmation Prompt */}
      {promptTarget && (
        <div className="modal-overlay">
          <div className="reset-modal-container">
            <div className="reset-warning-icon">!</div>
            <h3 className="reset-title">Are you sure?</h3>
            <p className="reset-desc">
              Do you want to edit this equipment record?
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

      {/* 3. Edit Equipment Modal (Violet Header) */}
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

      {/* 4. Add Checklist Point Modal (Purple Header - matches standard layout) */}
      {isAddChecklistModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header purple">
              <h3 className="modal-title">Add Inspection Checklist Point</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setIsAddChecklistModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddChecklistSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field full-width">
                    <label className="field-label">Target Equipment</label>
                    <select 
                      className="field-select"
                      value={addChecklistData.equipmentCode}
                      onChange={(e) => setAddChecklistData({...addChecklistData, equipmentCode: e.target.value})}
                    >
                      {equipments.map(eq => (
                        <option key={eq.id} value={eq.code}>
                          {eq.code} - {eq.name} ({eq.category})
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
                      value={addChecklistData.checkpointTitle}
                      onChange={(e) => setAddChecklistData({...addChecklistData, checkpointTitle: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Inspection Type</label>
                    <select 
                      className="field-select"
                      value={addChecklistData.checkType}
                      onChange={(e) => setAddChecklistData({...addChecklistData, checkType: e.target.value})}
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
                      value={addChecklistData.severity}
                      onChange={(e) => setAddChecklistData({...addChecklistData, severity: e.target.value})}
                    >
                      <option value="Select">Select</option>
                      <option value="Critical">Critical (Immediate Fail)</option>
                      <option value="Major">Major</option>
                      <option value="Minor">Minor</option>
                    </select>
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Inspection Criteria / Acceptance Standard</label>
                    <textarea 
                      className="field-input"
                      rows="3"
                      style={{ resize: 'vertical' }}
                      required
                      placeholder="Specify the testing method, permissible tolerances, or pass/fail conditions..."
                      value={addChecklistData.inspectionCriteria}
                      onChange={(e) => setAddChecklistData({...addChecklistData, inspectionCriteria: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-modal-close"
                  onClick={() => setIsAddChecklistModalOpen(false)}
                >
                  Close
                </button>
                <button 
                  type="submit" 
                  className="btn-modal-submit purple"
                >
                  Add Checkpoint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Edit Checklist Prompt */}
      {checklistPromptTarget && (
        <div className="modal-overlay">
          <div className="reset-modal-container">
            <div className="reset-warning-icon">!</div>
            <h3 className="reset-title">Are you sure?</h3>
            <p className="reset-desc">
              Do you want to edit this checklist point?
            </p>
            <div className="reset-actions">
              <button 
                type="button" 
                className="btn-reset-confirm"
                onClick={handleConfirmChecklistEditPrompt}
              >
                Yes, edit it!
              </button>
              <button 
                type="button" 
                className="btn-reset-cancel"
                onClick={() => setChecklistPromptTarget(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Edit Checklist Modal */}
      {editingChecklistRecord && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header purple">
              <h3 className="modal-title">Edit Inspection Checklist Point</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setEditingChecklistRecord(null)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditChecklistSubmit}>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-field full-width">
                    <label className="field-label">Target Equipment</label>
                    <select 
                      className="field-select"
                      value={editChecklistData.equipmentCode}
                      onChange={(e) => setEditChecklistData({...editChecklistData, equipmentCode: e.target.value})}
                    >
                      {equipments.map(eq => (
                        <option key={eq.id} value={eq.code}>
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
                      value={editChecklistData.checkpointTitle}
                      onChange={(e) => setEditChecklistData({...editChecklistData, checkpointTitle: e.target.value})}
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Inspection Type</label>
                    <select 
                      className="field-select"
                      value={editChecklistData.checkType}
                      onChange={(e) => setEditChecklistData({...editChecklistData, checkType: e.target.value})}
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
                      value={editChecklistData.severity}
                      onChange={(e) => setEditChecklistData({...editChecklistData, severity: e.target.value})}
                    >
                      <option value="Critical">Critical (Immediate Fail)</option>
                      <option value="Major">Major</option>
                      <option value="Minor">Minor</option>
                    </select>
                  </div>

                  <div className="form-field full-width">
                    <label className="field-label">Inspection Criteria / Acceptance Standard</label>
                    <textarea 
                      className="field-input"
                      rows="3"
                      style={{ resize: 'vertical' }}
                      required
                      value={editChecklistData.inspectionCriteria}
                      onChange={(e) => setEditChecklistData({...editChecklistData, inspectionCriteria: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-modal-close"
                  onClick={() => setEditingChecklistRecord(null)}
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

export default EquipmentsChecklist;
