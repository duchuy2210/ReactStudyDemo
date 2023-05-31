import React, { useReducer/* , useState  */} from 'react';
import Board from './Board';
import './Game.scss';
import { checkWinner } from '../../helpers/checkWinner';

const initState = {
  board: Array(9).fill(null),
  xIsNext: true,
};
const gameReducer = (state, action) => {
  switch (action.type) {
    case 'CLICK':{
      const {board, xIsNext} = state;
      const {index, winner} = action.payload;
      if (winner || board[index]) return state;
      const nextState = JSON.parse(JSON.stringify(state))
      nextState.board[index] = xIsNext ? 'X' : 'O';
      nextState.xIsNext = !xIsNext;
      return nextState;
    }
    case 'RESET':{
      const nextState = JSON.parse(JSON.stringify(state))
      nextState.board = Array(9).fill(null);
      nextState.xIsNext = true;
      return nextState;
    }
      default:
        break;
      }
  };
const Game = () => {
  /* const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); */
  const [state, dispatch] = useReducer(gameReducer, initState);

  const winner = checkWinner(state.board);
  const handleClick = index => {
    /* const boardCopy = [...state.board];
    if (winner || boardCopy[index]) return;
    boardCopy[index] = state.xIsNext ? 'X' : 'O'; */
    dispatch({
      type: 'CLICK',
      payload: {
        index,
        winner
      },
    });
    /* setBoard(boardCopy);
    setXIsNext(!xIsNext); */
  };
  const handleReset = () => {
    /* setBoard(Array(9).fill(null));
    setXIsNext(true); */
    dispatch({
      type: 'RESET',
    });
  };
  return (
    <div>
      <Board cells={state.board} onClick={handleClick}></Board>
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
