import closeIcon from '../../../../assets/images/Close-Icon.png';

function Popup({ title, name, isOpen, onClose, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content">
        <button className="popup__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Cerrar" />
        </button>
        <h2 className="popup__header">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Popup;