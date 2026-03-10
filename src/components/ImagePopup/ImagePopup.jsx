import React from "react";

function ImagePopup({ card }) {

  if (!card) return null;

  return (
    <div className="popup__container-image">
      <img 
        className="popup__image" 
        src={card.link} 
        alt={card.name} 
      />
      <p className="popup__caption">{card.name}</p>
    </div>
  );
}

export default ImagePopup;
