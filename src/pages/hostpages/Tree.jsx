import React, { useState } from 'react';
import backgroundImage from './TreeBackground.png';
import { useNavigate } from 'react-router-dom';
import img1 from './img/img1.png';
import img2 from './img/img2.png';
import img3 from './img/img3.png';
import img4 from './img/img4.png';
import img5 from './img/img5.png';
import img6 from './img/img6.png';
import img7 from './img/img7.png';
import img8 from './img/img8.png';
import img9 from './img/img9.png';
import img10 from './img/img10.png';
import img11 from './img/img11.png';

function Decoration({ imageUrl, onClick }) {
  return (
    <img src={imageUrl} className="w-10 h-10 sm:w-8 sm:h-8 md:w-12 md:h-12   rounded-full cursor-pointer" alt="Decoration" onClick={onClick} />
  );
}

function DecorationRow({ images }) {
  const decorations = images.map((imageUrl, index) => (
    <div key={index} className="mx-5 sm:mx-3 md:mx-10 lg:mx-7 xl:mx-8">
      <Decoration imageUrl={imageUrl} onClick={() => alert(`장식 ${index + 1}이(가) 클릭되었습니다!`)} />
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
  const baseUrl = "localhost:4000"
  // decorations 상태는 그대로 유지합니다.
  const [decorations, setDecorations] = useState([
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11
  ]);

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
            {/* 각 배열에 대해 별도의 DecorationRow 컴포넌트를 렌더링합니다. */}
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
