import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ImagePopup from "./ImagePopup/ImagePopup";
import EditProfile from "./Form/EditProfile/EditProfile";
import EditAvatar from "./Form/EditAvatar/EditAvatar";
import NewCard from "./Form/NewCard/NewCard";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
 
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: ''
  });
  
  const [cards, setCards] = useState([]);
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log("Error al cargar datos iniciales:", err));
  }, []);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log("Error al actualizar perfil:", err));
  };

  const handleUpdateAvatar = (data) => {
    api.setUserAvatar(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log("Error al actualizar avatar:", err));
  };

  const handleAddPlaceSubmit = (data) => {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log("Error al añadir tarjeta:", err));
  };

  const handleCardLike = (card) => {
    const isLiked = card.isLiked; 
    
    api.changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => 
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.error("Error al gestionar el like:", err));
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log("Error al eliminar tarjeta:", err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        
        <Main
          onEditProfileClick={() => setIsEditProfilePopupOpen(true)}
          onAddPlaceClick={() => setIsAddPlacePopupOpen(true)}
          onEditAvatarClick={() => setIsEditAvatarPopupOpen(true)}
          onCardClick={setSelectedCard}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />

        <Footer />

        <EditProfile 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
        />

        <EditAvatar 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar} 
        />

        <NewCard 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups} 
          onAddPlaceSubmit={handleAddPlaceSubmit} 
        />

        <ImagePopup 
          card={selectedCard} 
          onClose={closeAllPopups} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
