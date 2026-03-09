import React, { useContext } from "react";
import { CurrentUserContext } from "../../../../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const ownerId = card?.owner?._id || card?.owner;
  const isOwn = ownerId === currentUser?._id;
  const isLiked = card?.isLiked; 

  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);
  const handleCardClick = () => onCardClick(card);

  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? "card__delete_visible" : "card__delete_hidden"
  }`;
  
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  return (
    <li className="card">
      <img
        src={card?.link}
        alt={card?.name}
        className="card__image"
        onClick={handleCardClick}
      />
      
      {isOwn && (
        <button
          className={cardDeleteButtonClassName}
          type="button"
          onClick={handleDeleteClick}
        />
      )}

      <div className="card__info">
        <h2 className="card__title">{card?.name || "Sin título"}</h2>
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          {/* <span className="card__like-count">
            {Array.isArray(card?.likes) ? card.likes.length : 0}
          </span> */}
        </div>
      </div>
    </li>
  );
}

export default Card;
