import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [message,setMassage] = useState("DucHuy")
  useEffect(()=>{
    const timer = setInterval(()=>{
      console.log(message)
    },2000)
    return () => {
      clearInterval(timer);
    }
  },[message])
  return (
    <div>
      <input type="text" value={message} onChange={(e)=>setMassage(e.target.value)} />
    </div>
  );
};

export default Timer;