import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ImagePopup from "./ImagePopup/ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", about: "", avatar: "" });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  
  const [popup, setPopup] = useState(null); 

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log("Error inicial:", err));
  }, []);

  const handleOpenPopup = (name) => setPopup(name);
  const handleClosePopup = () => {
    setPopup(null);
    setSelectedCard(null);
  };

  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopup();
      })
      .catch((err) => console.log("Error al actualizar perfil:", err));
  };

  const handleUpdateAvatar = (data) => {
    api.setUserAvatar(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        handleClosePopup();
      })
      .catch((err) => console.log("Error al actualizar avatar:", err));
  };

  const handleAddPlaceSubmit = (data) => {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => console.log("Error al añadir tarjeta:", err));
  };

  const handleCardLike = (card) => {
    const isLiked = card.isLiked; 
    api.changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.error("Error en like:", err));
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log("Error al eliminar:", err));
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page">
        <Header />
        
        <Main
          popup={popup}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          onUpdateUser={handleUpdateUser}
          onUpdateAvatar={handleUpdateAvatar}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          onCardClick={setSelectedCard}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />

        <Footer />

        <ImagePopup 
          card={selectedCard} 
          onClose={handleClosePopup} 
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;