import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

async function fetchMessage(messageId) {
  try {
    const response = await axios.get(
      `http://3.39.232.205:8080/api/message/${messageId}`
    );
    return response.data;
  } catch (error) {
    console.error('메세지를 불러오는데 실패했습니다:', error);
    return null;
  }
}

//props로 넘기든.. location을 쓰든.. 일단 message고유값 ! 받아야 함
function Message({ messageId }) {
  const [showModal, setShowModal] = useState(true);
  const [input, setInput] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMessage(messageId);
      if (data) {
        setInput(data);
      }
    };
    loadData();
  }, [messageId]);

  const closeNote = () => {
    navigate(-1);
  };

  return showModal ? (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="relative flex-grow">
        <div className="flex flex-col items-center justify-center mt-32">
          <textarea
            className="shadow-lg px-2 resize-none"
            value={input}
            readOnly={true}
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
            onClick={closeNote}
          >
            닫기
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Message;
