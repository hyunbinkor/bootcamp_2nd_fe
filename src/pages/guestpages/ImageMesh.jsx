import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function ImageMesh({ modelUrl }) {
  const modelRef = useRef(); // 모델 참조를 위한 ref
  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태

  useFrame(() => {
    if (isHovered) {
      modelRef.current.rotation.y += 0.07;
    } else {
      modelRef.current.rotation.y = 0;
    }
  });
  const { scene } = useGLTF(modelUrl);

  return (
    <primitive
      object={scene}
      scale={2.5}
      position={[0, -2, 0]}
      ref={modelRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    />
  );
}

export default ImageMesh;
