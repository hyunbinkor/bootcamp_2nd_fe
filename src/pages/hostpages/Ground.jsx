import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Circle } from '@react-three/drei';

function Ground() {
  const groundRef = useRef();
  useFrame(() => {
    groundRef.current.rotation.y += 0.05; // 바닥 회전
  });
  return (
    <mesh receiveShadow position={[0, -1, 0]} castShadow ref={groundRef}>
      <Circle args={[1, 64]} rotation={[-Math.PI / 2, 0, 0]} />
      <meshStandardMaterial color="#b5b19f" />
    </mesh>
  );
}

export default Ground;
