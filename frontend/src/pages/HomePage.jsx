// src/pages/HomePage.jsx
import React from 'react';
import './styles/HomePage.css'; 

function HomePage() {
  return (
    <div className="homepage-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Craft Your Perfect, 
              <span className="highlight"> ATS-Friendly</span> Resume
            </h1>
            <p className="hero-subtitle">
              Build a professional resume with the power of AI assistance. 
              Stand out from the crowd and land your dream job.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary pulse-animation">
                Get Started Free
              </button>
              <button className="btn btn-secondary">
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-cards">
              <div className="card card-1">📄 Professional Templates</div>
              <div className="card card-2">🤖 AI-Powered Content</div>
              <div className="card card-3">✅ ATS Optimized</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="auth-section">
        <div className="auth-container">
          <h2 className="auth-title">Ready to Build Your Future?</h2>
          <p className="auth-subtitle">Join thousands of professionals who've landed their dream jobs</p>
          <div className="auth-buttons">
            <a href="/login" className="btn btn-login slide-in-left">
              Login
            </a>
            <a href="/register" className="btn btn-register slide-in-right">
              Register to Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
