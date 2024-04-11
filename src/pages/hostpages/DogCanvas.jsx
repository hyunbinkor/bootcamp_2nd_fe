import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

function DogCanvas(props) {
  const handleButtonClick = () => {
    props.handleButtonClick(0, 'Dog');
  };

  return (
    <button>
      <Canvas className="mt-32" style={{ width: '400px', height: '500px' }}>
        {/* 캔버스 크기 조절 */}
        <ambientLight />
        <directionalLight />
        <OrbitControls />
        <Suspense fallback={null}>
          {/* 첫 번째 모델 */}
          <DogMesh
            position={[0, 0, -10]}
            handleButtonClick={handleButtonClick}
          />
        </Suspense>
      </Canvas>
    </button>
  );
}

function DogMesh(props) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const gltf = useLoader(
    GLTFLoader,
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/dog/model.gltf'
  );

  const handleButtonClick = () => {
    props.handleButtonClick('Dog');
  };

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

export default DogCanvas;
