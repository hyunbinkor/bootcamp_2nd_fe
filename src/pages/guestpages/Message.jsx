import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Modal from '../../components/atom/Modal';
import Alert from '../../components/atom/Alert';
import BackArrow from '../../components/atom/BackArrow';
import { ImageMesh } from '../../components/common/ImageMesh';
import { Canvas } from '@react-three/fiber';

function Message() {
  const [input, setInput] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { image, pageNumber } = location.state;
  

  const params = useParams();
  const treeId = params.id;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  //입력값 경고 생성
  const handleAlertCreate = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };
  //입력값 경고 해제
  const handleAlertClose = () => {
    setAlertMessage('');
    setShowAlert(false);
  };

  //메세지 검사
  const handleInputCheck = () => {
    //길이
    if (input.trim().length < 1) {
      return handleAlertCreate('메세지를 입력해주세요!');
    }
    addNote();
  };

  const addNote = async () => {
    setInput('');
    console.log(pageNumber)
    navigate(`../guest/tree/${treeId}/image/message/temp`, {
      state: { image, input,pageNumber }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackArrow pageNumber={pageNumber}/>
      <h1 className="text-center text-neutral text-3xl font-custom font-black my-8">
        메세지를 입력해 줘!
      </h1>
      <div className="relative flex-grow">
        <div className="flex flex-col items-center justify-center">
          <Canvas style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={1} />
            <directionalLight />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <ImageMesh modelUrl={image} />
          </Canvas>
          <textarea
            className="shadow-lg px-2 
            resize-none w-[300px] h-[300px]
            sm:w-[200px] sm:h-[200px]
            md:w-[450px] md:h-[450px]
            ml:w-[300px] ml:h-[300px]
            lg:w-[300px] lg:h-[275px]
            xl:w-[350px] xl:h-[350px]"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              overflowY: 'auto',
              lineHeight: '31px',
              backgroundImage: `repeating-linear-gradient(white, white 30px, #ccc 30px, #ccc 31px, white 31px)`,
              backgroundAttachment: 'local',
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% 31px'
            }}
          ></textarea>

          <div
            className="bottom-0 absolute rounded-full py-4 px-5 uppercase text-2xl font-bold cursor-pointer tracking-wider bg-pink-200 font-custom"
            onClick={() => handleInputCheck()}
          >
            꾸미러 가기!
          </div>

          {showAlert && (
            <Alert message={alertMessage} onClose={handleAlertClose} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
