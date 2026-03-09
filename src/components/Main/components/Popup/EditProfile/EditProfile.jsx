import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from '../PopupWithForm';
import { CurrentUserContext } from '../../../../../contexts/CurrentUserContext';

function EditProfile({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState({ name: '', about: '' });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
      setErrors({ name: '', about: '' });
      setIsValid(true);
    }
  }, [currentUser, isOpen]);

  const handleChange = (e) => {
    const { name: inputName, value, validationMessage, form } = e.target;

    if (inputName === 'name') setName(value);
    if (inputName === 'about') setDescription(value);

    setErrors(prevErrors => ({
      ...prevErrors,
      [inputName]: validationMessage
    }));

    setIsValid(form.checkValidity());
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Editar perfil"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Guardar"
      isButtonDisabled={!isValid}
    >
      <div className="popup__field">
        <input
          className={`popup__input ${errors.name ? 'popup__input_type_error' : ''}`}
          name="name"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleChange}
        />
        <span className={`popup__input-error ${errors.name ? 'popup__error_visible' : ''}`}>
          {errors.name}
        </span>
      </div>

      <div className="popup__field">
        <input
          className={`popup__input ${errors.about ? 'popup__input_type_error' : ''}`}
          name="about"
          placeholder="Acerca de mí"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleChange}
        />
        <span className={`popup__input-error ${errors.about ? 'popup__error_visible' : ''}`}>
          {errors.about}
        </span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfile;