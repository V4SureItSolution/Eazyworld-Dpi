import React, { useState } from 'react';
import './UserManagement.css';

const BatchReport = () => {
  const [selectedBatch, setSelectedBatch] = useState('-- Select Batch No --');
  const [notification, setNotification] = useState(null);

  const handleShowReport = () => {
    if (selectedBatch === '-- Select Batch No --') {
      alert('Please select a batch number');
      return;
    }
    setNotification(`Generating Batch Report for: ${selectedBatch}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="user-management-container">
      {/* Header Row */}
      <div className="um-header-row">
        <h1 className="um-title">Batch Report</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / <span>Batch Report</span>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1f2937' }}>
            Select Batch Number
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <select 
              className="field-select"
              style={{ flex: 1, maxWidth: '440px' }}
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="-- Select Batch No --">-- Select Batch No --</option>
              <option value="10845/745">10845/745</option>
              <option value="10844/745">10844/745</option>
              <option value="10843/744">10843/744</option>
              <option value="10842/743">10842/743</option>
            </select>
            <button 
              type="button"
              className="btn-modal-submit purple"
              style={{ padding: '0.7rem 2.25rem', fontSize: '0.95rem', borderRadius: '8px', fontWeight: 600 }}
              onClick={handleShowReport}
            >
              Show Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchReport;
