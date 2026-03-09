import React, { useContext } from "react";
import Card from "./components/Card/Card";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import editButton from "../../assets/images/EditButton.png";
import addButton from "../../assets/images/AddButton.png";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatarClick}>
          <img
            src={currentUser.avatar || "https://via.placeholder.com"}
            alt="Avatar"
            className="profile__avatar"
          />
          <div className="profile__avatar-overlay"></div>
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__name">
              {currentUser.name || "Cargando..."}
            </h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfileClick}
            >
              <img src={editButton} alt="Botón editar perfil" />
            </button>
          </div>
          <p className="profile__about">{currentUser.about || "Estudiante"}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlaceClick}
        >
          <img src={addButton} alt="Botón añadir tarjeta" />
        </button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
