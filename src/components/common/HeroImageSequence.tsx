"use client";

import React, { useRef, useEffect, useState, Suspense, useLayoutEffect } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float } from "@react-three/drei";

import * as THREE from "three";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#F5A623"),
          roughness: 0.35,
          metalness: 0.4,
        });
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Continuous spin around its vertical axis
      modelRef.current.rotation.z += delta * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive 
        ref={modelRef}
        object={scene} 
        scale={0.35} 
        position={[0, 0, 0]} 
        rotation={[Math.PI / 2, 0, Math.PI / 2]} 
      />
    </Float>
  );
}

export default function HeroImageSequence({ scrollContainerRef }: { scrollContainerRef?: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // Cross-fade logic: 2D sequence fades out as 3D model fades in at the very end
  const sequenceOpacity = useTransform(scrollYProgress, [0, 0.94, 0.98], [1, 1, 0]);
  const modelOpacity = useTransform(scrollYProgress, [0.94, 0.98, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const totalFrames = 36;

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(4, '0');
        img.src = `/Heroimg/${frameIndex}.png`;
        img.onload = () => {
            loadedCount++;
            if (loadedCount === totalFrames) {
                setImages(loadedImages);
                renderFrame(0); // Render first frame
            }
        };
        loadedImages[i - 1] = img;
    }
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    } else {
        drawWidth = canvas.height * imgRatio;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === totalFrames && latest < 0.98) {
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * totalFrames)
        );
        renderFrame(frameIndex);
    }
  });

  useEffect(() => {
    const handleResize = () => {
        if (images.length === totalFrames) {
            const currentFrame = Math.min(
                totalFrames - 1,
                Math.floor(scrollYProgress.get() * totalFrames)
            );
            renderFrame(currentFrame);
        }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  return (
    <div className="w-full h-screen relative overflow-hidden flex items-center justify-center bg-transparent">
      {/* 2D Image Sequence Canvas */}
      <motion.div 
        style={{ scale, opacity: sequenceOpacity }}
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />
      </motion.div>

      {/* 3D Model Canvas */}
      <motion.div 
        style={{ opacity: modelOpacity }}
        className="absolute inset-0 z-20"
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Suspense fallback={null}>
            <Model url="/logos/ieee.glb" />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </motion.div>
    </div>
  );
}
