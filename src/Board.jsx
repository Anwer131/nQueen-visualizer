import React, { useEffect, useState } from 'react';

const Board = ({ boardSize, speed, iterations, finalSolution, onComplete, reset }) => {
  const [currentBoard, setCurrentBoard] = useState([]);

  useEffect(() => {
    if (reset) {
      setCurrentBoard(Array.from({ length: boardSize }, () => Array(boardSize).fill(false)));
      return;
    }

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < iterations.length) {
        setCurrentBoard(iterations[currentStep]);
        currentStep++;
      } else {
        setCurrentBoard(finalSolution);
        clearInterval(interval);
        onComplete();
      }
    }, 1000/speed);
    return () => clearInterval(interval);
  }, [iterations, speed, finalSolution, onComplete, reset, boardSize]);

  return (
    <div
      className="board"
      style={{
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
      }}
    >
      {Array.from({ length: boardSize * boardSize }).map((_, index) => {
        const row = Math.floor(index / boardSize);
        const col = index % boardSize;
        const isBlack = (row + col) % 2 === 0;
        const hasQueen = currentBoard[row]?.[col];

        return (
          <div
            key={index}
            className={`cell ${isBlack ? 'black' : 'white'} ${hasQueen ? 'queen' : ''}`}
          />
        );
      })}
    </div>
  );
};

export default Board;
