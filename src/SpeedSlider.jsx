import React from 'react';

const SpeedSlider = ({ speed, onSpeedChange, isVisualizing }) => {
  const handleSpeedChange = (e) => onSpeedChange(parseInt(e.target.value));
  return (
    <div className="speed-slider">
      <label>Speed: {speed} x</label>
      <input
        type="range"
        min="1"
        max="10"
        step="1"
        value={speed}
        onChange={handleSpeedChange}
        disabled={isVisualizing}
      />
    </div>
  );
};

export default SpeedSlider;
