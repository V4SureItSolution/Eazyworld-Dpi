import React, { useState } from 'react';
import { Search, RotateCw, LayoutGrid } from 'lucide-react';
import './UserManagement.css';

const Renewal = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  const handleSearch = () => {
    setNotification(`Filtered renewal records from ${fromDate || 'Start'} to ${toDate || 'End'}`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleClear = () => {
    setFromDate('');
    setToDate('');
    setSearchTerm('');
  };

  return (
    <div className="user-management-container">
      {/* Header Row */}
      <div className="um-header-row">
        <h1 className="um-title">Renewal</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / <span>Renewal</span>
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

      {/* Card 1: Filter Records */}
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
          <Search size={18} />
          <span>Filter Records</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, minWidth: '220px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>From Date</label>
            <input 
              type="date" 
              className="field-input"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, minWidth: '220px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>To Date</label>
            <input 
              type="date" 
              className="field-input"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '2px' }}>
            <button 
              type="button" 
              className="btn-modal-submit purple"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem' }}
              onClick={handleSearch}
            >
              <Search size={16} />
              <span>Search</span>
            </button>

            <button 
              type="button" 
              className="btn-modal-close"
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.25rem' }}
              onClick={handleClear}
            >
              <RotateCw size={16} />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Card 2: Results */}
      <div className="um-card">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid #f3f4f6',
          fontWeight: 700,
          color: '#374151',
          fontSize: '1rem'
        }}>
          <LayoutGrid size={18} />
          <span>Results</span>
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

export default Renewal;
