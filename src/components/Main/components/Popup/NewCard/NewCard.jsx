import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm';

function NewCard({ isOpen, onClose, onAddPlaceSubmit }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [errors, setErrors] = useState({ title: '', link: '' });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
      setErrors({ title: '', link: '' });
      setIsValid(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name: inputName, value, validationMessage, form } = e.target;
    if (inputName === 'title') setName(value);
    if (inputName === 'link') setLink(value);

    setErrors(prev => ({ ...prev, [inputName]: validationMessage }));
    setIsValid(form.checkValidity());
  };

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
  }

  return (
    <PopupWithForm 
      name="add-card" title="Nuevo lugar" isOpen={isOpen} 
      onClose={onClose} onSubmit={handleSubmit} buttonText="Crear"
      isButtonDisabled={!isValid}
    >
      <input 
        className={`popup__input ${errors.title ? 'popup__input_type_error' : ''}`}
        value={name} onChange={handleChange} name="title" placeholder="Título" 
        required minLength="2" maxLength="30"
      />
      <span className="popup__input-error">{errors.title}</span>

      <input 
        className={`popup__input ${errors.link ? 'popup__input_type_error' : ''}`}
        type="url" value={link} onChange={handleChange} name="link" placeholder="Enlace a la imagen" 
        required 
      />
      <span className="popup__input-error">{errors.link}</span>
    </PopupWithForm>
  );
}

export default NewCard;