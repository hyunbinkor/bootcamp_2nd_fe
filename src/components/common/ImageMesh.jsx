import React, { useState, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export function ImageMesh({ modelUrl, scale, position }) {
  const modelRef = useRef(); // 모델 참조를 위한 ref
  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태

  if (!scale) {
    scale = 2.5;
  }
  if (!position) {
    position = [0, -2, 0];
  }

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
      scale={scale}
      position={position}
      ref={modelRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    />
  );
}
