import Card from "./Card";

const Deck = ({ card, current, total, flipped, setFlipped }) => {
  return (
    <div className="Deck">
      <Card
        front={card.front}
        back={card.back}
        color={card.color}
        image={card.image}
        flipped={flipped}
        setFlipped={setFlipped}
      />
      <div className="CardInfo">
        <p>
          Card {current + 1} of {total}
        </p>
      </div>
    </div>
  );
};
export default Deck;
