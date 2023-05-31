import React, { useEffect } from 'react';
import { ICard } from '../utils/inteface';

const Card = (card:ICard) => {
  useEffect(() => {
    const input = document.querySelector("input") as HTMLInputElement;
    console.log(input.value);
  }, []);
  return (
    <div>
      
    </div>
  );
};

export default Card;