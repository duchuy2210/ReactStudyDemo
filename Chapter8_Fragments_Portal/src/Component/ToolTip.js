import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import UseHover from '../Hooks/UseHover';
const ToolTip = props => {
  const { hovered, nodeRef } = UseHover();
  const [coords, setCoords] = useState({});
  const handleHover = e => {
    setCoords(e.target.getBoundingClientRect());
  };
  return (
    <>
      {hovered && (
        <ToolTipContent coords={coords}>{props.children}</ToolTipContent>
      )}
        <span
          className="text-2xl font-bold"
          ref={nodeRef}
          onMouseOver={handleHover}>
          Hover Me
        </span>
    </>
  );
};
const ToolTipContent = props => {
  console.log(props.coords.top);
  if (typeof document == 'undefined') return <div className="modal"></div>;
  return ReactDOM.createPortal(
    <div
      className="p-5 text-white bg-black w-[250px] rounded-xl absolute"
      style={{
        left: props.coords.top,
        right: props.coords.right,
      }}>
      {props.children}
    </div>,
    document.querySelector('body')
  );
};

export default ToolTip;
