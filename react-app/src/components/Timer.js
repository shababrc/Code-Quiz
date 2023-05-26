import React, { useState, useEffect } from 'react';

const Timer = ({ time, onTimeExpired }) => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      onTimeExpired();
    }
  }, [seconds, onTimeExpired]);

  return <div className="timer">Time Left: {seconds} seconds</div>;
};

export default Timer;
