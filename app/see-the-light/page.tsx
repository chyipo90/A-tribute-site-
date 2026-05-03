"use client";

import { Canvas } from "@react-three/fiber";
import GeorgiaMesh3D from "@/app/components/GeorgiaMesh3D";

export default function SeeTheLightPage() {
  return (
    <main
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundColor: "var(--bg-primary)",
      }}
    >
      <Canvas
        camera={{
          position: [8.20, 7.92, 6.32],
          fov: 60,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        {/* Georgia */}
        <GeorgiaMesh3D />
      </Canvas>
    </main>
  );
}