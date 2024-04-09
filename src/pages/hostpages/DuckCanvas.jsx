import React, { Suspense, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

function DuckCanvas() {
  const handleButtonClick = (event) => {
    // 클릭 이벤트 핸들러 구현
    console.log('Dog clicked!');
  };
  return (
    <button onClick={handleButtonClick}>
      <Canvas style={{ width: '800px', height: '600px' }}>
        {/* 캔버스 크기 조절 */}
        <ambientLight />
        <directionalLight />
        <OrbitControls />
        <Suspense fallback={null}>
          {/* 첫 번째 모델 */}
          <DuckMesh position={[0, 0, -10]} />
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

  useFrame((state, delta) => {
    const mesh = gltf.scene.children[0];
    mesh.rotation.y += 0.01; // 회전 추가
    mesh.position.y += Math.sin(state.clock.elapsedTime) * 0.01; // y축으로 움직임 추가
  });

  return (
    <primitive
      object={gltf.scene}
      position={props.position} // 위치 설정
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      near={0.1}
    />
  );
}

export default DuckCanvas;
