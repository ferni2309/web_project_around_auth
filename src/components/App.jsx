import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import ImagePopup from "./ImagePopup/ImagePopup";
import EditProfile from "./Form/EditProfile/EditProfile";
import EditAvatar from "./Form/EditAvatar/EditAvatar";
import NewCard from "./Form/NewCard/NewCard";
import RemoveCard from "./RemoveCard/RemoveCard";
import api from "../utils/api";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
  
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "https://images.unsplash.com",
  });
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => console.log("Error inicial:", err));
  }, []);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsRemovePopupOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log);
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log);
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log);
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
          
          onCardLike={(card) => {
            if (!card || !card._id) return;

            const nextLikeStatus = !card.isLiked;

            api
              .changeLikeStatus(card._id, nextLikeStatus)
              .then((newCard) => {
                
                setCards((state) =>
                  state.map((c) => (c._id === card._id ? newCard : c)),
                );
              })
              .catch((err) =>
                console.error("Error al cambiar el estado del like:", err),
              );
          }}
          onCardDelete={(card) => {
            setCardToDelete(card);
            setIsRemovePopupOpen(true);
          }}
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
        <RemoveCard
          isOpen={isRemovePopupOpen}
          onClose={closeAllPopups}
          onConfirm={() => {
            api
              .deleteCard(cardToDelete._id)
              .then(() => {
                setCards((s) => s.filter((c) => c._id !== cardToDelete._id));
                closeAllPopups();
              })
              .catch(console.log);
          }}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
