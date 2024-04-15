import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import DogMesh from './DogMesh';

const Farm = () => {
  const [position, setPosition] = useState([0, 0, -20]);
  return (
    <div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <DogMesh position={position} />
      </Canvas>
    </div>
  );
};

export default Farm;
