import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useGLTF } from '@react-three/drei';


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
        scale={0.5}
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
      {/* 갈색 겹 추가 */}
      <mesh {...props} position={[0, -0.35, 0]} scale={[1, 0.4, 1]}>
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial attach="material" color="#b97a20" />
      </mesh>
      {props.objects.map((obj, index) => {
        const { x, y, z } = obj.coordinate;
        console.log(obj);
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

  return (
    <>
      <div className="fixed top-0 w-full left-1/2 transform -translate-x-1/2 p-12 bg-pink-200 rounded-full text-4xl font-bold cursor-pointer tracking-wider text-center">
        민서님의 Mailland
      </div>
      <Canvas camera={{ position: [0, 5, 7] }}>
        <ambientLight intensity={1} />

        {/* 장면의 위쪽에서 부드러운 빛을 추가하여 장면의 느낌을 부드럽게  */}
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
