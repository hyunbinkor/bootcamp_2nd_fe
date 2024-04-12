import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ImageMesh } from './ImageMesh';
import axios from 'axios';
import Alert from '../../components/atom/Alert';
import Modal from '../../components/atom/Modal';

function GridBox(props) {
  const mesh = useRef();
  const [objects, setObjects] = useState([]);
  const [previewPosition, setPreviewPosition] = useState(null); // 미리보기 Mesh 위치 상태 추가
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  //공통 기능으로 뺄 것.
  async function addTemp() {
    try {
      const response = await axios.post(`/api/message/${props.treeId}/write`, {
        message: props.input,
        icon: props.image
      });
      handleAlertCreate('트리에 달기 성공!');
      navigate('../guest/tree/:id');
    } catch (error) {
      handleAlertCreate('다시 시도해주세요 ㅠ.ㅠ');
    }
  }

  // 오브젝트 놓았을 때 모달 생성
  const handleModalCreate = () => {
    setShowModal(true);
  };
  // 모달창에서 닫기 버튼을 눌렀을 때 모달 해제
  const handleModalClose = () => {
    setShowModal(false);
  };
  // 모달창에서 완료 버튼을 눌렀을 때 모달 해제, post
  const handleModalComplete = () => {
    setShowModal(false);
    addTemp();
  };
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

  const onPointerMove = (e) => {
    const [x, y, z] = Object.values(e.point).map((coord) => Math.round(coord));
    if (Math.abs(y) < 0.5) {
      const newPreviewPosition = [x, 2.2, z];
      setPreviewPosition(newPreviewPosition);
    } else {
      setPreviewPosition(null); // 마우스가 그리드 바깥으로 이동했을 때 미리보기 위치를 null로 설정
    }
  };

  return (
    <>
      <>
        <OrbitControls autoRotateSpeed={1} />
        <mesh
          {...props}
          ref={mesh}
          onClick={handleModalCreate}
          onPointerMove={onPointerMove}
          scale={[1, 0.1, 1]}
        >
          <boxGeometry args={[5, 3, 5]} />
          <meshStandardMaterial attach="material" color="#a0e060" />
        </mesh>
        <mesh {...props} position={[0, -0.35, 0]} scale={[1, 0.4, 1]}>
          <boxGeometry args={[5, 1, 5]} />
          <meshStandardMaterial attach="material" color="#b97a20" />
        </mesh>
        {objects.map((pos, index) => (
          <mesh key={index} position={pos}>
            {/* <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="hotpink" /> */}
            <ImageMesh modelUrl={props.image} position={pos} scale={0.4} />
          </mesh>
        ))}
        {previewPosition && ( // 미리보기 Mesh 렌더링
          <mesh position={previewPosition}>
            {/* <boxGeometry args={[0.8, 0.8, 0.8]} /> */}
            {/* <meshStandardMaterial color="blue" opacity={0.5} transparent /> */}
            <ImageMesh modelUrl={props.image} scale={0.3} />
          </mesh>
        )}
      </>
      <Html>
        {showModal && (
          <Modal
            message="작성하신 내용은 수정이 어려워요.  신중하게 작성해 주세요!"
            onClose={handleModalClose}
            onComplete={handleModalComplete}
          />
        )}
        {showAlert && (
          <Alert message={alertMessage} onClose={handleAlertClose} />
        )}
      </Html>
    </>
  );
}

function Temp() {
  const [cameraPosition, setCameraPosition] = useState([0, 5, 7]);

  const location = useLocation();
  const { image, input } = location.state;
  const params = useParams();
  const treeId = params.id;

  const handleButtonClick = () => {
    setCameraPosition([0, 10, 0]); // 카메라 위치 변경
  };

  const CameraController = () => {
    const { camera } = useThree();
    useEffect(() => {
      camera.position.set(...cameraPosition);
      camera.lookAt(0, 0, 0);
    }, [camera, cameraPosition]);
    return null;
  };

  return (
    <>
      <div className="fixed top-0 w-full left-1/2 transform -translate-x-1/2 p-12 bg-pink-200 rounded-full text-4xl font-bold cursor-pointer tracking-wider text-center">
        민서님의 Mailland
      </div>
      <Canvas camera={{ position: cameraPosition }}>
        <CameraController />
        <ambientLight intensity={1} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={0.2}
          intensity={2}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <hemisphereLight
          skyColor={'#ffffff'}
          groundColor={'#b97a20'}
          intensity={1}
          position={[0, 50, 0]}
        />
        <GridBox
          image={image}
          input={input}
          treeId={treeId}
          position={[0, 0, 0]}
        />
      </Canvas>
      <div
        className="fixed bottom-0 w-full left-1/2 transform -translate-x-1/2 p-12 bg-pink-200 rounded-full text-2xl font-bold cursor-pointer tracking-wider text-center"
        onClick={handleButtonClick}
      >
        위에서 보기
      </div>
    </>
  );
}

export default Temp;
