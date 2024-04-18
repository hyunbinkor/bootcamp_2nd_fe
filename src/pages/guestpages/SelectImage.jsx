import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import BackArrow from '../../components/atom/BackArrow';
import axios from 'axios';
import { ImageMesh } from '../../components/common/ImageMesh';

const Image = [
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/cactus/model.gltf'
];

async function fetchIcons() {
  try {
    const response = await axios.get('/api/message/icon/all');
    return response.data;
  } catch (error) {
    throw new Error('아이콘을 불러오는데 실패했습니다:', error);
  }
}
const IMAGES_PER_PAGE = 9;

const SelectImage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [images, setImages] = useState([]);
  const location = useLocation();
  const { pageNumber } = location.state;

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await axios.get('/api/message/icon/all');
        setImages(response.data);
        setTotalImages(response.data.length);
      } catch (error) {
        console.error('아이콘을 불러오는데 실패했습니다:', error);
      }
    };
    fetchIcons();
  }, []);

  useEffect(() => {
    const newImages = images.slice(
      currentPage * IMAGES_PER_PAGE,
      (currentPage + 1) * IMAGES_PER_PAGE
    );
    setCurrentImages(newImages);
  }, [currentPage, images]);

  const totalPages = Math.ceil(totalImages / IMAGES_PER_PAGE);

  const handleImageClick = (image) => {
    navigate('message', { state: { image, pageNumber } });
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
        <div className="flex flex-col mt-8 px-6 items-center justify-center">
          <h1 className="text-neutral text-3xl font-custom font-black mb-16">
            3D 모델을 골라봐!
          </h1>
          <div
            style={{ width: '298px', height: '403px' }}
            className="grid grid-cols-3 gap-3 h-auto
  sm:gap-3
  md:gap-4
  lg:gap-4
  xl:gap-4"
          >
            {currentImages.map((image) => (
              <div
                key={image.url}
                className="cursor-pointer flex justify-center items-center h-32"
                onClick={() => handleImageClick(image.url)}
                style={{ width: '100%', position: 'relative' }}
              >
                <Canvas style={{ width: '100%', height: '100%' }}>
                  <ambientLight intensity={1} />
                  <directionalLight />
                  <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                  />
                  <ImageMesh modelUrl={image.url} />
                </Canvas>
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
