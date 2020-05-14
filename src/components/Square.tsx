import React from 'react';

type Props = {
  value: string | null;
  onClick: () => void;
};

function Square({ value, onClick }: Props) {
  return (
    <button
      className={value === 'X' ? 'square' : 'square white'}
      onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
