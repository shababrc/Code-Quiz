import React, { useState } from 'react';
import Question from './Question';
import Timer from './Timer';
import ResultForm from './ResultForm';
import { questions } from '../utils/questions';
import './QuizContainer.css';

function QuizContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);

  // Function to handle user answer submission
  const handleAnswerSubmit = (answer) => {
    // Check if the answer is correct
    if (answer === questions[currentQuestionIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    // Check if it's the last question
    if (currentQuestionIndex === questions.length - 1) {
      setIsQuizOver(true);
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="quiz-container">
      <h1>Code Quiz</h1>
      {!isQuizOver ? (
        <div>
          <Timer isQuizOver={isQuizOver} />
          <Question
            question={questions[currentQuestionIndex]}
            handleAnswerSubmit={handleAnswerSubmit}
          />
        </div>
      ) : (
        <ResultForm score={score} />
      )}
    </div>
  );
}

export default QuizContainer;

