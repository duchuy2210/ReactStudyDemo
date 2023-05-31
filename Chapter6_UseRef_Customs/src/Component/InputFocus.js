import React, { useEffect, useRef } from 'react';

const InputFocus = () => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <div>
      <input
        type="text"
        placeholder="Input auto focus..."
        ref={inputRef}
        className="inline-block p-5 mt-5 ml-5 border-2 border-gray-500 rounded-lg outline-none focus:border-blue-600"
      />
    </div>
  );
};

export default InputFocus;
