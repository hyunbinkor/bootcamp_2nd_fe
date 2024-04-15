import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function DogMesh(props) {
  const meshRef = useRef();
  const gltf = useLoader(
    GLTFLoader,
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/dog/model.gltf'
  );

  useFrame(() => {
    meshRef.current.rotation.y += 0.01; // 더 부드러운 회전을 위해 값 조정
  });

  return (
    <primitive
      object={gltf.scene}
      position={props.position}
      scale={[5, 5, 5]}
      onClick={props.handleButtonClick}
      ref={meshRef}
      castShadow
    />
  );
}

export default DogMesh;
