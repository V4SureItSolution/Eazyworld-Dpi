import React, { useState } from 'react';
import { Filter, Eye, RotateCw, Printer, CheckSquare, Contact } from 'lucide-react';
import './UserManagement.css';

const CertificatePrint = () => {
  const [selectedBatch, setSelectedBatch] = useState('Select a batch number');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  const handleReset = () => {
    setSelectedBatch('Select a batch number');
    setSearchTerm('');
  };

  const handleView = () => {
    if (selectedBatch === 'Select a batch number') {
      alert('Please select a valid batch number');
      return;
    }
    setNotification(`Loaded ID cards for batch: ${selectedBatch}`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePrintAll = () => {
    setNotification('Printing all ID cards for current batch...');
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePrintSelected = () => {
    setNotification('Printing selected ID cards...');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="user-management-container">
      {/* Header Row */}
      <div className="um-header-row">
        <h1 className="um-title">Certificate Print</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / <span>Certificate Print</span>
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

      {/* Card 1: Select Batch & Search */}
      <div className="um-card" style={{ marginBottom: '1.5rem', padding: '1.5rem 1.75rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          borderBottom: '1px solid #f3f4f6',
          paddingBottom: '1rem',
          marginBottom: '1.5rem',
          fontWeight: 700,
          color: '#374151',
          fontSize: '1rem'
        }}>
          <Filter size={18} />
          <span>Select Batch &amp; Search</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', width: '100%', maxWidth: '320px' }}>
            Select Batch Number
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', maxWidth: '480px', justifyContent: 'center' }}>
            <select 
              className="field-select" 
              style={{ flex: 1, maxWidth: '280px' }}
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="Select a batch number">Select a batch number</option>
              <option value="10845/745">10845/745</option>
              <option value="10844/745">10844/745</option>
              <option value="10843/744">10843/744</option>
              <option value="10842/743">10842/743</option>
            </select>
            <button 
              type="button" 
              className="btn-modal-submit purple"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem' }}
              onClick={handleView}
            >
              <Eye size={16} />
              <span>View</span>
            </button>
            <button 
              type="button" 
              className="btn-modal-close"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem' }}
              onClick={handleReset}
            >
              <RotateCw size={16} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card 2: ID Card Actions */}
      <div className="um-card">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid #f3f4f6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 700, color: '#374151', fontSize: '1rem' }}>
            <Contact size={18} />
            <span>ID Card Actions</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              type="button" 
              className="btn-modal-submit purple"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem' }}
              onClick={handlePrintAll}
            >
              <Printer size={16} />
              <span>Print All ID Cards</span>
            </button>
            <button 
              type="button" 
              className="btn-modal-submit purple"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem' }}
              onClick={handlePrintSelected}
            >
              <CheckSquare size={16} />
              <span>Print Selected ID Cards</span>
            </button>
          </div>
        </div>

        <div className="um-search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ padding: '3.5rem 2rem', textAlign: 'center', color: '#4b5563', fontWeight: 500, fontSize: '0.95rem' }}>
          There are no records to display
        </div>
      </div>
    </div>
  );
};

export default CertificatePrint;
