import React, { useState } from "react";

interface Bet {
  type: string;
  amount: number;
  number?: number;
}

const RouletteGame: React.FC = () => {
  const [bet, setBet] = useState<Bet>({ type: "", amount: 0 });
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<string>("");

  const spinWheel = () => {
    const randomNumber = Math.floor(Math.random() * 37); // Numbers 0-36
    
    setWinningNumber(randomNumber);
    const color = getColor(randomNumber);

    let isWin = false;
    if (bet.type === "red" && color === "Red") isWin = true;
    if (bet.type === "black" && color === "Black") isWin = true;
    if (bet.type === "even" && randomNumber % 2 === 0 && randomNumber !== 0) isWin = true;
    if (bet.type === "odd" && randomNumber % 2 !== 0) isWin = true;
    if (bet.type === "number" && bet.number === randomNumber) isWin = true;

    setOutcome(
      isWin
        ? `You win! Your payout is $${bet.amount * (bet.type === "number" ? 35 : 2)}`
        : "You lose! Better luck next time."
    );
  };

  const getColor = (number: number): string => {
    if (number === 0) return "Green";
    return number % 2 === 0 ? "Black" : "Red";
  };

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBet((prev) => ({
      ...prev,
      [name]: name === "amount" || name === "number" ? parseInt(value) : value,
    }));
  };

  return (
    <div id="roulette-container">
      <h1>European Roulette</h1>
      <div id="wheel-section">
        <div id="roulette-wheel"></div>
        <button id="spin-button" onClick={spinWheel}>
          Spin the Wheel
        </button>
      </div>
      <div id="betting-area">
        <h2>Place Your Bets</h2>
        <div className="bet-options">
          <label>
            <input type="radio" name="type" value="red" onChange={handleBetChange} /> Red
          </label>
          <label>
            <input type="radio" name="type" value="black" onChange={handleBetChange} /> Black
          </label>
          <label>
            <input type="radio" name="type" value="even" onChange={handleBetChange} /> Even
          </label>
          <label>
            <input type="radio" name="type" value="odd" onChange={handleBetChange} /> Odd
          </label>
          <label>
            <input type="radio" name="type" value="number" onChange={handleBetChange} /> Number:
            <input
              type="number"
              name="number"
              min="0"
              max="36"
              onChange={handleBetChange}
              disabled={bet.type !== "number"}
            />
          </label>
        </div>
        <div className="bet-amount">
          <label>
            Bet Amount:
            <input
              type="number"
              name="amount"
              placeholder="Enter your bet"
              onChange={handleBetChange}
            />
          </label>
        </div>
      </div>
      <div id="result">
        <h2>Results</h2>
        {winningNumber !== null && <p>The wheel landed on {winningNumber}</p>}
        <p>{outcome}</p>
      </div>
    </div>
  );
};

export default RouletteGame;
