
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../pages/styles/Navbar.css'; 

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  const isHomePage = location.pathname === '/';
  const isResumeBuilder = location.pathname === '/build';

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDownloadPDF = () => {
    const event = new CustomEvent('downloadResume');
    window.dispatchEvent(event);
  };

  const handleSaveResume = () => {
    const event = new CustomEvent('saveResume');
    window.dispatchEvent(event);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">📄</span>
            <span className="brand-text">Resume AI</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="navbar-nav">
          {!isAuthenticated ? (
            // Show Login/Register when not authenticated
            <div className="nav-items">
              <Link to="/login" className="nav-link">
                <span className="nav-icon">🔑</span>
                Login
              </Link>
              <Link to="/register" className="nav-link nav-link-primary">
                <span className="nav-icon">👤</span>
                Register
              </Link>
            </div>
          ) : (
            // Show authenticated user options
            <div className="nav-items">
              {!isResumeBuilder && (
                <Link to="/build" className="nav-link">
                  <span className="nav-icon">✏️</span>
                  Build Resume
                </Link>
              )}
              
              {isResumeBuilder && (
                <>
                  <button 
                    onClick={handleDownloadPDF}
                    className="nav-button nav-button-secondary"
                  >
                    <span className="nav-icon">📥</span>
                    Download PDF
                  </button>
                  <button 
                    onClick={handleSaveResume}
                    className="nav-button nav-button-primary"
                  >
                    <span className="nav-icon">💾</span>
                    Save Resume
                  </button>
                </>
              )}
              
              <button 
                onClick={handleLogout}
                className="nav-button nav-button-outline"
              >
                <span className="nav-icon">🚪</span>
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle (for responsive design) */}
        <div className="mobile-menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
