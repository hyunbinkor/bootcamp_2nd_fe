import React, { Suspense, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import DogMesh from './DogCanvas';
import DuckMesh from './DuckCanvas';
import BearMesh from './BearCanvas';

function AnimalCanvas(props) {
  const { handleButtonClick } = props;

  return (
    <button>
      <Canvas className="mt-40" style={{ width: '400px', height: '400px' }}>
        {/* 캔버스 크기 조절 */}
        <ambientLight />
        <directionalLight />
        <OrbitControls />
        <Suspense fallback={null}>
          {/* 첫 번째 모델 */}

          <DogMesh
            position={[0, 0, -10]}
            handleButtonClick={handleButtonClick}
          />
          <DuckMesh
            position={[0, 0, -10]}
            handleButtonClick={handleButtonClick}
          />
          <BearMesh
            position={[0, 0, -10]}
            handleButtonClick={handleButtonClick}
          />
        </Suspense>
      </Canvas>
    </button>
  );
}

export default AnimalCanvas;
