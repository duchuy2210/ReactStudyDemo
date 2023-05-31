import React, { useEffect, useRef, useState } from 'react';

const StopWatch = () => {
  const timerRef = useRef(null);
  const [count, setCount] = useState(0);
  const handleStart = () => {
    timerRef.current = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  };
  const handleStop = () => {
    clearInterval(timerRef.current);
  };
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);
  return (
    <div className="App">
      <h3>Timer:{count}(s)</h3>
      <div>
        <button onClick={() => handleStart()}>Start</button>
        <button onClick={() => handleStop()}>Stop</button>
      </div>
    </div>
  );
};

export default StopWatch;