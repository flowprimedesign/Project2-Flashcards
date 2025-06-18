// import { useState } from "react";

const Card = ({ front, color, image, back, flipped, setFlipped }) => {
  // const [flipped, setFlipped] = useState(false);

  return (
    <div className="Card" onClick={() => setFlipped(!flipped)}>
      <div className={`CardContent${flipped ? " flipped" : ""}`}>
        <div className="CardFront" style={{ backgroundColor: color || "#fff" }}>
          {image && (
            <img className="imgContainer" src={image} alt="Card visual" />
          )}
          <span className="frontText">{front}</span>
        </div>
        <div className="CardBack" style={{ backgroundColor: color || "#fff" }}>
          {back}
        </div>
      </div>
    </div>
  );
};

export default Card;
