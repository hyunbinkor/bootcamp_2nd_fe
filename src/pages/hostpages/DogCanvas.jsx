import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ContactShadows } from '@react-three/drei';
import DogMesh from './DogMesh';
import Ground from './Ground';

function DogCanvas(props) {
  const handleButtonClick = () => {
    props.handleButtonClick(2, 'Dog');
  };

  return (
    <button className="mt-12" style={{ width: '400px', height: '500px' }}>
      <div className=" bg-white p-4 rounded-full shadow-md mx-36 ml-36">
        <p className="text-ttcolor">강아지</p>
      </div>
      <div className="bg-white p-3 rounded-full shadow-md mx-48"></div>
      <div className="bg-white p-2 rounded-full shadow-md mx-48"></div>

      <Canvas shadows style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 0]} intensity={0.6} castShadow />
        <Suspense fallback={null}>
          <OrbitControls />
          <DogMesh
            position={[0, 0, -8]}
            handleButtonClick={handleButtonClick}
            receiveShadow
          />
          <Ground />
          <ContactShadows
            rotationX={Math.PI / 2}
            position={[0, -3.5, -8]}
            opacity={0.7}
            width={10}
            height={10}
            blur={2}
            far={4.5}
          />
        </Suspense>
      </Canvas>
    </button>
  );
}

export default DogCanvas;
