import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-stcolor p-6 rounded-md">
        <p
          className="text-bgcolor"
          dangerouslySetInnerHTML={{ __html: message }}
        ></p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="mt-4 mr-4 bg-blue-500 text-bgcolor py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
