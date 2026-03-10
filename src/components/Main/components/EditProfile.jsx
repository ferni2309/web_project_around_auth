import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./Popup/PopupWithForm";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ name: "", description: "" });

  useEffect(() => {
  if (isOpen && currentUser) {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
    setErrors({ name: "", description: "" });
  }
}, [isOpen, currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
    setErrors({ ...errors, name: e.target.validationMessage });
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    setErrors({ ...errors, description: e.target.validationMessage });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateUser({ name, about: description });
    }
  }

  const isValid = name && description && !errors.name && !errors.description;

  return (
    <PopupWithForm
      name="edit-profile"
      title="Editar perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="name-input"
        type="text"
        name="name"
        placeholder="Nombre"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__input-error name-input-error">{errors.name}</span>

      <input
        className="popup__input"
        id="about-input"
        type="text"
        name="about"
        placeholder="Acerca de mí"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error about-input-error">{errors.description}</span>

      <button
        className={`popup__button ${!isValid ? "popup__button_disabled" : ""}`}
        type="submit"
        disabled={!isValid}
      >
        Guardar
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;