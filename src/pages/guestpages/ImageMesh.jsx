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

// export function MessageInImageMesh({ modelUrl }) {
//   const modelRef = useRef(); // 모델 참조를 위한 ref
//   const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태
//   const [isDragging, setIsDragging] = useState(false); // 드래그 상태
//   const { size, viewport } = useThree();
//   const aspect = size.width / viewport.width;

//   useFrame((state) => {
//     if (isHovered) {
//       modelRef.current.rotation.y += 0.07;
//     } else {
//       modelRef.current.rotation.y = 0;
//     }
//   });

//   const { scene } = useGLTF(modelUrl);

//   const handlePointerDown = (event) => {
//     setIsDragging(true);
//     event.target.setPointerCapture(event.pointerId);
//   };

//   const handlePointerMove = (event) => {
//     if (isDragging) {
//       // 마우스 드래그에 따라 이미지 위치 변경
//       modelRef.current.position.x += event.movementX / aspect;
//       modelRef.current.position.y -= event.movementY / aspect;
//     }
//   };

//   const handlePointerUp = (event) => {
//     setIsDragging(false);
//     event.target.releasePointerCapture(event.pointerId);
//   };

//   return (
//     <primitive
//       object={scene}
//       scale={2.5}
//       position={[0, -2, 0]}
//       ref={modelRef}
//       onPointerOver={() => setIsHovered(true)}
//       onPointerOut={() => setIsHovered(false)}
//       onPointerDown={handlePointerDown}
//       onPointerMove={handlePointerMove}
//       onPointerUp={handlePointerUp}
//     />
//   );
// }
