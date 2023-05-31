import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByValue } from '../redux-toolkit/counterSlice';
// import { decrement, increment, incrementByValue } from '../redux/counter';

const Counter = () => {
  //LẤY RA GIÁ TRỊ COUNT
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  //THỰC HIỆN GỌI ACTION
  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleDecrement = () => {
    dispatch(decrement());
  };
  const handleIncrementTen =()=>{
    dispatch(incrementByValue(10));
  }
  return (
    <div className="flex flex-col items-center p-5 ">
      <h1 className="mb-5">Count: {count}</h1>
      <div className="flex justify-center items-center gap-x-5">
        <button
          className="p-2 border border-gray-400"
          onClick={handleIncrement}>
          Increase
        </button>
        <button
          className="p-2 border border-gray-400"
          onClick={handleDecrement}>
          Decrease
        </button>
        <button
          className="p-2 border border-gray-400"
          onClick={handleIncrementTen}>
          +10
        </button>
      </div>
    </div>
  );
};

export default Counter;
