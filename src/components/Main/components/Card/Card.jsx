import React, { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `card_delete ${isOwn ? "" : "card_delete_hidden"}`;

  const isLiked = card.isLiked;
  const cardLikeButtonClassName = `card_like-button ${isLiked ? "card_like-button_is-active" : ""}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card_image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      />
      <div className="card_info">
        <h2 className="card_title">{card.name}</h2>
        <div className="card_like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          />
        </div>
      </div>
    </li>
  );
}

export default Card;