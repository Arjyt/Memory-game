import { useEffect, useState } from 'react';
import Confetti from 'react-confetti'
import './App.css';


function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  const emojis = ["❤️", "🎁", "⚽", "🚒", "🐻", "🎲"];

  useEffect(() => {
    gameStart();
  }, []);

  function gameStart() {
    const shuffledCards = shuffleArray([...emojis, ...emojis]);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  }

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleFlip = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (array) => {
    const [index1, index2] = array;
    if (cards[index1] === cards[index2]) {
      setMatchedCards([...matchedCards, index1, index2]);
    }

    setTimeout(() => {
      setFlippedCards([]);
    }, 800);

   
  };
  const isGameWon = matchedCards.length === cards.length;



  return (
    <div className="main">
      <h1>Memory Game</h1>
      <p>Moves: {moves}</p>
      {isGameWon ? (
        <div>
          <h2>You Win! </h2>
          <Confetti  width="1500px" height="1000px"/>
          <button onClick={gameStart} style={{backgroundColor:"red", color:"white"}}>Restart Game</button>
        </div>
      ) : (
        <div className="container">
          {cards.map((emoji, index) => (
            <div 
              className={`flip-card ${flippedCards.includes(index) || matchedCards.includes(index) ? "flipped" : ""}`} 
              key={index} 
              onClick={() => handleFlip(index)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  {/* Front side content */}
                </div>
                <div className="flip-card-back">
                  <h1>{emoji}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
