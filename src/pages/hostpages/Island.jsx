import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useGLTF } from '@react-three/drei';
import UserMesh from '../../components/3d_canvas/UserMesh';
// import Modal from '../../components/atom/Modal';
import useAxios from '../../components/hooks/useAxios';
import DeleteUser from '../../components/atom/DeleteUser';

async function getUserInfo(id) {
  try {
    const response = await axios.get(`/api/tree/info?treeId=${id}`);
    return response;
  } catch (error) {
    console.error('유저정보를 불러오는데 실패했습니다:', error);
    return null;
  }
}

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
  const copiedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <group>
      <primitive object={copiedScene} position={position} scale={0.3} />
    </group>
  );
}

function GridBox(props) {
  const [duckPosition, setDuckPosition] = useState([0, 0, 0]);
  let message = null;
  let icon = null;
  const navigate = useNavigate();
  const { id } = useParams();

  const navigateWithMessage = (message, icon) => {
    navigate(`/host/tree/${id}/message`, {
      state: { message: message, icon: icon }
    });
  };

  const onClick = (e) => {
    const [x, y, z] = Object.values(e.point).map((coord) => Math.round(coord));
    setDuckPosition([x, y, z]);

    // props.objects가 비어 있지 않은 경우에만 find 함수 호출
    if (props.objects.length > 0) {
      // x, y, z 값이 모두 일치하는 데이터 찾기
      const matchingObject = props.objects.find(
        (obj) =>
          obj.coordinate.x === x &&
          obj.coordinate.y === y &&
          obj.coordinate.z === z
      );

      // 일치하는 데이터가 있을 경우 해당 메시지를 상태로 설정
      if (matchingObject) {
        console.log(matchingObject.icon);
        message = matchingObject.message;
        icon = matchingObject.icon;

        setTimeout(() => {
          navigateWithMessage(message, icon);
        }, 1000);
      }
    }
  };

  return (
    <>
      <OrbitControls autoRotate autoRotateSpeed={0.2} />
      <UserMesh userPosition={duckPosition} character={props.character} />
      {/* 초록 상단 */}
      <mesh {...props} scale={[1, 0.1, 1]} onClick={onClick} position-y={-0.12}>
        <boxGeometry args={[5, 3, 5]} />
        <meshStandardMaterial attach="material" color="#a0e060" />
      </mesh>
      <mesh
        {...props}
        position={[0, -0.35, 0]}
        scale={[1, 0.4, 1]}
        position-y={-0.47}
      >
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial attach="material" color="#b97a20" />
      </mesh>
      {props.objects.length > 0 &&
        props.objects.map((obj, index) => {
          const { x, y, z } = obj.coordinate;
          return (
            <GLTFModel
              position={[x, 0.13, z]}
              key={`object-${index}`}
              modelUrl={obj.icon}
              message={obj.message}
            />
          );
        })}
    </>
  );
}

function Island() {
  // const [showModal, setShowModal] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const modifiedPathname = location.pathname.replace('/host/', '/guest/');
  const [objects, setObjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const { id } = useParams();
  const [userObj, setUserObj] = useState({
    data: {
      nickName: ''
    }
  });
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
        console.log('L');
        setPageNumber(pageNumber - 1);
      }
    } else if (direction === 'right') {
      console.log('L');

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

    const userInfo = async () => {
      const info = await getUserInfo(id);
      if (info) {
        setUserObj(info);
      }
    };
    fetchMessages();
    userInfo();
  }, [id, pageNumber, userObj.data.nickName]);

  return (
    <>
      <div className="fixed top-0 w-full left-1/2 transform -translate-x-1/2 p-12 bg-pink-200 rounded-full text-4xl font-bold cursor-pointer tracking-wider text-center">
        {userObj.data && userObj.data.nickName}님의 Mailland
      </div>

      <DeleteUser />
      <Canvas camera={{ position: [0, 5, 7] }}>
        {/* To do : 백엔드 연결 후 아래 DogMesh를 UserMesh로 수정  */}
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
          character={userObj && userObj.data.animal}
        />
      </Canvas>

      <div className="fixed flex justify-around bottom-0 w-full left-1/2 transform -translate-x-1/2 p-12 bg-pink-200 rounded-full text-2xl font-bold cursor-pointer tracking-wider">
        <button onClick={() => handlePageChange('left')}>L</button>
        <div
          className="text-centered"
          onClick={() => handleCopyClipBoard(`${baseUrl}${modifiedPathname}`)}
        >
          내 메일랜드 공유하기
        </div>
        <button onClick={() => handlePageChange('right')}>R</button>
      </div>
    </>
  );
}

export default Island;
