import { useContext } from "react";
import Card from "./components/Card/Card";
import EditProfile from "./components/Popup/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar";
import NewCard from "../Main/components/popup/NewCard/NewCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ImagePopup from "../ImagePopup/ImagePopup";

function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar-container"
          onClick={() => props.onOpenPopup("edit-avatar")}
        >
          <img
            src={currentUser.avatar || null}
            alt="Avatar"
            className="profile__avatar"
          />
          <div className="profile__avatar-overlay"></div>
        </div>
        <div className="profile__info">
          <div className="profile__title-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={() => props.onOpenPopup("edit-profile")}
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => props.onOpenPopup("add-place")}
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>

      {/* AQUÍ INCLUIMOS LOS POPUPS DENTRO DE MAIN */}
      <EditProfile
        isOpen={props.popup === "edit-profile"}
        onClose={props.onClosePopup}
        onUpdateUser={props.onUpdateUser}
      />
      <EditAvatar
        isOpen={props.popup === "edit-avatar"}
        onClose={props.onClosePopup}
        onUpdateAvatar={props.onUpdateAvatar}
      />
      <NewCard
        isOpen={props.popup === "add-place"}
        onClose={props.onClosePopup}
        onAddPlaceSubmit={props.onAddPlaceSubmit}
      />
      <ImagePopup card={props.selectedCard} onClose={props.onClosePopup} />
    </main>
  );
}

export default Main;
