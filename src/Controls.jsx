import React from 'react';

const Controls = ({ boardSize, onBoardSizeChange, onStartVisualization, isVisualizing }) => {
  const handleSizeChange = (e) => onBoardSizeChange(parseInt(e.target.value));

  return (
    <div className="controls">
      <label>Board Size:</label>
      <select value={boardSize} onChange={handleSizeChange} disabled={isVisualizing}>
        {[...Array(9).keys()].map(i => (
          <option key={i + 4} value={i + 4}>
            {i + 4}
          </option>
        ))}
      </select>
      <button
        className="visualize-button"
        onClick={onStartVisualization}
        disabled={isVisualizing}
      >
        Visualize
      </button>
    </div>
  );
};

export default Controls;
