import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const useGLTF = (url) => {
  const response = useLoader(GLTFLoader, url);
  return response;
};

export default useGLTF;
