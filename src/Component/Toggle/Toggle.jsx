import React, { useState } from 'react';
import './Toggle.scss';
const Toggle = () => {
  const [on, setOn] = useState(false);
  const handleOnOff = () => {
    /* return on ? setOn(false) : setOn(true); */
    setOn(on=>!on);
  };
  return (
    <div className={`container ${on?"active":""}`}>
      <div className={`toggle ${on?"active":""}`} onClick={() => handleOnOff()}>
        <div className={`circle ${on?"active":""}`}></div>
      </div>
    </div>
  );
};

export default Toggle;
