
import React from 'react';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <p>{message}</p>
        <div className="mt-4 flex justify-center">
          <button onClick={onConfirm} className="mr-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
            Yes
          </button>
          <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
