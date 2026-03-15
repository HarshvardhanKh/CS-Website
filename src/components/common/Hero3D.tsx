"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";

function HeroModel() {
  const { scene } = useGLTF("/Hero.glb");
  const ref = useRef<THREE.Group>(null);

  return (
    <primitive 
      ref={ref} 
      object={scene} 
      scale={4} 
      position={[0, 0, -2]} 
      rotation={[Math.PI / 2, 0, 0]} 
    />
  );
}

function IEEEModel() {
  const { scene } = useGLTF("/logos/ieee.glb");
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!scene) return;
    
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#F4A119"),
          roughness: 0.35,
          metalness: 0.4,
        });
      }
    });
  }, [scene]);

  return (
    <primitive 
      ref={ref} 
      object={scene} 
      scale={0.8} 
      position={[0, 0, 3]} 
      rotation={[Math.PI / 2, 0, 0]} 
    />
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-screen relative overflow-hidden flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight
          position={[-10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.2}
        />
        <Suspense fallback={null}>
          <HeroModel />
          <IEEEModel />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
