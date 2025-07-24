
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage'; 
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Simple Navigation Header */}
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-indigo-600">Resume AI</Link>
          <div>
            <Link to="/login" className="mr-4 text-gray-700 hover:text-indigo-600">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-indigo-600">Register</Link>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Protected Route for the Resume Builder */}
            <Route path="/build" element={
              <PrivateRoute>
                <ResumeBuilderPage />
              </PrivateRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;