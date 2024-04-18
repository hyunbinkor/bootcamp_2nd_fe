import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import useAxios from '../hooks/useAxios';

const DeleteUser = () => {
  const [showModal, setShowModal] = useState(false);
  const { trigger } = useAxios({
    url: '/api/oauth/user/delete'
  });

  const handleDeleteUserClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalComplete = () => {
    trigger({
      method: 'delete'
    });
    setShowModal(false);
  };

  return (
    <div className="relative z-50">
      <button
        className="absolute right-0 mr-4 mt-28 rounded-md p-1 bg-tbcolor border border-solid-2px text-sm"
        onClick={handleDeleteUserClick}
      >
        계정삭제
      </button>
      {showModal && (
        <Modal
          message="계정을 삭제하시겠습니까?"
          onClose={handleModalClose}
          onComplete={handleModalComplete}
        />
      )}
    </div>
  );
};

export default DeleteUser;
