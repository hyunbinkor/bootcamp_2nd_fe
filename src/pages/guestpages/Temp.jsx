import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function GridBox(props) {
  const mesh = useRef();
  const [objects, setObjects] = useState([]);
  const [previewPosition, setPreviewPosition] = useState(null); // 미리보기 Mesh 위치 상태 추가

  const onClick = (e) => {
    const [x, y, z] = Object.values(e.point).map((coord) => Math.round(coord));
  
    // y축 위치와 함께 x, z축 위치가 그리드 범위 내에 있는지 확인
    if (Math.abs(y) < 0.1 && x >= -2 && x <= 2 && z >= -2 && z <= 2) {
      const newObjectPosition = [x, 0.3, z];
      setObjects([...objects, newObjectPosition]);
    }
    console.log(objects)
  };
  

  const onPointerMove = (e) => {
    const [x, y, z] = Object.values(e.point).map((coord) => Math.round(coord));
    if (Math.abs(y) < 0.5) {
      const newPreviewPosition = [x, 0.3, z];
      setPreviewPosition(newPreviewPosition);
    } else {
      setPreviewPosition(null); // 마우스가 그리드 바깥으로 이동했을 때 미리보기 위치를 null로 설정
    }
  };

  return (
    <>
      <OrbitControls  autoRotateSpeed={1} />
      <mesh {...props} ref={mesh} onClick={onClick} onPointerMove={onPointerMove} scale={[1, 0.1, 1]}>
        <boxGeometry args={[5, 3, 5]} />
        <meshStandardMaterial attach="material" color="#a0e060" />
      </mesh>
      <mesh {...props} position={[0, -0.35, 0]} scale={[1, 0.4, 1]}>
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial attach="material" color="#b97a20" />
      </mesh>
      {objects.map((pos, index) => (
        <mesh key={index} position={pos}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      ))}
      {previewPosition && ( // 미리보기 Mesh 렌더링
        <mesh position={previewPosition}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="blue" opacity={0.5} transparent />
        </mesh>
      )}
    </>
  );
}


function Temp() {
  const [cameraPosition, setCameraPosition] = useState([0, 5, 7]);

  const handleButtonClick = () => {
    setCameraPosition([0, 10, 0]); // 카메라 위치 변경

  };

  const CameraController = () => {
    const { camera } = useThree();
    useEffect(() => {
      camera.position.set(...cameraPosition);
      camera.lookAt(0, 0, 0);
    }, [camera, cameraPosition]);
    return null;
  };

  return (
    <>
      <div className="fixed top-0 w-full left-1/2 transform -translate-x-1/2 p-12 bg-pink-200 rounded-full text-4xl font-bold cursor-pointer tracking-wider text-center">
        민서님의 Mailland
      </div>
      <Canvas camera={{ position: cameraPosition }}>
        <CameraController />
        <ambientLight intensity={1} />
        <spotLight position={[10, 15, 10]} angle={0.3} penumbra={0.2} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <hemisphereLight skyColor={'#ffffff'} groundColor={'#b97a20'} intensity={1} position={[0, 50, 0]} />
        <GridBox position={[0, 0, 0]} />
      </Canvas>
      <div
        className="fixed bottom-0 w-full left-1/2 transform -translate-x-1/2 p-12 bg-pink-200 rounded-full text-2xl font-bold cursor-pointer tracking-wider text-center"
        onClick={handleButtonClick}
      >
        새 글 쓰기
      </div>
    </>
  );
}

export default Temp;
