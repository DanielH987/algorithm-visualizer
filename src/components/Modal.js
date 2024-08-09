// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    const handleOverlayClick = () => {
      onClose();
  };
  
    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;
