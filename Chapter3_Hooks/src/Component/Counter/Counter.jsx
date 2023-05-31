import React, { useState } from 'react';

const Counter = () => {
  const [state, setState] = useState(0);
  const handleState = () => {
    setTimeout(() => {
      setState(state => state + 1);
    }, 1000);
  };
  const handleReset = () => {
    setTimeout(() => {
      setState(0);
    }, 100);
  };
  return (
    <div>
      <button
        style={{
          padding: '20px 36px',
          backgroundColor: 'purple',
          color: '#fff',
          border: 'none',
          borderRadius: '100rem',
          position: 'absolute',
          top: '200px',
          right: '800px',
        }}
        onClick={() => handleState()}>
        Increment
      </button>
      <button
        style={{
          padding: '20px 36px',
          backgroundColor: 'purple',
          color: '#fff',
          border: 'none',
          borderRadius: '100rem',
          position: 'absolute',
          top: '200px',
          right: '630px',
        }}
        onClick={() => handleReset()}>
        Reset
      </button>
      <div
        style={{
          position: 'absolute',
          top: '207px',
          right: '760px',
          fontSize: '30px',
        }}>
        {state}
      </div>
    </div>
  );
};

export default Counter;
