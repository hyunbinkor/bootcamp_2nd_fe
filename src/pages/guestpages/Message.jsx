import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Message(props) {
  const [input, setInput] = useState('');

  const location = useLocation();
  const { image, uniqueId } = location.state;

  console.log(location.state);

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
              backgroundSize: '100% 31px' // 이 부분을 추가합니다.
            }}
          ></textarea>

          <div
            className="bottom-0 absolute rounded-full py-4 px-5 uppercase text-xl font-bold cursor-pointer tracking-wider bg-pink-200"
            onClick={addNote}
          >
            메시지 남기기
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
