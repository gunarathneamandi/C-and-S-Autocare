import React from 'react'

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;
  
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: 20, backgroundColor: 'white', borderRadius: 5, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <p>{message}</p>
          <button onClick={onConfirm} style={{ marginRight: 10 }}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  };

  export default ConfirmationModal;
  