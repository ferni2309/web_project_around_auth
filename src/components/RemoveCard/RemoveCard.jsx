import PopupWithForm from '../Main/components/popup/PopupWithForm';

function RemoveCard({ isOpen, onClose, onConfirm }) {
  
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <PopupWithForm 
      name="remove-card" 
      title="¿Estás seguro?" 
      isOpen={isOpen} 
      onClose={onClose} 
      onSubmit={handleSubmit}
      buttonText="Sí"
    />
  );
}

export default RemoveCard;
