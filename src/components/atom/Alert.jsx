import React from 'react';
import ReactDOM from 'react-dom';

const Alert = ({ message, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-stcolor p-6 rounded-md">
        <p className="text-bgcolor">{message}</p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="mt-4 text-bgcolor py-2 px-4 rounded-md border border-bgcolor border-solid"
          >
            확인
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Alert;
