import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function GridBox(props) {
  const mesh = useRef();
  const [objects, setObjects] = useState([]);

  const onClick = (e) => {
    const [x, y, z] = Object.values(e.point).map((coord) => Math.round(coord));

    if (Math.abs(y) < 0.1) {
      const newObjectPosition = [x, 0.3, z]; //
      setObjects([...objects, newObjectPosition]);
    }
  };

  return (
    <>
      <OrbitControls autoRotate autoRotateSpeed={1} />
      {/* 초록 상단 */}
      <mesh {...props} ref={mesh} onClick={onClick} scale={[1, 0.1, 1]}>
        <boxGeometry args={[5, 3, 5]} />
        <meshStandardMaterial attach="material" color="#a0e060" />
      </mesh>
      {/* 갈색 겹 추가 */}
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
  const baseUrl = 'localhost:4000';
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었어요.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="fixed top-0 w-full left-1/2 transform -translate-x-1/2 p-12 bg-pink-200 rounded-full text-4xl font-bold cursor-pointer tracking-wider text-center">
        민서님의 Mailland
      </div>
      <Canvas camera={{ position: [0, 5, 7] }}>
        <ambientLight intensity={1} />

        {/* 주요 조명 */}
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={0.2}
          intensity={2}
          castShadow
        />

        {/* 보조 조명 */}
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        {/* 장면의 위쪽에서 부드러운 빛을 추가하여 장면의 느낌을 부드럽게  */}
        <hemisphereLight
          skyColor={'#ffffff'}
          groundColor={'#b97a20'}
          intensity={1}
          position={[0, 50, 0]}
        />
        <GridBox position={[0, 0, 0]} />
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
