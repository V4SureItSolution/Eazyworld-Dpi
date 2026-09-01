import React, { useState } from 'react';
import { Filter, Eye, RotateCw, Printer } from 'lucide-react';
import './UserManagement.css';
import './EvaluationForm.css';

const AttendanceSheet = () => {
  const [selectedBatch, setSelectedBatch] = useState('Select a batch number');
  const [candidates, setCandidates] = useState([]);
  const [notification, setNotification] = useState(null);

  const handleReset = () => {
    setSelectedBatch('Select a batch number');
    setCandidates([]);
  };

  const handleView = () => {
    if (selectedBatch === 'Select a batch number') {
      alert('Please select a valid batch number');
      return;
    }
    setNotification(`Loaded attendance sheet candidates for batch: ${selectedBatch}`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePrintSheet = () => {
    window.print();
  };

  return (
    <div className="user-management-container">
      {/* Header Row */}
      <div className="um-header-row">
        <h1 className="um-title">Training Attendance Sheet</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / <span>Training Attendance Sheet</span>
          </div>
          <button className="btn-add-new" onClick={handlePrintSheet}>
            <Printer size={18} />
            <span>Print Attendance Sheet</span>
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
          <Filter size={18} />
          <span>Filter Records</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', width: '100%', maxWidth: '320px' }}>
            Batch Number
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

      {/* Card 2: Document Printable Sheet */}
      <div className="eval-form-card" style={{ padding: '2.5rem 3rem' }}>
        {/* Company Title & Logo Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.5px' }}>
              EAZYWORLD EHS ENGINEERING PRIVATE LIMITED
            </h2>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginTop: '0.3rem' }}>
              ISO 9001-2015 / 10002-2018 / 14001-2018 / 21001-2018 &amp; 45001-2018 CERTIFIED COMPANY
            </p>
          </div>
          <div>
            <svg viewBox="0 0 100 100" style={{ width: '80px', height: '80px' }}>
              <circle cx="50" cy="50" r="45" fill="#38bdf8" opacity="0.3" />
              <circle cx="50" cy="50" r="40" fill="#0284c7" />
              <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#ffffff" strokeWidth="2" />
              <ellipse cx="50" cy="50" rx="14" ry="38" fill="none" stroke="#ffffff" strokeWidth="2" />
              <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="bold" fontFamily="sans-serif">Ewe</text>
            </svg>
          </div>
        </div>

        {/* Attendance Sheet Titles */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.5px', marginBottom: '0.4rem' }}>
            TRAINING ATTENDANCE SHEET
          </h3>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
            TOPIC - &quot;SAFE OPERATION OF CRANES&quot;
          </h4>
        </div>

        {/* Date & Batch Meta Line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', marginBottom: '1rem' }}>
          <div>Date- 01-09-2026</div>
          <div>Batch No. - <span style={{ textDecoration: 'underline' }}>{selectedBatch === 'Select a batch number' ? '____________' : selectedBatch}</span></div>
        </div>

        {/* Grid Table */}
        <div style={{ border: '2px solid #000000', marginBottom: '3rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #000000' }}>
                <th rowSpan={2} style={{ borderRight: '1px solid #000000', padding: '0.5rem', width: '6%', fontSize: '0.75rem', fontWeight: 700 }}>
                  SL.
                </th>
                <th style={{ borderRight: '1px solid #000000', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>
                  STATUS
                </th>
                <th style={{ borderRight: '1px solid #000000', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>
                  CANDIDATE NAME
                </th>
                <th style={{ borderRight: '1px solid #000000', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>
                  ORGANISATION
                </th>
                <th style={{ borderRight: '1px solid #000000', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>
                  PASS / FAIL
                </th>
                <th rowSpan={2} style={{ padding: '0.5rem', width: '16%', fontSize: '0.75rem', fontWeight: 700 }}>
                  CANDIDATE SIGN
                </th>
              </tr>
              <tr style={{ backgroundColor: '#ffffff', borderBottom: '2px solid #000000' }}>
                <th style={{ borderRight: '1px solid #000000', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>
                  WORK LOCATION
                </th>
                <th style={{ borderRight: '1px solid #000000', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>
                  DESIGNATION
                </th>
                <th style={{ borderRight: '1px solid #000000', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>
                  SUB-CONTRACTOR
                </th>
                <th style={{ borderRight: '1px solid #000000', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>
                  CERTIFICATE REFERENCE NUMBER (CRN)
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '2.5rem', fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic' }}>
                    Select a batch number and click View to load candidates.
                  </td>
                </tr>
              ) : (
                candidates.map((cand, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #000000' }}>
                    <td style={{ borderRight: '1px solid #000000', padding: '0.6rem' }}>{idx + 1}</td>
                    <td style={{ borderRight: '1px solid #000000', padding: '0.6rem' }}>{cand.status}</td>
                    <td style={{ borderRight: '1px solid #000000', padding: '0.6rem', fontWeight: 700 }}>{cand.name}</td>
                    <td style={{ borderRight: '1px solid #000000', padding: '0.6rem' }}>{cand.org}</td>
                    <td style={{ borderRight: '1px solid #000000', padding: '0.6rem' }}>{cand.passFail}</td>
                    <td style={{ padding: '0.6rem' }}></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Signature Blocks */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', fontWeight: 800, fontSize: '0.85rem', color: '#0f172a', marginBottom: '3rem' }}>
          <div>TRAINING ENGINEER</div>
          <div>CERTIFIED SEAL</div>
          <div>TRAINING CO-ORDINATOR</div>
        </div>

        {/* Notes Line */}
        <div style={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.6rem' }}>
          Not valid unless sealed and signed.
        </div>

        {/* Office Verification Table */}
        <div style={{ border: '1px solid #000000', marginBottom: '1rem', maxWidth: '850px', margin: '0 auto 1rem auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'center' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #000000' }}>
                <td style={{ borderRight: '1px solid #000000', fontWeight: 700, padding: '0.4rem', width: '14%' }}>SIGN</td>
                <td style={{ borderRight: '1px solid #000000', width: '14%' }}></td>
                <td style={{ borderRight: '1px solid #000000', width: '14%' }}></td>
                <td style={{ borderRight: '1px solid #000000', width: '14%' }}></td>
                <td style={{ borderRight: '1px solid #000000', width: '14%' }}></td>
                <td style={{ borderRight: '1px solid #000000', width: '14%' }}></td>
                <td style={{ width: '16%' }}></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #000000' }}>
                <td style={{ borderRight: '1px solid #000000', fontWeight: 700, padding: '0.4rem' }}>DATE</td>
                <td style={{ borderRight: '1px solid #000000' }}></td>
                <td style={{ borderRight: '1px solid #000000' }}></td>
                <td style={{ borderRight: '1px solid #000000' }}></td>
                <td style={{ borderRight: '1px solid #000000' }}></td>
                <td style={{ borderRight: '1px solid #000000' }}></td>
                <td></td>
              </tr>
              <tr style={{ fontWeight: 700, fontSize: '0.7rem' }}>
                <td style={{ borderRight: '1px solid #000000', padding: '0.4rem' }}>SCAN COMPLETED</td>
                <td style={{ borderRight: '1px solid #000000', padding: '0.4rem' }}>COPIED FOR INVOICE</td>
                <td style={{ borderRight: '1px solid #000000', padding: '0.4rem' }}>EIR NOTED</td>
                <td style={{ borderRight: '1px solid #000000', padding: '0.4rem' }}>CERTIFICATE PROCESSED</td>
                <td style={{ borderRight: '1px solid #000000', padding: '0.4rem' }}>ID PROCESSED</td>
                <td style={{ padding: '0.4rem' }} colSpan={2}>VERIFIED BY</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Revision Controlled Copy Line */}
        <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#475569', fontWeight: 600, marginBottom: '2.5rem' }}>
          <div>REV – 07 Dated 30-01-2025 - BPD, EWE-EHS/ATND/AMD/031Dx2223 - FM 8HR to 031F/2425</div>
          <div>Date -26-04-2022 Controlled copy - Approved By – Santhosh K</div>
        </div>

        {/* Centered Print Button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            type="button" 
            className="btn-modal-submit purple"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 2rem', fontSize: '1rem' }}
            onClick={handlePrintSheet}
          >
            <Printer size={18} />
            <span>Print Attendance Sheet</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSheet;
