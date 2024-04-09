import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ message, onClose, onComplete }) => {
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-stcolor p-6 rounded-md">
        <p
          className="text-bgcolor"
          dangerouslySetInnerHTML={{ __html: message }}
        ></p>
        <div className="flex justify-center  gap-8">
          <button
            onClick={onClose}
            className="mt-4 text-bgcolor py-2 px-4 rounded-md border border-bgcolor border-solid"
          >
            닫기
          </button>
          <button
            onClick={onComplete}
            className="mt-4 text-bgcolor py-2 px-4 rounded-md border border-bgcolor border-solid"
          >
            완료
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') // 모달을 렌더링할 대상(container)
  );
};

export default Modal;
