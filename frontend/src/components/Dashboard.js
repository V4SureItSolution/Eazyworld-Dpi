import React, { useState } from 'react';
import { 
  Gauge, 
  Users, 
  Layers, 
  ClipboardList, 
  UserCheck, 
  BarChart3, 
  ChevronRight, 
  ChevronDown,
  Menu, 
  Handshake, 
  Share2, 
  Award, 
  LogOut,
  Tv,
  Building2,
  Factory,
  User,
  MapPin,
  Building,
  CreditCard,
  UserPlus,
  FileEdit,
  MessageSquare,
  Search,
  Badge,
  RotateCw,
  Printer,
  Calendar
} from 'lucide-react';
import UserManagement from './UserManagement';
import TrainingTitle from './TrainingTitle';
import BatchNo from './BatchNo';
import OrganizationDetails from './OrganizationDetails';
import CompanyInfo from './CompanyInfo';
import TrainerName from './TrainerName';
import WorkLocation from './WorkLocation';
import ProjectName from './ProjectName';
import DrivingLicense from './DrivingLicense';
import CandidateRegistration from './CandidateRegistration';
import PreEvaluationTest from './PreEvaluationTest';
import PostEvaluationTest from './PostEvaluationTest';
import ParticipantFeedback from './ParticipantFeedback';
import PersonalEvaluations from './PersonalEvaluations';
import EvaluationForm from './EvaluationForm';
import ViewEvaluation from './ViewEvaluation';
import CertificatePrint from './CertificatePrint';
import Renewal from './Renewal';
import AttendanceSheet from './AttendanceSheet';
import BatchReport from './BatchReport';
import OverallReport from './OverallReport';
import MonthlyReport from './MonthlyReport';
import ConsolidatedReport from './ConsolidatedReport';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Batch Report');

  // Accordion toggle states for submenus (expanded by default to match screenshots)
  const [masterEntryOpen, setMasterEntryOpen] = useState(true);
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [evaluationOpen, setEvaluationOpen] = useState(true);
  const [documentsOpen, setDocumentsOpen] = useState(true);
  const [reportsOpen, setReportsOpen] = useState(true);

  // Dynamic logged in user name formatting
  const userName = user?.name || 'RAMA KRISHNAN';
  const uppercaseName = userName.toUpperCase();

  // Helper to extract initials (e.g. "RAMA KRISHNAN" -> "RK")
  const getInitials = (name) => {
    if (!name) return 'RK';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const userInitials = getInitials(userName);

  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand-badge">EW</div>
          <div className="sidebar-brand-info">
            <span className="sidebar-brand-title">Eazyworld EHS</span>
            <span className="sidebar-user-greeting">HI, {uppercaseName}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div 
            className={`nav-item ${activeMenu === 'Dashboard' ? 'active' : ''}`}
            onClick={() => setActiveMenu('Dashboard')}
          >
            <div className="nav-item-left">
              <span className="nav-icon"><Gauge size={18} /></span>
              <span>Dashboard</span>
            </div>
          </div>

          <div className="nav-section-title">ADMINISTRATION</div>
          <div 
            className={`nav-item ${activeMenu === 'User Management' ? 'active' : ''}`}
            onClick={() => setActiveMenu('User Management')}
          >
            <div className="nav-item-left">
              <span className="nav-icon"><Users size={18} /></span>
              <span>User Management</span>
            </div>
          </div>

          <div className="nav-section-title">MANAGE</div>
          
          {/* Master Entry Parent */}
          <div 
            className={`nav-item ${activeMenu === 'Master Entry' ? 'active' : ''}`}
            onClick={() => setMasterEntryOpen(!masterEntryOpen)}
          >
            <div className="nav-item-left">
              <span className="nav-icon"><Layers size={18} /></span>
              <span>Master Entry</span>
            </div>
            {masterEntryOpen ? (
              <ChevronDown size={16} className="chevron-icon" />
            ) : (
              <ChevronRight size={16} className="chevron-icon" />
            )}
          </div>

          {/* Master Entry Submenus */}
          {masterEntryOpen && (
            <div className="sub-nav-container">
              <div 
                className={`sub-nav-item ${activeMenu === 'Training Title' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Training Title')}
              >
                <span className="nav-icon"><Tv size={16} /></span>
                <span>Training Title</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Batch No' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Batch No')}
              >
                <span className="nav-icon"><Layers size={16} /></span>
                <span>Batch No</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Organization Details' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Organization Details')}
              >
                <span className="nav-icon"><Building2 size={16} /></span>
                <span>Organization Details</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Company Info' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Company Info')}
              >
                <span className="nav-icon"><Factory size={16} /></span>
                <span>Company Info</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Trainers Name' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Trainers Name')}
              >
                <span className="nav-icon"><User size={16} /></span>
                <span>Trainers Name</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Work Location' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Work Location')}
              >
                <span className="nav-icon"><MapPin size={16} /></span>
                <span>Work Location</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Project Name' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Project Name')}
              >
                <span className="nav-icon"><Building size={16} /></span>
                <span>Project Name</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Driving License' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Driving License')}
              >
                <span className="nav-icon"><CreditCard size={16} /></span>
                <span>Driving License</span>
              </div>
            </div>
          )}

          {/* Registration Parent */}
          <div 
            className={`nav-item ${activeMenu === 'Registration' ? 'active' : ''}`}
            onClick={() => setRegistrationOpen(!registrationOpen)}
          >
            <div className="nav-item-left">
              <span className="nav-icon"><ClipboardList size={18} /></span>
              <span>Registration</span>
            </div>
            {registrationOpen ? (
              <ChevronDown size={16} className="chevron-icon" />
            ) : (
              <ChevronRight size={16} className="chevron-icon" />
            )}
          </div>

          {/* Registration Submenus */}
          {registrationOpen && (
            <div className="sub-nav-container">
              <div 
                className={`sub-nav-item ${activeMenu === 'Registration List' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Registration List')}
              >
                <span className="nav-icon"><UserPlus size={16} /></span>
                <span>Registration List</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Pre Evaluation Test' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Pre Evaluation Test')}
              >
                <span className="nav-icon"><FileEdit size={16} /></span>
                <span>Pre Evaluation Test</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Post Evaluation Test' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Post Evaluation Test')}
              >
                <span className="nav-icon"><FileEdit size={16} /></span>
                <span>Post Evaluation Test</span>
              </div>
            </div>
          )}

          {/* EVALUATION Section */}
          <div className="nav-section-title">EVALUATION</div>
          
          {/* Evaluation Parent */}
          <div 
            className={`nav-item ${activeMenu === 'Evaluation' ? 'active' : ''}`}
            onClick={() => setEvaluationOpen(!evaluationOpen)}
          >
            <div className="nav-item-left">
              <span className="nav-icon"><UserCheck size={18} /></span>
              <span>Evaluation</span>
            </div>
            {evaluationOpen ? (
              <ChevronDown size={16} className="chevron-icon" />
            ) : (
              <ChevronRight size={16} className="chevron-icon" />
            )}
          </div>

          {/* Evaluation Submenus */}
          {evaluationOpen && (
            <div className="sub-nav-container">
              <div 
                className={`sub-nav-item ${activeMenu === 'Participant Feedback' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Participant Feedback')}
              >
                <span className="nav-icon"><MessageSquare size={16} /></span>
                <span>Participant Feedback</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Personal Evaluations' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Personal Evaluations')}
              >
                <span className="nav-icon"><UserCheck size={16} /></span>
                <span>Personal Evaluations</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Evaluation Form' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Evaluation Form')}
              >
                <span className="nav-icon"><ClipboardList size={16} /></span>
                <span>Evaluation Form</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'View Evaluation' ? 'active' : ''}`}
                onClick={() => setActiveMenu('View Evaluation')}
              >
                <span className="nav-icon"><Search size={16} /></span>
                <span>View Evaluation</span>
              </div>
            </div>
          )}

          {/* DOCUMENTS Section */}
          <div className="nav-section-title">DOCUMENTS</div>
          
          {/* Documents Parent */}
          <div 
            className={`nav-item ${activeMenu === 'Documents' ? 'active' : ''}`}
            onClick={() => setDocumentsOpen(!documentsOpen)}
          >
            <div className="nav-item-left">
              <span className="nav-icon"><Badge size={18} /></span>
              <span>Documents</span>
            </div>
            {documentsOpen ? (
              <ChevronDown size={16} className="chevron-icon" />
            ) : (
              <ChevronRight size={16} className="chevron-icon" />
            )}
          </div>

          {/* Documents Submenus */}
          {documentsOpen && (
            <div className="sub-nav-container">
              <div 
                className={`sub-nav-item ${activeMenu === 'Certificate Print' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Certificate Print')}
              >
                <span className="nav-icon"><Badge size={16} /></span>
                <span>Certificate Print</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Renewal' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Renewal')}
              >
                <span className="nav-icon"><RotateCw size={16} /></span>
                <span>Renewal</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Attendance Sheet' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Attendance Sheet')}
              >
                <span className="nav-icon"><Printer size={16} /></span>
                <span>Attendance Sheet</span>
              </div>
            </div>
          )}

          {/* REPORTS Section */}
          <div className="nav-section-title">REPORTS</div>
          
          {/* Reports Parent */}
          <div 
            className={`nav-item ${activeMenu === 'Reports' ? 'active' : ''}`}
            onClick={() => setReportsOpen(!reportsOpen)}
          >
            <div className="nav-item-left">
              <span className="nav-icon"><BarChart3 size={18} /></span>
              <span>Reports</span>
            </div>
            {reportsOpen ? (
              <ChevronDown size={16} className="chevron-icon" />
            ) : (
              <ChevronRight size={16} className="chevron-icon" />
            )}
          </div>

          {/* Reports Submenus */}
          {reportsOpen && (
            <div className="sub-nav-container">
              <div 
                className={`sub-nav-item ${activeMenu === 'Batch Report' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Batch Report')}
              >
                <span className="nav-icon"><Users size={16} /></span>
                <span>Batch Report</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Overall Report' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Overall Report')}
              >
                <span className="nav-icon"><ClipboardList size={16} /></span>
                <span>Overall Report</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Monthly Report' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Monthly Report')}
              >
                <span className="nav-icon"><Calendar size={16} /></span>
                <span>Monthly Report</span>
              </div>

              <div 
                className={`sub-nav-item ${activeMenu === 'Consolidated Report' ? 'active' : ''}`}
                onClick={() => setActiveMenu('Consolidated Report')}
              >
                <span className="nav-icon"><Layers size={16} /></span>
                <span>Consolidated Report</span>
              </div>
            </div>
          )}
        </nav>
      </aside>

      {/* Main Wrapper */}
      <div className="main-wrapper">
        {/* Top Header Bar */}
        <header className="top-header">
          <div className="top-header-left">
            <button 
              className="menu-toggle-btn" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation menu"
            >
              <Menu size={20} />
            </button>
            <span className="top-breadcrumb">Home</span>
          </div>

          <div className="top-company-title">
            Eazyworld EHS Engineering Private Ltd
          </div>

          <div className="top-header-right">
            <div 
              className="user-pill" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="user-avatar">{userInitials}</div>
              <span className="user-name">{uppercaseName}</span>
              <ChevronDown size={16} className="dropdown-arrow" />
            </div>

            {dropdownOpen && (
              <div className="user-dropdown-menu">
                <button 
                  className="dropdown-item" 
                  onClick={onLogout}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        {activeMenu === 'User Management' ? (
          <UserManagement />
        ) : activeMenu === 'Training Title' ? (
          <TrainingTitle />
        ) : activeMenu === 'Batch No' ? (
          <BatchNo />
        ) : activeMenu === 'Organization Details' ? (
          <OrganizationDetails />
        ) : activeMenu === 'Company Info' ? (
          <CompanyInfo />
        ) : activeMenu === 'Trainers Name' ? (
          <TrainerName />
        ) : activeMenu === 'Work Location' ? (
          <WorkLocation />
        ) : activeMenu === 'Project Name' ? (
          <ProjectName />
        ) : activeMenu === 'Driving License' ? (
          <DrivingLicense />
        ) : activeMenu === 'Registration List' ? (
          <CandidateRegistration />
        ) : activeMenu === 'Pre Evaluation Test' ? (
          <PreEvaluationTest />
        ) : activeMenu === 'Post Evaluation Test' ? (
          <PostEvaluationTest />
        ) : activeMenu === 'Participant Feedback' ? (
          <ParticipantFeedback />
        ) : activeMenu === 'Personal Evaluations' ? (
          <PersonalEvaluations />
        ) : activeMenu === 'Evaluation Form' ? (
          <EvaluationForm />
        ) : activeMenu === 'View Evaluation' ? (
          <ViewEvaluation />
        ) : activeMenu === 'Certificate Print' ? (
          <CertificatePrint />
        ) : activeMenu === 'Renewal' ? (
          <Renewal />
        ) : activeMenu === 'Attendance Sheet' ? (
          <AttendanceSheet />
        ) : activeMenu === 'Batch Report' ? (
          <BatchReport />
        ) : activeMenu === 'Overall Report' ? (
          <OverallReport />
        ) : activeMenu === 'Monthly Report' ? (
          <MonthlyReport />
        ) : activeMenu === 'Consolidated Report' ? (
          <ConsolidatedReport />
        ) : (
          <main className="dashboard-content">
            {/* Welcome Banner */}
            <div className="welcome-banner">
              <h2 className="welcome-title">Welcome to</h2>
              <h1 className="welcome-company">
                Eazyworld EHS Engineering Private Limited
              </h1>
              <p className="welcome-tagline">
                Excellence in Engineering &bull; Safety &bull; Sustainability
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="metrics-grid">
              {/* Visitors Card */}
              <div className="metric-card">
                <div className="metric-icon-box purple">
                  <Users size={22} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">VISITORS</span>
                  <h3 className="metric-value">1,294</h3>
                </div>
              </div>

              {/* Clients Card */}
              <div className="metric-card">
                <div className="metric-icon-box green">
                  <Handshake size={22} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">CLIENTS</span>
                  <h3 className="metric-value">56</h3>
                </div>
              </div>

              {/* Projects Card */}
              <div className="metric-card">
                <div className="metric-icon-box amber">
                  <Share2 size={22} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">PROJECTS</span>
                  <h3 className="metric-value">24</h3>
                </div>
              </div>

              {/* Certifications Card */}
              <div className="metric-card">
                <div className="metric-icon-box pink">
                  <Award size={22} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">CERTIFICATIONS</span>
                  <h3 className="metric-value">12</h3>
                </div>
              </div>
            </div>

            {/* Mission Quote Card */}
            <div className="quote-card">
              <h3 className="quote-main">
                Empowering industries with innovative EHS (Environment, Health, Safety) solutions.
              </h3>
              <p className="quote-sub">
                Your safety is our priority &bull; Engineering with precision &bull; Building a sustainable future
              </p>
            </div>
          </main>
        )}

        {/* Dashboard Footer */}
        <footer className="dashboard-footer">
          <div>
            &copy; 2024-2025 <span className="footer-brand">V4SUREITSOLUTIONS</span>. All rights reserved.
          </div>
          <div className="footer-version">Version 3.0.1</div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
