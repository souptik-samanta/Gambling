// App.tsx
import React, { useState } from 'react';

const App: React.FC = () => {
    const [balance, setBalance] = useState<number>(100);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [bulletPosition, setBulletPosition] = useState<number>(Math.floor(Math.random() * 6));
    const [rounds, setRounds] = useState<number>(0);

    const handlePlay = (amount: number) => {
        if (amount > balance) {
            alert('Insufficient funds!');
            return;
        }

        setIsPlaying(true);
        setRounds(rounds + 1);
        setTimeout(() => {
            if (Math.floor(Math.random() * 6) === bulletPosition) {
                setBalance(balance - amount);
                alert(`Bang! You lost $${amount}.`);
            } else {
                setBalance(balance + amount);
                alert(`Click! You won $${amount}.`);
            }
            setIsPlaying(false);
        }, 2000);
    };

    return (
        <div className="container">
            <div className="header">Russian Roulette Parody</div>
            <div className="content">
                <p>Your Balance: ${balance}</p>
                <img src="roulette.jpg" alt="Russian Roulette" className="responsive-image" />
                <input type="number" placeholder="Bet Amount" />
                <button className="button" onClick={() => handlePlay(10)}>Play $10</button>
                <button className="button" onClick={() => handlePlay(50)}>Play $50</button>
                <button className="button" onClick={() => handlePlay(100)}>Play $100</button>
                {isPlaying && <p>Spinning...</p>}
                <p>Rounds Played: {rounds}</p>
            </div>
        </div>
    );
};

export default App;