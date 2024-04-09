import React, { Suspense, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from '@react-three/drei';

function QuestionCanvas() {
  return (
    <Canvas style={{ width: '800px', height: '600px' }}>
      {/* 캔버스 크기 조절 */}
      <ambientLight />
      <directionalLight />
      <OrbitControls />
      <Suspense fallback={null}>
        {/* 첫 번째 모델 */}
        <DuckMesh position={[0, 0, -10]} />
        {/* 두 번째 모델 */}
        <DogMesh position={[-5, 0, -10]} />
        {/* 세 번째 모델 */}
        <BearMesh position={[5, 0, -10]} />
      </Suspense>
    </Canvas>
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

function DogMesh(props) {
  const [hovered, setHover] = useState(false);
  const gltf = useLoader(
    GLTFLoader,
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/dog/model.gltf'
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

function BearMesh(props) {
  const [hovered, setHover] = useState(false);
  const gltf = useLoader(
    GLTFLoader,
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bear/model.gltf'
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

export default QuestionCanvas;
