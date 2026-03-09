import React, { useRef, useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm';

function EditAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (avatarRef.current) avatarRef.current.value = '';
      setError('');
      setIsValid(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setError(e.target.validationMessage);
    setIsValid(e.target.form.checkValidity());
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <PopupWithForm 
      name="edit-avatar" title="Actualizar foto de perfil" isOpen={isOpen} 
      onClose={onClose} onSubmit={handleSubmit} buttonText="Guardar"
      isButtonDisabled={!isValid}
    >
      <input 
        ref={avatarRef} type="url" name="avatar" placeholder="Enlace a la imagen" required 
        className={`popup__input ${error ? 'popup__input_type_error' : ''}`}
        onChange={handleChange}
      />
      <span className="popup__input-error">{error}</span>
    </PopupWithForm>
  );
}

export default EditAvatar;
