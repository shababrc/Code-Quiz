import React, { useState } from 'react';
import Question from './components/Question';
import Result from './components/Result';
import Timer from './components/Timer';
import questions from './data/questions';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Function to handle the user's answer to a question
  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].answer) {
      // Increase the score if the answer is correct
      setScore(score + 1);
    }

    // Move to the next question or show the result if all questions have been answered
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  // Function to restart the quiz
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  // Function to handle when the time expires
  const handleTimeExpired = () => {
    setShowResult(true);
  };

  return (
    <div className="app">
      <h1>Code Quiz</h1>
      {!showResult && <Timer time={60} onTimeExpired={handleTimeExpired} />}
      {!showResult ? (
        <Question
          question={questions[currentQuestion]}
          handleAnswer={handleAnswer}
        />
      ) : (
        <Result score={score} totalQuestions={questions.length} restartQuiz={restartQuiz} />
      )}
    </div>
  );
};

export default App;
