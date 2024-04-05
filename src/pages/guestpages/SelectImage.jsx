import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackArrow from '../../components/atom/BackArrow';
import axios from 'axios';

async function fetchIcons() {
  try {
    const response = await axios.get(
      'http://3.39.232.205:8080/api/message/icon/all'
    );
    return response.data;
  } catch (error) {
    // 오류 처리
    console.error('아이콘을 불러오는데 실패했습니다:', error);
  }
}

const IMAGES_PER_PAGE = 12;

const SelectImage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    fetchIcons().then((data) => {
      setTotalImages(data.length);
      const newImages = data.slice(
        currentPage * IMAGES_PER_PAGE,
        (currentPage + 1) * IMAGES_PER_PAGE
      );
      setCurrentImages(newImages);
    });
  }, [currentPage]);

  const totalPages = Math.ceil(totalImages / IMAGES_PER_PAGE);

  const handleImageClick = (image) => {
    navigate('message', { state: { image } });
  };

  const handleNextClick = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <BackArrow />
      <div className="relative flex-grow">
        <div className="flex flex-col mt-16 px-6 items-center justify-center">
          <div
            style={{ width: '298px', height: '403px' }}
            className="grid grid-cols-3 gap-4
            sm:gap-3
            md:gap-4
            lg:gap-4
            xl:gap-4
          "
          >
            {currentImages.map((image, idx) => (
              <div
                key={idx}
                className="cursor-pointer flex justify-center items-center"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image}
                  alt={`아이콘 ${idx}`}
                  className="
                  w-20 h-20 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full"
                />
              </div>
            ))}
          </div>
          {totalImages > IMAGES_PER_PAGE ? (
            <div className="bottom-0 absolute rounded-full py-4 px-5 uppercase text-xl font-bold cursor-pointer tracking-wider bg-pink-200 flex justify-between">
              {currentPage > 0 && (
                <button className="mr-4" onClick={handlePrevClick}>
                  이전
                </button>
              )}
              {currentPage < totalPages - 1 && (
                <button className="ml-4" onClick={handleNextClick}>
                  다음
                </button>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectImage;
