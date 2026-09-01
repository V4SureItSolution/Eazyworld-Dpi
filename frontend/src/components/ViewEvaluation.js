import React, { useState, useEffect } from 'react';
import { Eye, Printer, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import api from '../Api';
import './UserManagement.css';

const ViewEvaluation = () => {
  const [data, setData] = useState([
    {
      id: 1,
      formTitle: "SAFE OPERATION OF CRANE",
      operator: "BABA NAIK.J",
      evaluationDate: "2026-04-10"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/evaluations-list');
      if (response.data && response.data.length > 0) setData(response.data);
    } catch (err) {
      console.warn('API fallback:', err);
    }
  };

  const handleViewForm = (item) => {
    setNotification(`Opening form view for operator: ${item.operator}`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePrintForm = (item) => {
    setNotification(`Sending evaluation form for "${item.formTitle}" to printer...`);
    setTimeout(() => setNotification(null), 3000);
  };

  const filtered = data.filter(item => 
    item.formTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.operator.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-management-container">
      {/* Header Row */}
      <div className="um-header-row">
        <h1 className="um-title">View Evaluation</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / <span>View Evaluation</span>
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

      <div className="um-card">
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid #f3f4f6',
          fontWeight: 700,
          color: '#374151',
          fontSize: '1rem'
        }}>
          Evaluation Forms
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

        <div className="table-responsive">
          <table className="um-table">
            <thead>
              <tr>
                <th>NO</th>
                <th>FORM TITLE</th>
                <th>OPERATOR</th>
                <th>EVALUATION DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, index) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: '#374151' }}>{index + 1}</td>
                  <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.formTitle}</td>
                  <td style={{ fontWeight: 600, color: '#1f2937' }}>{item.operator}</td>
                  <td style={{ color: '#4b5563' }}>{item.evaluationDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-action" 
                        style={{ backgroundColor: '#06b6d4' }}
                        onClick={() => handleViewForm(item)}
                        title="View Evaluation Form"
                      >
                        <Eye size={15} />
                      </button>
                      <button 
                        className="btn-action" 
                        style={{ backgroundColor: '#4f46e5' }}
                        onClick={() => handlePrintForm(item)}
                        title="Print Evaluation Form"
                      >
                        <Printer size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-pagination">
          <div className="rows-per-page">
            <span>Rows per page:</span>
            <select className="rows-select" defaultValue="100">
              <option value="100">100</option>
            </select>
          </div>
          <div>1-{filtered.length} of {filtered.length}</div>
          <div className="pagination-controls">
            <button className="page-btn" disabled><ChevronsLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronLeft size={16} /></button>
            <button className="page-btn" disabled><ChevronRight size={16} /></button>
            <button className="page-btn" disabled><ChevronsRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEvaluation;
