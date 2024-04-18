import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useGLTF } from '@react-three/drei';
import UserMesh from '../../components/3d_canvas/UserMesh';
import DogMesh from '../../components/3d_canvas/DogMesh'; //* To do: 테스트 후 삭제예정
import Modal from '../../components/atom/Modal';
import useAxios from '../../components/hooks/useAxios';

async function fetchAllMessage(id, pageNum, size) {
  try {
    const response = await axios.get(`/api/message/${id}/all`, {
      params: {
        count: pageNum,
        size: size
      }
    });

    return response.data;
  } catch (error) {
    console.error('메시지를 불러오는데 실패했습니다:', error);
    return null;
  }
}

function GLTFModel({ modelUrl, position, message }) {
  const { scene } = useGLTF(modelUrl);
  const { id } = useParams();
  const navigate = useNavigate();
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  const handleDecorationClick = () => {
    navigate(`/host/tree/${id}/message`, {
      state: { message, icon: modelUrl }
    });
  };

  return (
    <group>
      <primitive
        object={copiedScene}
        position={position}
        scale={0.3}
        onClick={() => handleDecorationClick()}
      />
      {/* 주변 조명 추가 */}

      {/* 방향성 조명 추가 */}
    </group>
  );
}

function GridBox(props) {
  return (
    <>
      <OrbitControls autoRotate autoRotateSpeed={0.2} />
      {/* 초록 상단 */}
      <mesh {...props} scale={[1, 0.1, 1]}>
        <boxGeometry args={[5, 3, 5]} />
        <meshStandardMaterial attach="material" color="#a0e060" />
      </mesh>
      <mesh {...props} position={[0, -0.35, 0]} scale={[1, 0.4, 1]}>
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial attach="material" color="#b97a20" />
      </mesh>
      {props.objects.map((obj, index) => {
        const { x, y, z } = obj.coordinate;
        // console.log(obj);
        return (
          <GLTFModel
            position={[x, 0.2, z]}
            key={crypto.randomUUID()}
            modelUrl={obj.icon}
            message={obj.message}
          />
        );
      })}
    </>
  );
}

function Island() {
  const [dogPosition, setDogPosition] = useState([0, 0, 0]);
  const [animal, setAnimal] = useState('dog');
  const [showModal, setShowModal] = useState(false);
  const { response, trigger } = useAxios({
    method: 'delete',
    url: '/api/user/delete' //*to do: api주소 맞는지 확인 필요
  });

  //계정삭제버튼 클릭
  const handleDeleteAccountClick = () => {
    setShowModal(true);
  };

  //모달창에서 닫기 클릭
  const handleModalClose = () => {
    setShowModal(false);
  };

  //모달창에서 완료 클릭
  const handleModalComplete = () => {
    trigger({
      Authorization: `Bearer ${Token}` // *To do : delete api로 수정
    });
    setShowModal(false);
  };

  // useEffect(() => {
  //   const token = document.cookie
  //     .split(';')
  //     .find((cookie) => cookie.startsWith('token='));
  //   if (token) {
  //     const authToken = token.split('=')[1];
  //     console.log('토큰:', authToken);
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  //   }
  // }, []);

  // useEffect(() => {
  //   // *To do : 백엔드 API 호출 - animal 값을 받아오는 로직 추가 필요
  //   const fetchedAnimal = 'dog';
  //   setAnimal(fetchedAnimal);
  // }, []);

  const directionKeys = {
    up: false,
    down: false,
    left: false,
    right: false
  };

  const baseUrl = 'localhost:4000';
  const [objects, setObjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const { id } = useParams();
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었어요.');
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === 'left') {
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      }
    } else if (direction === 'right') {
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const allMessage = await fetchAllMessage(id, pageNumber, 25);
      if (allMessage) {
        setObjects(allMessage);
      }
    };
    fetchMessages();
  }, [id, pageNumber]);

  const onDogPositionChange = (newPosition) => {
    setDogPosition(newPosition);
  };

  return (
    <>
      <div className="fixed top-0 w-full left-1/2 transform -translate-x-1/2 p-12 bg-pink-200 rounded-full text-4xl font-bold cursor-pointer tracking-wider text-center">
        민서님의 Mailland
      </div>
      <div className="relative z-50">
        <button
          className="absolute right-0 mr-4 mt-28 rounded-md p-1 bg-tbcolor border border-solid-2px text-sm"
          onClick={handleDeleteAccountClick} // 버튼 클릭 이벤트 핸들러를 추가합니다.
        >
          계정삭제
        </button>
        {showModal && (
          <Modal
            message="계정을 삭제하시겠습니까?"
            onClose={handleModalClose}
            onComplete={handleModalComplete}
          />
        )}
      </div>
      <Canvas camera={{ position: [0, 5, 7] }}>
        {/* To do : 백엔드 연결 후 아래 DogMesh를 UserMesh로 수정  */}
        <DogMesh
          position={dogPosition}
          directionKeys={directionKeys}
          onPositionChange={onDogPositionChange}
        />

        {/* 장면의 위쪽에서 부드러운 빛을 추가하여 장면의 느낌을 부드럽게  */}

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
          intensity={1.5}
          position={[0, 50, 0]}
        />

        <GridBox
          position={[0, 0, 0]}
          objects={objects}
          setObjects={setObjects}
        />
      </Canvas>

      <div
        className="fixed bottom-0 w-full left-1/2 transform -translate-x-1/2 p-12 bg-pink-200 rounded-full text-2xl font-bold cursor-pointer tracking-wider text-center"
        onClick={() => handleCopyClipBoard(`${baseUrl}${location.pathname}`)}
      >
        내 메일랜드 공유하기
      </div>
    </>
  );
}

export default Island;
