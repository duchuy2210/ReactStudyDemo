import React, { createContext, useContext, useState } from 'react';

const CountContext = createContext();
function CountProvider(props) {
  const [count, setCount] = useState(0);
  const value = [count, setCount];
  return (
    <CountContext.Provider value={value} {...props}></CountContext.Provider>
    );
  }
  
  function useCount() {
    const context = useContext(CountContext);
    if(context===undefined){
      throw new Error("useCount must be used within CountProvider");
    }
    return context;
  }
  
  function CountDisplay() {
    const [count, setCount] = useCount();
    return <div>The count is: {count}</div>;
  }
function Counter() {
  const [count, setCount] = useCount();
  const increment = () => setCount(count => count + 1);
  return (
    <button
      className="p-5 bg-purple-500 text-white rounded-xl"
      onClick={increment}>
      Increment count
    </button>
  );
}
const DemoContext = () => {
  return (
    <div className="flex p-5 items-center justify-center gap-x-5">
      <CountProvider>
        <CountDisplay></CountDisplay>
        <Counter></Counter>
      </CountProvider>
    </div>
  );
};

export default DemoContext;
