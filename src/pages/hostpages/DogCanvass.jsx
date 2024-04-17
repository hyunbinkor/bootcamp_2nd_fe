import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

function DogCanvass(props) {
  // 방향키 입력을 감지하는 객체
  const directionKeys = {
    up: false,
    down: false,
    left: false,
    right: false
  };

  // 방향키 입력 이벤트 핸들러
  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        directionKeys.up = true;
        break;
      case 'ArrowDown':
        directionKeys.down = true;
        break;
      case 'ArrowLeft':
        directionKeys.left = true;
        break;
      case 'ArrowRight':
        directionKeys.right = true;
        break;
      default:
        break;
    }
  });

  window.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'ArrowUp':
        directionKeys.up = false;
        break;
      case 'ArrowDown':
        directionKeys.down = false;
        break;
      case 'ArrowLeft':
        directionKeys.left = false;
        break;
      case 'ArrowRight':
        directionKeys.right = false;
        break;
      default:
        break;
    }
  });

  const handleButtonClick = () => {
    props.handleButtonClick(0, 'Dog');
  };

  return (
    <button className="mt-12" style={{ width: '400px', height: '500px' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        {/* 캔버스 크기 조절 */}
        <ambientLight />
        <directionalLight />
        <Suspense fallback={null}>
          {/* 카메라 컨트롤 추가 */}
          <OrbitControls />
          {/* 모델 */}
          <DogMesh
            position={[0, 0, -8]}
            handleButtonClick={handleButtonClick}
            directionKeys={directionKeys} // directionKeys 객체를 props로 전달
          />
        </Suspense>
      </Canvas>
    </button>
  );
}

function DogMesh(props) {
  const meshRef = useRef();
  const gltf = useLoader(
    GLTFLoader,
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/dog/model.gltf'
  );

  const handleButtonClick = () => {
    props.handleButtonClick('dog');
  };

  // 모델의 위치 초기화
  const [modelPosition, setModelPosition] = useState([0, 0, -8]);
  // 모델의 회전 초기화
  const [modelRotation, setModelRotation] = useState([0, 0, 0]);

  // 방향키 입력에 따라 모델 이동 및 회전
  useFrame(() => {
    if (props.directionKeys.up) {
      moveModel([0, 0.05, 0], [0, Math.PI, 0]);
    }
    if (props.directionKeys.down) {
      moveModel([0, -0.05, 0], [0, 0, 0]);
    }
    if (props.directionKeys.left) {
      moveModel([-0.05, 0, 0], [0, -Math.PI / 4, 0]);
    }
    if (props.directionKeys.right) {
      moveModel([0.05, 0, 0], [0, Math.PI / 4, 0]);
    }
  });

  // 모델 이동 함수
  const moveModel = (deltaPosition, rotation) => {
    // 새로운 위치 계산
    const newPosition = modelPosition.map(
      (value, index) => value + deltaPosition[index]
    );
    setModelPosition(newPosition);
    setModelRotation(rotation);
  };

  return (
    <>
      {/* 모델 */}
      <group ref={meshRef} position={modelPosition} rotation={modelRotation}>
        {/* 전체 모델 그룹 */}
        <primitive
          object={gltf.scene}
          scale={[2, 2, 2]}
          onClick={handleButtonClick}
        />
      </group>
    </>
  );
}

export default DogCanvass;
