import React, { useState } from 'react';
import './UserManagement.css';

const OverallReport = () => {
  const [selectedBatch, setSelectedBatch] = useState('-- Select Batch No --');
  const [selectedOrg, setSelectedOrg] = useState('-- Select Organization --');
  const [notification, setNotification] = useState(null);

  const handleView = () => {
    setNotification(`Generating Overall Report for Batch: ${selectedBatch}, Organization: ${selectedOrg}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="user-management-container">
      {/* Header Row */}
      <div className="um-header-row">
        <h1 className="um-title">Overall Report</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / <span>Overall Report</span>
          </div>
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

      <div className="report-card-container">
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1f2937' }}>Select Batch Number</label>
            <select 
              className="field-select"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="-- Select Batch No --">-- Select Batch No --</option>
              <option value="10845/745">10845/745</option>
              <option value="10844/745">10844/745</option>
              <option value="10843/744">10843/744</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1f2937' }}>Select Organization</label>
            <select 
              className="field-select"
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
            >
              <option value="-- Select Organization --">-- Select Organization --</option>
              <option value="L & T SUCG JV">L &amp; T SUCG JV</option>
              <option value="HSSG INDIA PVT LTD">HSSG INDIA PVT LTD</option>
              <option value="CONSOLIDATED CONSTRUCTION">CONSOLIDATED CONSTRUCTION</option>
            </select>
          </div>

          <button 
            type="button" 
            className="btn-modal-submit purple"
            style={{ padding: '0.7rem 2.5rem', fontSize: '0.95rem', borderRadius: '8px', fontWeight: 600 }}
            onClick={handleView}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverallReport;
