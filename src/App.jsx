import React, { useState } from 'react';
import Board from './Board';
import Controls from './Controls';
import SpeedSlider from './SpeedSlider';
import { solveNQueens } from './solver';
import './styles.css';

function App() {
  const [boardSize, setBoardSize] = useState(8);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [speed, setSpeed] = useState(5);
  const [iterations, setIterations] = useState([]);
  const [finalSolution, setFinalSolution] = useState([]);
  const [reset, setReset] = useState(false);

  const handleBoardSizeChange = (size) => {
    if (!isVisualizing){
        setBoardSize(size);
        setIterations([]);
        setFinalSolution([]);
        setReset(true);
    }
  };

  const handleSpeedChange = (value) => setSpeed(value);

  const handleStartVisualization = async () => {
    setIsVisualizing(true);
    setReset(false);
    const { iterations, finalSolution } = await solveNQueens(boardSize);
    setIterations(iterations);
    setFinalSolution(finalSolution);
  };

  const handleReset = () => {
    setIsVisualizing(false);
    setIterations([]);
    setFinalSolution([]);
    setReset(true);
  };

  const handleVisualizationComplete = () => {
    setIsVisualizing(false);
  };

  return (
    <div className="app">
      <h1>N-Queens Visualizer</h1>
      <div className="controls-container">
        <Controls
          boardSize={boardSize}
          onBoardSizeChange={handleBoardSizeChange}
          onStartVisualization={handleStartVisualization}
          isVisualizing={isVisualizing}
        />
        <SpeedSlider speed={speed} onSpeedChange={handleSpeedChange} isVisualizing={isVisualizing} />
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <Board
        boardSize={boardSize}
        speed={speed}
        iterations={iterations}
        finalSolution={finalSolution}
        onComplete={handleVisualizationComplete}
        reset={reset}
      />
    </div>
  );
}

export default App;
