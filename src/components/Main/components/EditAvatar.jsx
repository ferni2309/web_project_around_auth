import React, { useState, useEffect } from "react";
import PopupWithForm from "./Popup/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setAvatar("");
      setError("");
    }
  }, [isOpen]);

  function handleChange(e) {
    setAvatar(e.target.value);
    setError(e.target.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateAvatar({ avatar });
      setAvatar("");
    }
  }

  const isValid = avatar && !error;

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Actualizar avatar"
      buttonText="Guardar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input"
        id="avatar-input"
        type="url"
        name="avatar"
        placeholder="Enlace del avatar"
        required
        value={avatar}
        onChange={handleChange}
      />
      <span className="popup__input-error avatar-input-error">{error}</span>

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

export default EditAvatarPopup;