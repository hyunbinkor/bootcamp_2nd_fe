import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useGLTF } from '@react-three/drei';

async function getUserInfo(id){
  try{
    const response = await axios.get(`/api/tree/info?treeId=${id}`)
    return response
  }
  catch (error) {
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
function GLTFModel({ modelUrl, position }) {
  const { scene } = useGLTF(modelUrl);
  const copiedScene = useMemo(() => scene.clone(), [scene]);
  return (
    <group>
      <primitive object={copiedScene} position={position} scale={0.5} />
    </group>
  );
}

function GridBox(props) {
  return (
    <>
      <OrbitControls autoRotate autoRotateSpeed={0.2} />
      <mesh {...props} scale={[1, 0.1, 1]}>
        <boxGeometry args={[5, 3, 5]} />
        <meshStandardMaterial attach="material" color="#a0e060" />
      </mesh>
      <mesh {...props} position={[0, -0.35, 0]} scale={[1, 0.4, 1]}>
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial attach="material" color="#b97a20" />
      </mesh>

      {props.objects.length > 0 && props.objects.map((obj, index) => {
        const { x, z } = obj.coordinate;
        return (
          <GLTFModel
            key={crypto.randomUUID()}
            position={[x, 0.2, z]}
            modelUrl={obj.icon}
          />
        );
      })}
    </>
  );
}

function Island() {
  const navigate = useNavigate();
  const [objects, setObjects] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [userObj, setUserObj] = useState("");
  const { id } = useParams();

  const handleButtonClick = (pageNumber) => {
    navigate(`/guest/tree/${id}/image`, {
      state: { pageNumber }
    });
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

    const userInfo = async ()=>{
      const info = await getUserInfo(id);
      console.log(info)
      if (info){
        setUserObj(info)
      }
    }
    userInfo();
    fetchMessages();
  }, [id, pageNumber]);

  return (
    <>
      <div className="fixed top-0 w-full left-1/2 transform -translate-x-1/2 p-12 bg-pink-200 rounded-full text-4xl font-bold cursor-pointer tracking-wider text-center">
      {userObj.data && userObj.data.nickName}님의 Mailland
      </div>
      <Canvas camera={{ position: [0, 5, 7] }}>
        <ambientLight intensity={1} />

        <hemisphereLight
          skyColor={'#ffffff'}
          groundColor={'#b97a20'}
          intensity={1.5}
          position={[0, 50, 0]}
        />
        {/* GridBox에 objects와 setObjects를 전달 */}
        <GridBox
          position={[0, 0, 0]}
          objects={objects}
          setObjects={setObjects}
        />
      </Canvas>
      <div className="fixed flex justify-around bottom-0 w-full left-1/2 transform -translate-x-1/2 p-12 bg-pink-200 rounded-full text-2xl font-bold cursor-pointer tracking-wider">
        <button onClick={() => handlePageChange('left')}>L</button>
        <div className="text-centered" onClick={()=>{handleButtonClick(pageNumber)}}>
          새 글 쓰기
        </div>
        <button onClick={() => handlePageChange('right')}>R</button>
      </div>
    </>
  );
}

export default Island;
