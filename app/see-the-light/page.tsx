"use client";

import GeorgiaMap from "../components/GeorgiaMap";
import SpiritParticles from "../components/SpiritParticles";

export default function SeeTheLightPage() {
  return (
    <main
      className="relative w-screen h-screen overflow-hidden"
      style={{
        backgroundColor: "var(--bg-primary)",
        perspective: "1200px",
        perspectiveOrigin: "center 40%",
      }}
    >
      {/* Particles drift in flat 2D space, ambient in the void */}
      <SpiritParticles />

      {/* The map sits on a tilted plane in 3D space */}
      <div
  className="absolute inset-0"
  style={{
    transformStyle: "preserve-3d",
    transform: "rotateX(55deg) translate(-7%, -5%) scale(0.95)",
    transformOrigin: "48% center",
  }}
>
  <GeorgiaMap />
</div>
    </main>
  );
}