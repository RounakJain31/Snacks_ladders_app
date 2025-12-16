import { useState } from "react";
import "./App.css";

const SNAKES = {
  16: 6,
  47: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78,
};

const LADDERS = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100,
};

export default function App() {
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(0);
  const [turn, setTurn] = useState(1);
  const [dice, setDice] = useState(null);
  const [winner, setWinner] = useState(null);

  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  const movePlayer = (pos, value) => {
    let next = pos + value;
    if (next > 100) return pos;
    if (LADDERS[next]) return LADDERS[next];
    if (SNAKES[next]) return SNAKES[next];
    return next;
  };

  const handleRoll = () => {
    if (winner) return;

    const value = rollDice();
    setDice(value);

    if (turn === 1) {
      const newPos = movePlayer(player1, value);
      setPlayer1(newPos);
      if (newPos === 100) setWinner("Player 1 Wins!");
    } else {
      const newPos = movePlayer(player2, value);
      setPlayer2(newPos);
      if (newPos === 100) setWinner("Player 2 Wins!");
    }

    setTurn(turn === 1 ? 2 : 1);
  };

  const resetGame = () => {
    setPlayer1(0);
    setPlayer2(0);
    setTurn(1);
    setDice(null);
    setWinner(null);
  };

  const renderBoard = () => {
    const cells = [];

    for (let row = 9; row >= 0; row--) {
      const base = row * 10;
      let numbers = Array.from({ length: 10 }, (_, i) => base + i + 1);
      if (row % 2 === 1) numbers.reverse();

      numbers.forEach((num) => {
        cells.push(
          <div key={num} className="cell">
            <span className="number">{num}</span>
            {player1 === num && <div className="token p1">P1</div>}
            {player2 === num && <div className="token p2">P2</div>}
          </div>
        );
      });
    }
    return cells;
  };

  return (
    <div className="app">
      <h1>Snake & Ladders</h1>

      <p>P1</p>
      <p>P2</p>

      <div className="board">{renderBoard()}</div>

      <p>Player 1 Position: {player1}</p>
      <p>Player 2 Position: {player2}</p>
      <p>Current Turn: Player {turn}</p>
      {dice && <p>Dice Value: {dice}</p>}

      <div className="controls">
        <button onClick={handleRoll}>Roll Dice</button>
        <button onClick={resetGame}>Reset</button>
      </div>

      {winner && <h2>{winner}</h2>}

      <p>
        Exact 100 is required to win. Land on a ladder to climb up, a snake to
        slide down.
      </p>
    </div>
  );
}
