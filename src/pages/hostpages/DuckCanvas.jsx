import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

function DuckCanvas(props) {
  const handleButtonClick = () => {
    props.handleButtonClick(1, 'Duck');
  };

  return (
    <button>
      <Canvas className="mt-32" style={{ width: '400px', height: '500px' }}>
        {/* 캔버스 크기 조절 */}
        <ambientLight />
        <directionalLight />
        <Suspense fallback={null}>
          {/* 카메라 컨트롤 추가 */}
          <OrbitControls />
          {/* 모델 */}
          <DuckMesh
            position={[0, 0, -10]}
            handleButtonClick={handleButtonClick}
          />
        </Suspense>
      </Canvas>
    </button>
  );
}

function DuckMesh(props) {
  const [hovered, setHover] = useState(false);
  const gltf = useLoader(
    GLTFLoader,
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf'
  );

  const meshRef = useRef();

  const handleButtonClick = () => {
    props.handleButtonClick('duck');
  };

  // 모델 회전
  useFrame(() => {
    meshRef.current.rotation.y += 0.05;
  });

  return (
    <primitive
      object={gltf.scene}
      position={props.position} // 위치 설정
      scale={[5, 5, 5]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={handleButtonClick}
      ref={meshRef}
    />
  );
}

export default DuckCanvas;
