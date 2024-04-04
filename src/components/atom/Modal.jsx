import React from 'react';

const Modal = ({ message, onClose, onComplete }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-stcolor p-6 rounded-md">
        <p
          className="text-bgcolor"
          dangerouslySetInnerHTML={{ __html: message }}
        ></p>
        <div className="flex justify-center  gap-8">
          <button
            onClick={onClose}
            className="mt-4 mr-4 bg-blue-500 text-bgcolor py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            닫기
          </button>
          <button
            onClick={onComplete}
            className="mt-4 bg-blue-500 text-bgcolor py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
