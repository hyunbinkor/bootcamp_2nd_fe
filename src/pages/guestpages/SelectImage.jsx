import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const images = [
  { id: 1, src: "image1.jpg", alt: "이미지 1", info: "이미지 1 정보" },
  { id: 2, src: "image2.jpg", alt: "이미지 2", info: "이미지 2 정보" },
  { id: 3, src: "image3.jpg", alt: "이미지 3", info: "이미지 3 정보" },
  { id: 4, src: "image4.jpg", alt: "이미지 4", info: "이미지 4 정보" },
  { id: 5, src: "image5.jpg", alt: "이미지 5", info: "이미지 5 정보" },
  { id: 6, src: "image6.jpg", alt: "이미지 6", info: "이미지 6 정보" },
  { id: 7, src: "image7.jpg", alt: "이미지 7", info: "이미지 7 정보" },
  { id: 8, src: "image8.jpg", alt: "이미지 8", info: "이미지 8 정보" },
  { id: 9, src: "image9.jpg", alt: "이미지 9", info: "이미지 9 정보" },
  { id: 10, src: "image10.jpg", alt: "이미지 10", info: "이미지 10 정보" },
  { id: 11, src: "image11.jpg", alt: "이미지 11", info: "이미지 11 정보" },
  { id: 12, src: "image12.jpg", alt: "이미지 12", info: "이미지 12 정보" },
  { id: 13, src: "image13.jpg", alt: "이미지 13", info: "이미지 13 정보" },
  { id: 14, src: "image14.jpg", alt: "이미지 14", info: "이미지 14 정보" },
  { id: 15, src: "image15.jpg", alt: "이미지 15", info: "이미지 15 정보" },
  { id: 16, src: "image16.jpg", alt: "이미지 16", info: "이미지 16 정보" },
  { id: 17, src: "image17.jpg", alt: "이미지 17", info: "이미지 17 정보" },
  { id: 18, src: "image18.jpg", alt: "이미지 18", info: "이미지 18 정보" },
  { id: 19, src: "image19.jpg", alt: "이미지 19", info: "이미지 19 정보" },
  { id: 20, src: "image20.jpg", alt: "이미지 20", info: "이미지 20 정보" },
  { id: 21, src: "image21.jpg", alt: "이미지 21", info: "이미지 21 정보" },
  { id: 22, src: "image22.jpg", alt: "이미지 22", info: "이미지 22 정보" },
  { id: 23, src: "image23.jpg", alt: "이미지 23", info: "이미지 23 정보" },
  { id: 24, src: "image24.jpg", alt: "이미지 24", info: "이미지 24 정보" },
  { id: 25, src: "image25.jpg", alt: "이미지 25", info: "이미지 25 정보" },
  { id: 26, src: "image26.jpg", alt: "이미지 26", info: "이미지 26 정보" },
];

const IMAGES_PER_PAGE = 12;

const SelectImage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentImages, setCurrentImages] = useState([]);

  useEffect(() => {
    const newImages = images.slice(
      currentPage * IMAGES_PER_PAGE,
      (currentPage + 1) * IMAGES_PER_PAGE
    );
    console.log(newImages);
    setCurrentImages(newImages);
  }, [currentPage]);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  const handleImageClick = (image) => {
    const uniqueId = uuidv4();
    navigate("message", { state: { image, uniqueId } });
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
    <div>
      <div className="grid grid-cols-4 gap-4">
        {currentImages.map((image) => (
          <div
            key={image.id}
            className="cursor-pointer"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto rounded-full"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        {currentPage > 0 && <button onClick={handlePrevClick}>이전</button>}
        {currentPage < totalPages - 1 && (
          <button onClick={handleNextClick}>다음</button>
        )}
      </div>
    </div>
  );
};

export default SelectImage;
