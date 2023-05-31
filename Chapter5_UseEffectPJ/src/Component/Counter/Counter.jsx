import React, { useEffect, useState } from 'react';

const Counter = () => {
  const [state, setState] = useState(0);
  const handleState = () => {
    setState(state => state + 1);
  };
  // useEffect(()=>{
  //   console.log("Đó vô rồi đó");
  // },[state])
  const handleReset = () => {
    setTimeout(() => {
      setState(0);
    }, 100);
  };
  const [info, setInfo] = useState({
    name: 'Huy',
    age: 22,
  });
  useEffect(() => {
    console.log(info.name);
  }, [info.name]);
  return (
    <div>
      <input
        type="text"
        name="firstName"
        value={info.name}
        onChange={e => setInfo({ ...info, name: e.target.value })}
      />
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
