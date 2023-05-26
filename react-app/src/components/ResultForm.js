import React, { useState } from 'react';
import './ResultForm.css';

function ResultForm({ score }) {
  const [initials, setInitials] = useState('');

  const handleInputChange = (event) => {
    setInitials(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Initials: ${initials}, Score: ${score}`);
  };

  return (
    <div className="result-form">
      <h2>Quiz Over!</h2>
      <p>Your Score: {score}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your initials"
          value={initials}
          onChange={handleInputChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ResultForm;

