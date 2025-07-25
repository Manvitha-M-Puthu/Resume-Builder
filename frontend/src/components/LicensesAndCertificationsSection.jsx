// src/components/LicensesAndCertificationsSection.jsx
import React from 'react';

function LicensesAndCertificationsSection({ licensesAndCertifications, onLicensesChange, onAddLicense, onRemoveLicense }) {
  const handleLicenseChange = (index, e) => {
    const { name, value } = e.target;
    const newLicenses = [...licensesAndCertifications];
    newLicenses[index] = { ...newLicenses[index], [name]: value };
    onLicensesChange(newLicenses);
  };

  return (
    <section id="certifications" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Licenses & Certifications</h2>
      {licensesAndCertifications.map((item, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md relative">
          <h3 className="text-xl font-medium text-gray-800 mb-3">Entry {index + 1}</h3>
          <div className="mb-4">
            <label htmlFor={`license-name-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Name of License/Certification
            </label>
            <input
              type="text"
              id={`license-name-${index}`}
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={item.name}
              onChange={(e) => handleLicenseChange(index, e)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`license-issuer-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Issuing Organization/Issuer
            </label>
            <input
              type="text"
              id={`license-issuer-${index}`}
              name="issuer"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={item.issuer}
              onChange={(e) => handleLicenseChange(index, e)}
              placeholder="e.g., Udemy, IEEE"
            />
          </div>
          {licensesAndCertifications.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveLicense(index)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
              title="Remove Entry"
            >
              &#x2715;
            </button>
          )}
        </div>
      ))}
    </section>
  );
}

export default LicensesAndCertificationsSection;