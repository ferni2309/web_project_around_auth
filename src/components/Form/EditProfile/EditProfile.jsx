import React, { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm';

function EditProfile({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({ name: '', about: '' });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setDescription('');
      setErrors({ name: '', about: '' });
      setIsValid(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name: inputName, value, validationMessage, form } = e.target;
    if (inputName === 'name') setName(value);
    if (inputName === 'about') setDescription(value);

    setErrors(prev => ({ ...prev, [inputName]: validationMessage }));
    setIsValid(form.checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm 
      name="edit-profile" title="Editar perfil" isOpen={isOpen} 
      onClose={onClose} onSubmit={handleSubmit} buttonText="Guardar"
      isButtonDisabled={!isValid}
    >
      <input 
        className={`popup__input ${errors.name ? 'popup__input_type_error' : ''}`}
        value={name} onChange={handleChange} name="name" placeholder="Nombre" 
        required minLength="2" maxLength="40"
      />
      <span className="popup__input-error">{errors.name}</span>

      <input 
        className={`popup__input ${errors.about ? 'popup__input_type_error' : ''}`}
        value={description} onChange={handleChange} name="about" placeholder="Acerca de mí" 
        required minLength="2" maxLength="200"
      />
      <span className="popup__input-error">{errors.about}</span>
    </PopupWithForm>
  );
}

export default EditProfile;
