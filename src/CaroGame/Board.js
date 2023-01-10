import React from 'react';
import Cell from './Cell';

const Board = props => {
  return (
    <div className="board-game">
      {props.cells.map((item, index) => {
        return (
          <Cell
            key={index}
            value={item}
            onClick={() => props.onClick(index)}></Cell>
        );
      })}
    </div>
  );
};

export default Board;
