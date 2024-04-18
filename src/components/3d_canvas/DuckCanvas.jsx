import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import Ground from './Ground';

function DuckCanvas(props) {
  const [stopRotation, setStopRotation] = useState(false);

  const handleButtonClick = () => {
    props.handleButtonClick(1, 'Duck');
    setStopRotation(!stopRotation); // 클릭 시 회전 멈추기/재개하기
  };

  return (
    <button className="mt-12" style={{ width: '400px', height: '500px' }}>
      <div className=" bg-white p-4 rounded-full shadow-md mx-36 ml-36">
        <p className="text-ttcolor">오리</p>
      </div>
      <div className="bg-white p-3 rounded-full shadow-md mx-48"></div>
      <div className="bg-white p-2 rounded-full shadow-md mx-48"></div>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <ambientLight />
        <directionalLight />
        <Suspense fallback={null}>
          <OrbitControls />
          <DuckMesh
            position={[0, 0, -8]}
            handleButtonClick={handleButtonClick}
            stopRotation={stopRotation}
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

  const targetRotation = props.stopRotation ? 0 : Math.PI / 2; // 정면을 보도록 회전값 설정

  useFrame(() => {
    if (!props.stopRotation) {
      meshRef.current.rotation.y += 0.05;
    } else if (meshRef.current.rotation.y !== targetRotation) {
      // 서서히 멈추고 정면으로 회전
      meshRef.current.rotation.y +=
        (targetRotation - meshRef.current.rotation.y) * 0.05;
    }
  });

  const handleButtonClick = () => {
    props.handleButtonClick('duck');
  };

  return (
    <primitive
      object={gltf.scene}
      position={props.position}
      scale={[5, 5, 5]}
      ref={meshRef}
      onClick={handleButtonClick}
    />
  );
}

export default DuckCanvas;
