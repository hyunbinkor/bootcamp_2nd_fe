import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import Ground from './Ground';

function DuckCanvas(props) {
  const handleButtonClick = () => {
    props.handleButtonClick(2, 'Duck');
  };

  return (
    <button className="mt-12" style={{ width: '400px', height: '500px' }}>
      <div className=" bg-white p-4 rounded-full shadow-md mx-36 ml-36">
        <p className="text-ttcolor">오리</p>
      </div>
      <div className="bg-white p-3 rounded-full shadow-md mx-48"></div>
      <div className="bg-white p-2 rounded-full shadow-md mx-48"></div>
      <Canvas style={{ width: '100%', height: '100%' }}>
        {/* 캔버스 크기 조절 */}
        <ambientLight />
        <directionalLight />
        <Suspense fallback={null}>
          {/* 카메라 컨트롤 추가 */}
          <OrbitControls />
          {/* 모델 */}
          <DuckMesh
            position={[0, 0, -8]}
            handleButtonClick={handleButtonClick}
          />
          <Ground position={[0, -3, 0]} />
        </Suspense>
      </Canvas>
    </button>
  );
}

function DuckMesh(props) {
  const meshRef = useRef();
  const gltf = useLoader(
    GLTFLoader,
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf'
  );

  const handleButtonClick = () => {
    props.handleButtonClick('Duck');
  };

  useFrame(() => {
    meshRef.current.rotation.y += 0.05;
  });

  return (
    <primitive
      object={gltf.scene}
      position={props.position} // 위치 설정
      scale={[5, 5, 5]}
      onClick={handleButtonClick}
      ref={meshRef}
    />
  );
}

export default DuckCanvas;
