import { useContext, useState } from "react";
import Card from "./components/Card/Card";
import Popup from "./components/Popup/Popup";
import EditProfile from "./components/Popup/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar";
import NewCard from "./components/Popup/NewCard/NewCard";
import ImagePopup from "../ImagePopup/ImagePopup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({
  cards,
  onUpdateUser,
  onUpdateAvatar,
  onAddPlaceSubmit,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isNewCardPopupOpen, setIsNewCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsNewCardPopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar-container"
          onClick={() => setIsEditAvatarPopupOpen(true)}
        >
          <img
            src={currentUser?.avatar}
            alt="Avatar"
            className="profile__avatar"
          />
          <div className="profile__avatar-overlay"></div>
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={() => setIsEditProfilePopupOpen(true)}
            ></button>
          </div>
          <p className="profile__about">{currentUser?.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => setIsNewCardPopupOpen(true)}
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards &&
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={(card) => setSelectedCard(card)}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
        </ul>
      </section>

      <Popup
        isOpen={isEditProfilePopupOpen}
        name="edit-profile"
        onClose={closeAllPopups}
      >
        <EditProfile
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={onUpdateUser}
          onClose={closeAllPopups}
        />
      </Popup>

      <Popup
        isOpen={isEditAvatarPopupOpen}
        name="edit-avatar"
        onClose={closeAllPopups}
      >
        <EditAvatar isOpen={isEditAvatarPopupOpen} onUpdateAvatar={onUpdateAvatar} onClose={closeAllPopups} />
      </Popup>

      <Popup
        isOpen={isNewCardPopupOpen}
        name="new-card"
        onClose={closeAllPopups}
      >
        <NewCard isOpen={isNewCardPopupOpen} onAddPlaceSubmit={onAddPlaceSubmit} onClose={closeAllPopups} />
      </Popup>

      <Popup isOpen={!!selectedCard} name="image" onClose={closeAllPopups}>
        <ImagePopup card={selectedCard} />
      </Popup>
    </main>
  );
}

export default Main;
