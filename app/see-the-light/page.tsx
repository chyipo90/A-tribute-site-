"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

// A single rotating cube — sanity check that R3F is wired up correctly.
function SpinningCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#888888" />
    </mesh>
  );
}

export default function SeeTheLightPage() {
  return (
    <main
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Scene contents */}
        <SpinningCube />
      </Canvas>
    </main>
  );
}