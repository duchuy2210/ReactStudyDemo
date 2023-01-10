import React from 'react';

const Cell = ({value,onClick}) => {
  return (
    <div className={`cell-game ${value==="X"?"isX":value==="O"?"isO":""}`} onClick={onClick}>
      {value}
    </div>
  );
};

export default Cell;