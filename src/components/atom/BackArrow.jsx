import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function BackArrow({ image, input }) {
  const navigate = useNavigate();
  const location = useLocation();

  const goToParentPath = () => {
    const paths = location.pathname.split('/');
    paths.pop();
    const parentPath = paths.join('/') || '/';

    if (image && input) {
      navigate(parentPath, { state: { image, input } });
    } else {
      navigate(parentPath);
    }
  };

  return (
    <div className="relative top-0 left-0 mt-16 z-10">
      <button
        onClick={goToParentPath}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
        aria-label="뒤로 가기"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    </div>
  );
}

export default BackArrow;
