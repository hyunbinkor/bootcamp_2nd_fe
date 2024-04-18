import React, { useState, useEffect } from 'react';
import backgroundImage from './TreeBackground.png';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../components/hooks/useAxios';

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

const handleCopyClipBoard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('클립보드에 링크가 복사되었어요.');
  } catch (err) {
    console.log(err);
  }
};

function HostTree() {
  const { id } = useParams();
  console.log(id);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [decorations, setDecorations] = useState([]);
  const { response } = useAxios({
    url: `/api/message/${id}/all`,
    params: { count: 1, size: 11 },
    shouldInitFetch: true
  });
  useEffect(() => {
    if (response) {
      if (response.error) {
        setDecorations([]);
      } else {
        setDecorations(response);
      }
    }
  }, [id, response]);

  // 장식 배열을 원하는 구조에 맞게 분할합니다.
  console.log(decorations);
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

          <div className="flex flex-col w-2/3 justify-center">
            <button
              className="btn btn-primary rounded-xl my-3"
              onClick={() =>
                handleCopyClipBoard(`${baseUrl}${location.pathname}`)
              }
            >
              내 트리 공유하기
            </button>
            <button
              className="btn btn-primary rounded-xl"
              onClick={() => handleDelete}
            >
              트리 삭제 및 탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HostTree;
