import React, { useState } from 'react';
import './UserManagement.css';

const ConsolidatedReport = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [notification, setNotification] = useState(null);

  const handleViewReport = () => {
    setNotification(`Generating Consolidated Report from ${fromDate || 'Start'} to ${toDate || 'End'}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="user-management-container">
      {/* Header Row */}
      <div className="um-header-row">
        <h1 className="um-title">Consolidated Report</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / <span>Consolidated Report</span>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minWidth: '220px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1f2937' }}>From Date</label>
            <input 
              type="date" 
              className="field-input"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minWidth: '220px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1f2937' }}>To Date</label>
            <input 
              type="date" 
              className="field-input"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <button 
            type="button" 
            className="btn-modal-submit purple"
            style={{ padding: '0.7rem 2.25rem', fontSize: '0.95rem', borderRadius: '8px', fontWeight: 600 }}
            onClick={handleViewReport}
          >
            View Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsolidatedReport;
