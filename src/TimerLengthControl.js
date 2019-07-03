import React from "react";

export const TimerLengthControl = ({ title, brkLength, onClick }) => {
  return (
    <div>
      <h4>{title}</h4>
      <button onClick={onClick} value="+">
        Up
      </button>
      <h2>{brkLength}</h2>
      <button onClick={onClick} value="-">
        Down
      </button>
    </div>
  );
};
