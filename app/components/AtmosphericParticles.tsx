"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useThemeColor } from "./useThemeColor";

const PARTICLE_COUNT = 120;
const FIELD_SIZE = 8; // particles spread within a cube of this side length, centered at scene origin

export default function AtmosphericParticles() {
    const particleColor = useThemeColor("--particle-color");  // ← read CSS variable, theme-reactive
  
    const positions = useMemo(() => {
        const arr = new Float32Array(PARTICLE_COUNT * 3);
      
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          arr[i * 3 + 0] = (Math.random() - 0.5) * FIELD_SIZE;
          arr[i * 3 + 1] = (Math.random() - 0.5) * FIELD_SIZE;
          arr[i * 3 + 2] = (Math.random() - 0.5) * FIELD_SIZE;
        }
      
        return arr;
      }, []);
  
    return (
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={PARTICLE_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          color={particleColor}  // ← use theme color instead of hardcoded white
          size={0.08}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
    );
  }