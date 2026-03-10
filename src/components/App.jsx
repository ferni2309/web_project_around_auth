import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import Footer from "../components/Footer/Footer";
import api from "../utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]); 

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

 useEffect(() => {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      setCurrentUser(userData);
      setCards(cardsData);
    })
    .catch((err) => console.error(`Error al cargar datos iniciales: ${err}`));
}, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(userData) {
  api.setUserInfo(userData)
    .then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
}

  function handleUpdateAvatar(avatarData) {
    api.setUserAvatar(avatarData)
      .then((newUser) => {

        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.error(`Error al actualizar avatar: ${err}`));
  }

  function handleAddPlaceSubmit(cardData) {
    api.addCard(cardData)
      .then((newCard) => {

        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch((err) => console.error(`Error al añadir tarjeta: ${err}`));
  }

function handleCardLike(card) {
  api.changeLikeStatus(card._id, !card.isLiked)
    .then((newCard) => {
      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
      );
    })
    .catch((err) => console.error(`Error al gestionar el like: ${err}`));
}

function handleCardDelete(card) {

    api.deleteCard(card._id)
      .then(() => {

        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(`Error al eliminar la tarjeta: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main

          cards={cards} 
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        
        popup={
          isEditProfilePopupOpen ? "edit-profile" : 
          isAddPlacePopupOpen ? "add-place" : 
          isEditAvatarPopupOpen ? "edit-avatar" : null
        }
        selectedCard={selectedCard}
        
        onClosePopup={closeAllPopups}
        
        onUpdateUser={handleUpdateUser} 
        onUpdateAvatar={handleUpdateAvatar}
        onAddPlaceSubmit={handleAddPlaceSubmit}
      />
      
      <Footer />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
