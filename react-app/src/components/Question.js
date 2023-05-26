import React from 'react';

const Question = ({ question, handleAnswer }) => {
  return (
    <div className="question">
      <h2>{question.title}</h2>
      <ul>
        {question.multiChoice.map((choice, index) => (
          <li key={index} onClick={() => handleAnswer(choice)}>
            {choice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;