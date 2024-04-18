import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ImageMesh } from '../../components/common/ImageMesh';
import { Canvas } from '@react-three/fiber';

function Message() {
  const [showModal, setShowModal] = useState(true);
  const [input, setInput] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { message, icon } = location.state;
    setInput(message);
    setImage(icon);
  }, [location.state]);

  const closeNote = () => {
    navigate(-1);
  };

  return showModal ? (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="relative flex-grow">
        <div className="flex flex-col items-center justify-center mt-16">
          <Canvas style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={1} />
            <directionalLight />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <ImageMesh modelUrl={image} />
          </Canvas>
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
