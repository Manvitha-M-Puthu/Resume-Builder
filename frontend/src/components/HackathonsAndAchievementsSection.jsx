// src/components/HackathonsAndAchievementsSection.jsx
import React from 'react';

function HackathonsAndAchievementsSection({ hackathonsAndAchievements, onHackathonsChange, onAddHackathon, onRemoveHackathon }) {
  const handleHackathonChange = (index, e) => {
    const { name, value } = e.target;
    const newHackathons = [...hackathonsAndAchievements];
    newHackathons[index] = { ...newHackathons[index], [name]: value };
    onHackathonsChange(newHackathons);
  };

  return (
    <section id="hackathons" className="bg-white p-6 rounded-lg shadow-md scroll-mt-20">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Hackathons & Achievements</h2>
      {hackathonsAndAchievements.map((item, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md relative">
          <h3 className="text-xl font-medium text-gray-800 mb-3">Entry {index + 1}</h3>
          <div className="mb-4">
            <label htmlFor={`hackathon-name-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Name/Event
            </label>
            <input
              type="text"
              id={`hackathon-name-${index}`}
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={item.name}
              onChange={(e) => handleHackathonChange(index, e)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`hackathon-details-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Details/Description
            </label>
            <textarea
              id={`hackathon-details-${index}`}
              name="details"
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={item.details}
              onChange={(e) => handleHackathonChange(index, e)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor={`hackathon-achievement-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Achievement (Optional)
            </label>
            <input
              type="text"
              id={`hackathon-achievement-${index}`}
              name="achievement"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={item.achievement}
              onChange={(e) => handleHackathonChange(index, e)}
              placeholder="e.g., Secured 3rd place, Recognized for innovation"
            />
          </div>
          {hackathonsAndAchievements.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveHackathon(index)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs"
              title="Remove Entry"
            >
              &#x2715;
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAddHackathon}
        className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Hackathon/Achievement
      </button>
    </section>
  );
}

export default HackathonsAndAchievementsSection;