import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/atom/Modal';
import Alert from '../../components/atom/Alert';
import BackArrow from '../../components/atom/BackArrow';

function Message(props) {
  const [input, setInput] = useState('');

  const location = useLocation();
  const { image, uniqueId } = location.state;

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  //입력값 경고 생성
  const handleAlertCreate = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };
  //입력값 경고 해제
  const handleAlertClose = () => {
    setAlertMessage('');
    setShowAlert(false);
  };
  // 메세지 남기기 버튼을 눌렀을 때 모달 생성
  const handleModalCreate = () => {
    setShowModal(true);
  };
  // 모달창에서 닫기 버튼을 눌렀을 때 모달 해제
  const handleModalClose = () => {
    setShowModal(false);
  };
  // 모달창에서 완료 버튼을 눌렀을 때 모달 해제, post
  const handleModalComplete = () => {
    //post 통신
    addNote();
    setShowModal(false);
  };

  //메세지 검사
  const handleInputCheck = () => {
    //길이
    if (input.trim().length < 1) {
      return handleAlertCreate('메세지를 입력해주세요!');
    }
    handleModalCreate();
  };

  const addNote = async () => {
    const url = `/api/message/${treeId}/write`;
    try {
      const response = await axios.post(url, {
        text: input,
        image: image
      });
      console.log('메시지가 성공적으로 전송되었습니다.', response.data);
      setInput('');
    } catch (error) {
      console.error('메시지 전송에 실패했습니다.', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackArrow />
      <h1 className="text-center my-8 text-2xl font-bold">
        메세지를 남겨주세요!
      </h1>
      <div className="relative flex-grow">
        <div className="flex flex-col items-center justify-center">
          <textarea
            className="shadow-lg px-2 resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              width: '298px',
              height: '403px',
              overflowY: 'auto',
              lineHeight: '31px',
              backgroundImage: `repeating-linear-gradient(white, white 30px, #ccc 30px, #ccc 31px, white 31px)`,
              backgroundAttachment: 'local',
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% 31px'
            }}
          ></textarea>

          <div
            className="bottom-0 absolute rounded-full py-4 px-5 uppercase text-xl font-bold cursor-pointer tracking-wider bg-pink-200"
            onClick={() => handleInputCheck()}
          >
            메시지 남기기
          </div>

          {showModal && (
            <Modal
              message="작성하신 내용은 수정이 어려워요. <br/> 신중하게 작성해 주세요!"
              onClose={handleModalClose}
              onComplete={handleModalComplete}
            />
          )}
          {showAlert && (
            <Alert message={alertMessage} onClose={handleAlertClose} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
