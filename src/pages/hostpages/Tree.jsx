import React, { useState, useEffect } from 'react';
import backgroundImage from './TreeBackground.png';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

//모든 메시지 불러오기
async function fetchAllMessage(treeId) {
  try {
    const response = await axios.get(
      `http://3.39.232.205:8080/api/message/4ff85ae1cd6e476cb47addce5479c689/all`
    );
    return response.data;
  } catch (error) {
    console.error('메세지를 불러오는데 실패했습니다:', error);
    return null;
  }
}

function Decoration({ imageUrl, onClick }) {
  return (
    <img
      src={imageUrl}
      className="w-10 h-10 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full cursor-pointer"
      alt="Decoration"
      onClick={onClick}
    />
  );
}

function DecorationRow({ images }) {
  const navigate = useNavigate();

  const handleDecorationClick = (message, icon) => {
    navigate('message', { state: { message, icon } });
  };

  const decorations = images.map((imageUrl, index) => (
    <div key={index} className="mx-5 sm:mx-3 md:mx-10 lg:mx-7 xl:mx-8">
      <Decoration
        imageUrl={imageUrl.icon}
        onClick={() => handleDecorationClick(imageUrl.message, imageUrl.icon)}
      />
    </div>
  ));

  return (
    <div className="flex my-8 sm:my-4 md:my-16 lg:my-6 xl:my-10 justify-center">
      {decorations}
    </div>
  );
}
function HostTree() {
  const navigate = useNavigate();
  const { treeId } = useParams();
  const baseUrl = 'localhost:4000';
  const [decorations, setDecorations] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const allMessage = await fetchAllMessage(treeId);
      if (allMessage) {
        setDecorations(allMessage);
      }
    };
    fetchMessages();
  }, [treeId]);

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었어요.');
    } catch (err) {
      console.log(err);
    }
  };

  // 장식 배열을 원하는 구조에 맞게 분할합니다.
  const rows = [
    decorations.slice(0, 1),
    decorations.slice(1, 4),
    decorations.slice(4, 7),
    decorations.slice(7, 11)
  ];
  console.log(rows);
  return (
    <div className="min-h-screen flex flex-col ">
      <h1 className="text-center my-8 text-2xl font-bold">민서님의 트리</h1>
      <div className="relative flex-grow">
        <div className="flex flex-col items-center justify-center">
          <img
            className="w-[500px] h-[500px]
                      sm:w-[300px] sm:h-[300px]
                      md:w-[800px] md:h-[800px]
                      ml:w-[500px] ml:h-[500px]
                      lg:w-[500px] lg:h-[450px]
                      xl:w-[600px] xl:h-[600px]"
            src={backgroundImage}
            alt="Background"
          />
          <div className="absolute top-1 flex flex-col justify-center">
            {rows.map((rowImages, index) => (
              <DecorationRow key={index} images={rowImages} />
            ))}
          </div>

          <div className="flex justify-center">
            <div
              className="bottom-0 rounded-full py-4 px-5 uppercase text-xl font-bold cursor-pointer tracking-wider bg-pink-100"
              onClick={() =>
                handleCopyClipBoard(`${baseUrl}${location.pathname}`)
              }
            >
              내 트리 공유하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HostTree;
