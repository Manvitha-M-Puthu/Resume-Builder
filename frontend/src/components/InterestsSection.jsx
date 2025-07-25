// src/components/InterestsSection.jsx
import React from 'react';

function InterestsSection({ interests, onInterestsChange }) {
  const handleInterestChange = (index, e) => {
    const newInterests = [...interests];
    newInterests[index] = e.target.value;
    onInterestsChange(newInterests);
  };

  const addInterest = () => {
    onInterestsChange([...interests, '']);
  };

  const removeInterest = (index) => {
    const newInterests = interests.filter((_, i) => i !== index);
    onInterestsChange(newInterests);
  };

  return (
    <section id="interests" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Interests</h2>
      {interests.map((interest, index) => (
        <div key={index} className="flex items-center mb-3">
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
            value={interest}
            onChange={(e) => handleInterestChange(index, e)}
            placeholder="e.g., Carnatic Music, Financial Literacy"
            required
          />
          {interests.length > 0 && ( // Allow removing if there's at least one
            <button
              type="button"
              onClick={() => removeInterest(index)}
              className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs flex-shrink-0"
              title="Remove Interest"
            >
              &#x2715;
            </button>
          )}
        </div>
      ))}
    </section>
  );
}

export default InterestsSection;