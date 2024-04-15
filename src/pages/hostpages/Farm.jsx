import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import DogCanvass from './DogCanvass';

const Farm = () => {
  const [position, setPosition] = useState([0, 0, -20]);
  return (
    <div>
      <DogCanvass />
    </div>
  );
};

export default Farm;
