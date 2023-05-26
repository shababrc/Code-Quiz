import React, { useState } from 'react';
import './Question.css';

function Question({ question, handleAnswerSubmit }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  // Function to handle user answer selection
  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
  };

  // Function to handle answer submission
  const handleSubmit = (event) => {
    event.preventDefault();
    handleAnswerSubmit(selectedAnswer);
    setSelectedAnswer('');
  };

  return (
    <div className="question-container">
      <h2>{question.title}</h2>
      <form onSubmit={handleSubmit}>
        {question.multiChoice.map((choice, index) => (
          <div key={index} className="choice-container">
            <input
              type="radio"
              id={`choice${index}`}
              name="answer"
              value={choice}
              checked={selectedAnswer === choice}
              onChange={handleAnswerSelect}
            />
            <label htmlFor={`choice${index}`}>{choice}</label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Question;
