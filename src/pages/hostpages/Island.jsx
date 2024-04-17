import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import DogMesh from './DogMesh';
import DuckMesh from './DuckMesh';
import BearMesh from './BearMesh';

function GridBox({ dogPosition, onDogPositionChange, ...props }) {
  const mesh = useRef();
  const [objects, setObjects] = useState([]);

  const onClick = (e) => {
    const [x, y, z] = Object.values(e.point).map((coord) => Math.round(coord));
    const existingObject = objects.find((pos) => pos[0] === x && pos[2] === z);

    if (existingObject) {
      // 클릭한 박스의 위치와 캐릭터의 위치가 일치하는 경우에만 아이템 열기
      if (
        x === dogPosition[0] &&
        z === dogPosition[2] &&
        y === dogPosition[1]
      ) {
        alert('아이템을 열었습니다!'); // To do : 박스 열면 메세지 나오는 로직으로 변경
      }
    } else {
      setObjects([...objects, [x, 0.2, z]]);
      console.log(`박스 위치 : [${x}, ${y}, ${z}]`);
    }
  };

  return (
    <>
      <OrbitControls autoRotate autoRotateSpeed={0} />
      <mesh {...props} ref={mesh} onClick={onClick} scale={[1, 0.1, 1]}>
        <boxGeometry args={[5, 3, 5]} />
        <meshStandardMaterial attach="material" color="#a0e060" />
      </mesh>
      <mesh {...props} position={[0, -0.35, 0]} scale={[1, 0.4, 1]}>
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial attach="material" color="#b97a20" />
      </mesh>
      {objects.map((pos, index) => (
        <mesh key={index} position={pos}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      ))}
    </>
  );
}

function Island() {
  const [dogPosition, setDogPosition] = useState([0, 0, 0]);
  const [animal, setAnimal] = useState('dog');

  useEffect(() => {
    // To do : 백엔드 API 호출 - animal 값을 받아오는 로직 추가 필요
    const fetchedAnimal = 'dog';
    setAnimal(fetchedAnimal);
  }, []);

  // To do : 백엔드 연결 후 아래 코드 주석해제

  // let meshComponent;
  // if (animal === 'duck') {
  //   meshComponent = (
  //     <DuckMesh
  //       position={dogPosition}
  //       directionKeys={directionKeys}
  //       onPositionChange={onDogPositionChange}
  //     />
  //   );
  // } else if (animal === 'dog') {
  //   meshComponent = (
  //     <DogMesh
  //       position={dogPosition}
  //       directionKeys={directionKeys}
  //       onPositionChange={onDogPositionChange}
  //     />
  //   );
  // } else if (animal === 'bear') {
  //   meshComponent = (
  //     <BearMesh
  //       position={dogPosition}
  //       directionKeys={directionKeys}
  //       onPositionChange={onDogPositionChange}
  //     />
  //   );
  // }

  const directionKeys = {
    up: false,
    down: false,
    left: false,
    right: false
  };

  const baseUrl = 'localhost:4000';
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었어요.');
    } catch (err) {
      console.log(err);
    }
  };

  const onDogPositionChange = (newPosition) => {
    setDogPosition(newPosition);
  };

  return (
    <>
      <div className="fixed top-0 w-full left-1/2 transform -translate-x-1/2 p-12 bg-pink-200 rounded-full text-4xl font-bold cursor-pointer tracking-wider text-center">
        민서님의 Mailland
      </div>
      <Canvas camera={{ position: [0, 5, 7] }}>
        {/*  To do : 백엔드 연결 후 아래 DuckMesh 컴포넌트는 {meshComponent}로 변경 */}
        <DuckMesh
          position={dogPosition}
          directionKeys={directionKeys}
          onPositionChange={onDogPositionChange}
        />

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
        <GridBox position={[0, 0, 0]} dogPosition={dogPosition} />
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
