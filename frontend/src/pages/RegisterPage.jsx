// src/pages/RegisterPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
        {/* Register form will go here */}
        <p className="text-center text-gray-600 mt-4">Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login here</Link></p>
      </div>
    </div>
  );
}
export default RegisterPage;