"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function SeeTheLightPage() {
  return (
    <main
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        {/* Ground plane — 20×20 units, lying flat (rotated -90° on X axis) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1a1a2e" />
        </mesh>

        {/* Camera controls — drag to orbit, scroll to zoom */}
        <OrbitControls />
      </Canvas>
    </main>
  );
}