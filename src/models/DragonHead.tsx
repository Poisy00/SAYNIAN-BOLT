import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DragonHead({ ...props }) {
  const group = useRef();

  // Create basic materials
  const dragonMaterial = new THREE.MeshStandardMaterial({
    color: '#9F1D22',
    metalness: 0.7,
    roughness: 0.3
  });

  const eyesMaterial = new THREE.MeshStandardMaterial({
    color: '#ff0000',
    emissive: '#ff0000',
    emissiveIntensity: 1
  });

  const pearlMaterial = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.1
  });

  // Animate dragon
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      // Subtle breathing animation
      group.current.rotation.x = Math.sin(t * 0.5) * 0.05;
      // Eye glow pulsing
      if (eyesMaterial) {
        eyesMaterial.emissiveIntensity = Math.sin(t * 2) * 0.5 + 1;
      }
    }
  });

  // Create basic geometry for fallback dragon head
  const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const snoutGeometry = new THREE.ConeGeometry(0.3, 0.8, 32);
  const eyeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
  const hornGeometry = new THREE.ConeGeometry(0.1, 0.4, 16);
  const pearlGeometry = new THREE.SphereGeometry(0.15, 32, 32);

  return (
    <group ref={group} {...props}>
      {/* Head */}
      <mesh geometry={headGeometry} material={dragonMaterial}>
        {/* Snout */}
        <mesh
          geometry={snoutGeometry}
          material={dragonMaterial}
          position={[0, 0, 0.6]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        
        {/* Eyes */}
        <mesh
          geometry={eyeGeometry}
          material={eyesMaterial}
          position={[0.25, 0.2, 0.35]}
        />
        <mesh
          geometry={eyeGeometry}
          material={eyesMaterial}
          position={[-0.25, 0.2, 0.35]}
        />
        
        {/* Horns */}
        <mesh
          geometry={hornGeometry}
          material={dragonMaterial}
          position={[0.2, 0.4, 0]}
          rotation={[0.3, 0, 0.3]}
        />
        <mesh
          geometry={hornGeometry}
          material={dragonMaterial}
          position={[-0.2, 0.4, 0]}
          rotation={[0.3, 0, -0.3]}
        />
        
        {/* Pearl */}
        <mesh
          geometry={pearlGeometry}
          material={pearlMaterial}
          position={[0, 0.6, 0]}
        />
      </mesh>
    </group>
  );
}