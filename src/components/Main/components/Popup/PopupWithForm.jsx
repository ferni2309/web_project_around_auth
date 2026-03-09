import React from 'react';
import closeIcon from '../../../../images/close-icon.png';

function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit, buttonText, isButtonDisabled }) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button className="popup__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Icono de cerrar" />
        </button>
        
        <h2 className="popup__title">{title}</h2>
        
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button 
            className={`popup__button ${isButtonDisabled ? "popup__button_disabled" : ""}`} 
            type="submit"
            disabled={isButtonDisabled}
          >
            {buttonText || "Guardar"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;