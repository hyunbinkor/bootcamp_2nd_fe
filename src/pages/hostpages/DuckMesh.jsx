import React, { useRef, useState, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function DuckMesh({ directionKeys, onPositionChange }) {
  const meshRef = useRef();
  const gltf = useLoader(
    GLTFLoader,
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/duck/model.gltf'
  );

  const [position, setPosition] = useState([0, 0, 0]);
  const [rotation, setRotation] = useState([0, 0, 0]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      let deltaPosition = [0, 0, 0];
      let newRotation = rotation;
      switch (e.key) {
        case 'ArrowUp':
          deltaPosition = [0, 0, -0.1];
          newRotation = [0, Math.PI, 0];
          break;
        case 'ArrowDown':
          deltaPosition = [0, 0, 0.1];
          newRotation = [0, 0, 0];
          break;
        case 'ArrowLeft':
          deltaPosition = [-0.1, 0, 0];
          newRotation = [0, -Math.PI / 3, 0];
          break;
        case 'ArrowRight':
          deltaPosition = [0.1, 0, 0];
          newRotation = [0, Math.PI / 3, 0];
          break;
        default:
          break;
      }
      setPosition((prevPosition) => {
        const newPosition = prevPosition.map((value, index) => {
          const newValue = (value + deltaPosition[index]).toFixed(2);
          return Number(newValue);
        });
        console.log(`캐릭터 위치: [${newPosition.join(', ')}]`);
        return newPosition;
      });

      setRotation(newRotation);
    };

    const handlePositionChange = () => {
      onPositionChange(position);
    };

    window.addEventListener('keydown', handleKeyDown);
    handlePositionChange();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [rotation]);

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      <primitive
        object={gltf.scene}
        scale={[0.7, 0.7, 0.7]}
        directionKeys={directionKeys}
      />
    </group>
  );
}

export default DuckMesh;
