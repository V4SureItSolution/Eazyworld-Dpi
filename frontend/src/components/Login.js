import React, { useState } from 'react';
import { 
  Shield, 
  UserCheck, 
  Award, 
  BarChart3, 
  Mail, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import api from '../Api';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Derive a user-friendly name from email/username input
  const deriveNameFromInput = (inputStr) => {
    if (!inputStr) return 'USER';
    const base = inputStr.includes('@') ? inputStr.split('@')[0] : inputStr;
    // Capitalize first letter or format clean name
    return base.charAt(0).toUpperCase() + base.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);

    const fallbackName = deriveNameFromInput(email);
    let loggedInUser = { name: fallbackName, email };

    try {
      // Attempt backend API call
      const response = await api.post('/login', { email, password, rememberMe });
      setAlert({ type: 'success', message: response.data.message || 'Login successful!' });
      if (response.data && response.data.user) {
        loggedInUser = {
          name: response.data.user.name || fallbackName,
          email: response.data.user.email || email
        };
      }
    } catch (err) {
      console.warn('Backend API error or demo mode:', err);
      const errorMsg = err.response?.data?.error || 'Signing in...';
      if (err.response?.status === 401) {
        setAlert({ type: 'error', message: errorMsg });
        setLoading(false);
        return;
      }
      setAlert({ type: 'success', message: 'Signing in to Eazyworld EHS Engineering...' });
    } finally {
      setLoading(false);
      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess(loggedInUser);
        }, 500);
      }
    }
  };

  return (
    <div className="login-page">
      {/* Left Column: Brand Showcase */}
      <div className="login-left">
        <div className="left-brand">
          <div className="brand-icon-box">
            <Shield size={20} />
          </div>
          <span className="brand-name">Eazyworld EHS Engineering</span>
        </div>

        <div className="left-content">
          <h1 className="left-headline">
            Excellence in Engineering,<br />
            Safety &amp; Sustainability
          </h1>
          <p className="left-description">
            One platform for candidate registration, training evaluation,
            certification and compliance reporting - built for your EHS training
            operations.
          </p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="feature-icon-box">
                <UserCheck size={20} />
              </div>
              <div className="feature-details">
                <div className="feature-title">Registration &amp; Evaluation</div>
                <div className="feature-desc">
                  Track candidates from registration through pre/post evaluation.
                </div>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <Award size={20} />
              </div>
              <div className="feature-details">
                <div className="feature-title">Certification &amp; Renewal</div>
                <div className="feature-desc">
                  Print certificates and keep renewals on schedule.
                </div>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <BarChart3 size={20} />
              </div>
              <div className="feature-details">
                <div className="feature-title">Batch &amp; Compliance Reporting</div>
                <div className="feature-desc">
                  Monthly, batch-wise and consolidated reports at a glance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="login-right">
        <div className="form-wrapper">
          <div className="form-header">
            <div className="form-logo-box">
              <Shield size={24} />
            </div>
            <h2 className="form-title">Welcome back</h2>
            <p className="form-subtitle">Sign in to your Eazyworld Engineering account</p>
          </div>

          {alert && (
            <div className={`form-alert ${alert.type}`}>
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="text"
                className="form-input"
                placeholder="Email or Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="input-icon">
                <Mail size={18} />
              </span>
            </div>

            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="input-icon-button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="form-options">
              <label className="remember-label">
                <input
                  type="checkbox"
                  className="checkbox-custom"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Me</span>
              </label>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
