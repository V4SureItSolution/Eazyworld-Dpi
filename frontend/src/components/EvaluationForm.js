import React, { useState } from 'react';
import { Plus, Minus, Edit2, Save, RotateCw } from 'lucide-react';
import './EvaluationForm.css';

const EvaluationForm = () => {
  const [formTitle, setFormTitle] = useState('Evaluation of Training Form');
  
  // Metadata state
  const [meta, setMeta] = useState({
    operatorName: '',
    evaluatorName: '',
    craneLocation: '',
    trainingDate: '',
    evaluationDate: '',
    craneModel: '',
    craneCapacity: ''
  });

  // Steps table initial state
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: '1. Pre-Operation Equipment Inspection',
      desc: 'Was operator able to read, identify and inspect Pre-Operational Checklist (Pre-Use Hoist, Crane and sling inspection Guidelines)',
      score: '7',
      pass: false,
      fail: false
    },
    {
      id: 2,
      title: '2. Load Inspection',
      desc: 'Was the operator able to read and analysis weight of the load and SWL as not to exceed the rated capacity?',
      score: '10',
      pass: false,
      fail: false
    },
    {
      id: 3,
      title: '2A. Load inspection',
      desc: 'Was the operator able to hoist an effective lift crane and secure the load properly, balanced and stable?',
      score: '',
      pass: false,
      fail: false
    },
    {
      id: 4,
      title: '3. Move plan',
      desc: 'Was a destination clearly identified.',
      score: '',
      pass: false,
      fail: false
    },
    {
      id: 5,
      title: '4. Control operation',
      desc: 'Was operator familiar with all controls on the pendant / Operation levers / Switches?',
      score: '',
      pass: false,
      fail: false
    },
    {
      id: 6,
      title: '4A. Control operation',
      desc: 'Was load speed and control satisfactory? (no sudden stops or acceleration)',
      score: '',
      pass: false,
      fail: false
    },
    {
      id: 7,
      title: '5. Safety Checks and inspection',
      desc: 'Was operator able to check the safety devices and limit switches and emergency stop use?',
      score: '',
      pass: false,
      fail: false
    },
    {
      id: 8,
      title: '6 Crane Hand Signals',
      desc: 'Knowledge of Operator of Crane Hand Signals',
      score: '',
      pass: false,
      fail: false
    }
  ]);

  const [engineerComments, setEngineerComments] = useState('');
  const [officeUse, setOfficeUse] = useState('');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [certificateDate, setCertificateDate] = useState('');
  const [notification, setNotification] = useState(null);

  const handleAddRow = () => {
    const newStep = {
      id: Date.now(),
      title: `${steps.length + 1}. Custom Step Title`,
      desc: 'Enter step description here...',
      score: '',
      pass: false,
      fail: false
    };
    setSteps([...steps, newStep]);
  };

  const handleRemoveRow = (id) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const handleStepChange = (id, field, value) => {
    setSteps(steps.map(step => {
      if (step.id === id) {
        if (field === 'pass' && value) {
          return { ...step, pass: true, fail: false };
        }
        if (field === 'fail' && value) {
          return { ...step, fail: true, pass: false };
        }
        return { ...step, [field]: value };
      }
      return step;
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setNotification('Evaluation Form saved successfully!');
    setTimeout(() => setNotification(null), 3500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all fields in this evaluation form?')) {
      setMeta({
        operatorName: '',
        evaluatorName: '',
        craneLocation: '',
        trainingDate: '',
        evaluationDate: '',
        craneModel: '',
        craneCapacity: ''
      });
      setEngineerComments('');
      setOfficeUse('');
      setCertificateNumber('');
      setCertificateDate('');
      setNotification('Form reset.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="eval-form-container">
      {/* Header Row */}
      <div className="um-header-row" style={{ marginBottom: '1.5rem' }}>
        <h1 className="um-title">Evaluation Form</h1>
        <div className="um-header-right">
          <div className="um-breadcrumb">
            Home / <span>Evaluation Form</span>
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

      <form onSubmit={handleSave} className="eval-form-card">
        {/* Company Header */}
        <div className="eval-header-grid">
          <div className="eval-logo-box">
            {/* SVG EWE Globe Icon */}
            <svg viewBox="0 0 100 100" className="eval-logo-img">
              <circle cx="50" cy="50" r="45" fill="#38bdf8" opacity="0.3" />
              <circle cx="50" cy="50" r="40" fill="#0284c7" />
              <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#ffffff" strokeWidth="2" />
              <ellipse cx="50" cy="50" rx="14" ry="38" fill="none" stroke="#ffffff" strokeWidth="2" />
              <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="bold" fontFamily="sans-serif">Ewe</text>
            </svg>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h2 className="eval-company-title">
              EAZYWORLD EHS ENGINEERING PRIVATE LIMITED
            </h2>
          </div>

          <div>
            <p className="eval-iso-cert">
              ISO 9001-2015, 14002-2016 &amp; 45001-2018 CERTIFIED COMPANY
            </p>
          </div>
        </div>

        {/* Form Title */}
        <div className="eval-title-section">
          <span className="eval-title-label">Form Title</span>
          <input 
            type="text" 
            className="eval-title-input"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
          />
        </div>

        {/* Metadata Grid */}
        <div className="eval-meta-grid">
          {/* Left Metadata Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div className="eval-meta-box">
              <div className="eval-meta-label">
                <span>Operator Name:</span>
                <Edit2 size={13} color="#94a3b8" />
              </div>
              <div className="eval-meta-input-cell">
                <input 
                  type="text" 
                  className="eval-meta-input"
                  placeholder="Enter operator name"
                  value={meta.operatorName}
                  onChange={(e) => setMeta({...meta, operatorName: e.target.value})}
                />
              </div>
            </div>

            <div className="eval-meta-box">
              <div className="eval-meta-label">
                <span>Evaluator Name:</span>
                <Edit2 size={13} color="#94a3b8" />
              </div>
              <div className="eval-meta-input-cell">
                <input 
                  type="text" 
                  className="eval-meta-input"
                  placeholder="Enter evaluator name"
                  value={meta.evaluatorName}
                  onChange={(e) => setMeta({...meta, evaluatorName: e.target.value})}
                />
              </div>
            </div>

            <div className="eval-meta-box">
              <div className="eval-meta-label">
                <span>:</span>
                <Edit2 size={13} color="#94a3b8" />
              </div>
              <div className="eval-meta-input-cell">
                <input 
                  type="text" 
                  className="eval-meta-input"
                  placeholder="Crane Location"
                  value={meta.craneLocation}
                  onChange={(e) => setMeta({...meta, craneLocation: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Right Metadata Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div className="eval-meta-box">
              <div className="eval-meta-label">
                <span>Training Date:</span>
                <Edit2 size={13} color="#94a3b8" />
              </div>
              <div className="eval-meta-input-cell">
                <input 
                  type="date" 
                  className="eval-meta-input"
                  value={meta.trainingDate}
                  onChange={(e) => setMeta({...meta, trainingDate: e.target.value})}
                />
              </div>
            </div>

            <div className="eval-meta-box">
              <div className="eval-meta-label">
                <span>Evaluation Date:</span>
                <Edit2 size={13} color="#94a3b8" />
              </div>
              <div className="eval-meta-input-cell">
                <input 
                  type="date" 
                  className="eval-meta-input"
                  value={meta.evaluationDate}
                  onChange={(e) => setMeta({...meta, evaluationDate: e.target.value})}
                />
              </div>
            </div>

            <div className="eval-meta-box">
              <div className="eval-meta-label">
                <span>Crane Model / Capacity:</span>
                <Edit2 size={13} color="#94a3b8" />
              </div>
              <div className="eval-meta-input-cell" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  className="eval-meta-input"
                  placeholder="Model"
                  value={meta.craneModel}
                  onChange={(e) => setMeta({...meta, craneModel: e.target.value})}
                />
                <input 
                  type="text" 
                  className="eval-meta-input"
                  placeholder="Capacity"
                  style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '0.5rem' }}
                  value={meta.craneCapacity}
                  onChange={(e) => setMeta({...meta, craneCapacity: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Steps Table */}
        <div className="eval-table-wrapper">
          <table className="eval-steps-table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    <span>STEP</span>
                    <Edit2 size={12} color="#64748b" />
                  </div>
                </th>
                <th style={{ width: '44%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    <span>EVALUATION:</span>
                    <Edit2 size={12} color="#64748b" />
                  </div>
                </th>
                <th style={{ width: '9%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    <span>*/10:</span>
                    <Edit2 size={12} color="#64748b" />
                  </div>
                </th>
                <th style={{ width: '8%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    <span>PASS:</span>
                    <Edit2 size={12} color="#64748b" />
                  </div>
                </th>
                <th style={{ width: '8%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                    <span>FAIL:</span>
                    <Edit2 size={12} color="#64748b" />
                  </div>
                </th>
                <th style={{ width: '9%' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step) => (
                <tr key={step.id}>
                  <td>
                    <textarea 
                      className="eval-step-title-input" 
                      rows={2}
                      value={step.title}
                      onChange={(e) => handleStepChange(step.id, 'title', e.target.value)}
                    />
                  </td>
                  <td>
                    <textarea 
                      className="eval-step-desc-input" 
                      rows={3}
                      value={step.desc}
                      onChange={(e) => handleStepChange(step.id, 'desc', e.target.value)}
                    />
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <input 
                      type="text" 
                      className="eval-score-input"
                      placeholder="Score"
                      value={step.score}
                      onChange={(e) => handleStepChange(step.id, 'score', e.target.value)}
                    />
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <input 
                      type="checkbox" 
                      className="eval-checkbox"
                      checked={step.pass}
                      onChange={(e) => handleStepChange(step.id, 'pass', e.target.checked)}
                    />
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <input 
                      type="checkbox" 
                      className="eval-checkbox"
                      checked={step.fail}
                      onChange={(e) => handleStepChange(step.id, 'fail', e.target.checked)}
                    />
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <button 
                      type="button" 
                      className="btn-remove-row"
                      onClick={() => handleRemoveRow(step.id)}
                      title="Remove Row"
                    >
                      <Minus size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Row Button */}
        <button 
          type="button" 
          className="btn-add-row"
          onClick={handleAddRow}
        >
          <Plus size={16} />
          <span>Add Evaluation Row</span>
        </button>

        {/* Observation Textarea */}
        <div className="eval-section-title">
          <span>OBSERVATION AND ENGINEER COMMENTS:</span>
          <Edit2 size={13} color="#64748b" />
        </div>
        <textarea 
          className="eval-textarea"
          placeholder="Enter observation and engineer comments..."
          value={engineerComments}
          onChange={(e) => setEngineerComments(e.target.value)}
        />

        {/* Office Use Textarea */}
        <div className="eval-section-title">
          <span>EAZYWORLD OFFICE USE:</span>
          <Edit2 size={13} color="#64748b" />
        </div>
        <textarea 
          className="eval-textarea"
          placeholder="Office use only..."
          value={officeUse}
          onChange={(e) => setOfficeUse(e.target.value)}
        />

        {/* Footer Certificate Fields & Action Buttons */}
        <div className="eval-footer-row">
          <div className="eval-cert-group">
            <div className="eval-cert-field">
              <label className="eval-cert-label">Certificate Number:</label>
              <input 
                type="text" 
                className="eval-cert-input"
                placeholder="e.g., BPD/EWE-EHS/PRAC-EVAL/01/029/2122"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
              />
            </div>

            <div className="eval-cert-field">
              <label className="eval-cert-label">Certificate Date:</label>
              <input 
                type="date" 
                className="eval-cert-input"
                value={certificateDate}
                onChange={(e) => setCertificateDate(e.target.value)}
              />
            </div>
          </div>

          <div className="eval-action-btns">
            <button type="submit" className="btn-eval-save">
              <Save size={18} />
              <span>Save Form</span>
            </button>
            <button type="button" className="btn-eval-reset" onClick={handleReset}>
              <RotateCw size={18} />
              <span>Reset Form</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EvaluationForm;
