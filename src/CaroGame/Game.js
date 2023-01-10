import React, { useState } from 'react';
import Board from './Board';
import './Game.scss';
import { checkWinner } from '../helpers/checkWinner';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = checkWinner(board);
  const handleClick = index => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return;
    boardCopy[index] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };
  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };
  
  console.log(winner);
  return (
    <div>
      <Board cells={board} onClick={handleClick}></Board>
      <button
        className="reset-game"
        onClick={() => {
          handleReset();
        }}>
        RESET
      </button>
  <h1 className="message">{winner ? winner : ''}</h1>
    </div>
  );
};

export default Game;
