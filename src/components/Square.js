import React from 'react';

function Square({ value, onClick }) {
  return (
    <button
      className={value === 'X' ? 'square' : 'square white'}
      onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
