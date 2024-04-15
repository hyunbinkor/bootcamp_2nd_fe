import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';

function DogCanvass(props) {
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
  // 머리의 회전 초기화
  const [headRotation, setHeadRotation] = useState(0);

  // 발자국 효과를 담을 배열
  const [footprints, setFootprints] = useState([]);

  // 방향키 입력에 따라 모델 이동 및 회전
  useFrame(() => {
    if (directionKeys.up) {
      moveModel([0, 0.05, 0], [0, Math.PI, 0]);
    }
    if (directionKeys.down) {
      moveModel([0, -0.05, 0], [0, 0, 0]);
    }
    if (directionKeys.left) {
      moveModel([-0.05, 0, 0], [0, -Math.PI / 4, 0]);
    }
    if (directionKeys.right) {
      moveModel([0.05, 0, 0], [0, Math.PI / 4, 0]);
    }
  });

  // 모델 이동 및 발자국 생성
  const moveModel = (deltaPosition, rotation) => {
    // 새로운 위치 계산
    const newPosition = modelPosition.map(
      (value, index) => value + deltaPosition[index]
    );
    setModelPosition(newPosition);
    setModelRotation(rotation);

    // 발자국 생성
    createFootprint(newPosition);
  };

  // 발자국 생성 함수
  const createFootprint = (position) => {
    const newFootprint = {
      position: new Vector3(position[0], position[1], position[2]), // 발자국의 Z 인덱스를 모델의 Z 인덱스와 동일하게 설정
      life: 100 // 발자국이 사라지기까지의 수명
    };

    setFootprints([...footprints, newFootprint]);
  };

  // 발자국 갱신
  useFrame(() => {
    setFootprints(
      footprints
        .map((footprint) => {
          // 발자국의 수명 감소
          footprint.life -= 1;
          return footprint;
        })
        .filter((footprint) => footprint.life > 0) // 수명이 남아있는 발자국만 남김
    );
  });

  return (
    <>
      {/* 발자국 생성 */}
      {footprints.map((footprint, index) => (
        <mesh key={index} position={footprint.position}>
          <sphereGeometry args={[0.02, 16, 16]} /> {/* 작은 크기의 발자국 */}
          <meshPhongMaterial color="black" />
        </mesh>
      ))}
      {/* 모델 */}
      <group ref={meshRef} position={modelPosition} rotation={modelRotation}>
        {/* 전체 모델 그룹 */}
        <primitive
          object={gltf.scene}
          scale={[3, 3, 3]}
          onClick={handleButtonClick}
        />
      </group>
    </>
  );
}

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

export default DogCanvass;
