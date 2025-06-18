import "./App.css";
import { cardList } from "./data.js";
import { useState } from "react";
import Deck from "./components/Deck";

const App = () => {
  const cards = cardList;
  const [cardsList] = useState(cards);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  function handleNextClick() {
    if (!flipped) {
      setFlipped(true);
    } else {
      setFlipped(false);
      setTimeout(() => {
        if (currentCard < cardsList.length - 1) {
          setCurrentCard(currentCard + 1);
        } else {
          setCurrentCard(0);
        }
      }, 600);
    }
  }

  function handlePrevClick() {
    if (!flipped) {
      setFlipped(true);
    } else {
      setFlipped(false);
      setTimeout(() => {
        if (currentCard > 0) {
          setCurrentCard(currentCard - 1);
        } else {
          setCurrentCard(cardsList.length - 1);
        }
      }, 600);
    }
  }

  return (
    <div className="App">
      <div className="Header">
        <h1 className="Title">Art Flashcards</h1>
        <h2 className="SubTitle">Guess the Famous Artist</h2>
      </div>

      <Deck
        card={cardsList[currentCard]}
        current={currentCard}
        total={cardsList.length}
        flipped={flipped}
        setFlipped={setFlipped}
      />

      <div className="ButtonContainer">
        <button onClick={handlePrevClick} className="prevButton">
          Previous
        </button>
        <button onClick={handleNextClick} className="nextButton">
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
