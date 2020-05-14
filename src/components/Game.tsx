import React from 'react';
import Board from './Board';
import calculateWinner from '../utils/calculateWinner';

interface Ihistory {
  squares: Array<null | string>;
}

function Game() {
  const [history, setHistory] = React.useState<Array<Ihistory>>([
    { squares: Array(9).fill(null) },
  ]);
  const [stepNumber, setStepNumber] = React.useState<number>(0);
  const [xIsNext, setxIsNext] = React.useState(true);
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  let status;

  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setxIsNext(step % 2 === 0);
  };

  const handleClick = (i: number) => {
    const historySlice = history.slice(0, stepNumber + 1);
    const current = historySlice[historySlice.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';

    setHistory(historySlice.concat([{ squares: squares }]));
    setStepNumber(historySlice.length);
    setxIsNext(!xIsNext);
  };

  return (
    <div className="game">
      <header className="status">{status}</header>
      <main>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: number) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </main>
    </div>
  );
}

export default Game;
