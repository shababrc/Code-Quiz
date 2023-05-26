import React, { useEffect, useState } from 'react';

function Timer({ isQuizOver }) {
  const [time, setTime] = useState(60);

  useEffect(() => {
    let timer = null;

    if (!isQuizOver && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isQuizOver, time]);

  return (
    <div className="timer">
      <p>Time: {time}</p>
    </div>
  );
}

export default Timer;


