import "./App.css";
import { cardList } from "./data.js";
import { useState } from "react";
import Deck from "./components/Deck";

const App = () => {
  const cards = cardList;
  const [cardsList] = useState(cards);
  const [currentCard, setCurrentCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

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
        setUserAnswer("");
        setFeedback("");
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
        setUserAnswer("");
        setFeedback("");
      }, 600);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const answer = userAnswer.trim().toLowerCase();
    const correct = cardsList[currentCard].back.trim().toLowerCase();

    // Accept if user answer is a substring of correct answer or vice versa
    if (
      answer.length > 0 &&
      (correct.includes(answer) || answer.includes(correct))
    ) {
      const newStreak = streak + 1;
      setFeedback("✅ Correct!");
      setStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
      // Move to next card after a short delay
      setTimeout(() => {
        setFeedback("");
        setUserAnswer("");
        setFlipped(false);
        if (currentCard < cardsList.length - 1) {
          setCurrentCard(currentCard + 1);
        }
      }, 1000);
    } else {
      setFeedback("❌ Try again!");
      setStreak(0);
    }
  }

  function handleRandomClick() {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * cardsList.length);
    } while (randomIndex === currentCard && cardsList.length > 1);

    setFlipped(false);
    setUserAnswer("");
    setFeedback("");
    setCurrentCard(randomIndex);
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
      <div style={{ margin: "10px 0", fontWeight: "bold" }}>
        Correct Streak: {streak} &nbsp;|&nbsp; Longest Streak: {longestStreak}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="userAnswer"
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer"
          style={{ padding: "8px", fontSize: "1rem" }}
        />
        <button
          className="answerButton"
          type="submit"
          style={{ marginLeft: "10px", padding: "8px 16px" }}
        >
          Submit
        </button>
        {feedback && <span style={{ marginLeft: "16px" }}>{feedback}</span>}
      </form>

      <div className="ButtonContainer">
        <button
          onClick={handlePrevClick}
          className="prevButton"
          disabled={currentCard === 0}
        >
          Previous
        </button>
        <button onClick={handleRandomClick} className="randomButton">
          Random
        </button>
        <button
          onClick={handleNextClick}
          className="nextButton"
          disabled={currentCard === cardsList.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
