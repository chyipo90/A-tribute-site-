"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeColor } from "./useThemeColor";
import { useTheme } from "./ThemeContext";
import { RIGHT_OFFSET } from "./GeorgiaMesh3D";
// Generates a soft circular texture programmatically — no PNG file needed.
// Drawn once on mount. Used by PointsMaterial to make each square sprite render as a soft glowing dot.
function createCircleTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,           // inner circle (center, radius 0)
    size / 2, size / 2, size / 2     // outer circle (center, full radius)
  );

  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");      // solid white at center
  gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.5)");  // half opacity midway
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");      // fully transparent at edge

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;  // tell Three.js the texture data is ready to upload to GPU
  return texture;
}

const PARTICLE_COUNT = 165;

// Spawn volume matches the camera's view of the scene.
// Georgia is wide & shallow at our locked camera angle — wider on X, narrower on Y,
// similar to X on Z (so atmospheric particles surround the map in front-to-back depth too).
const FIELD_X = 30;  // horizontal — wider than cube, covers full Georgia width
const FIELD_Y = 6;   // vertical — narrower, particles cluster near the map's vertical band
const FIELD_Z = 12;  // depth — front-to-back of scene

const FIELD_X_HALF = FIELD_X / 2;
const FIELD_Y_HALF = FIELD_Y / 2;
const FIELD_Z_HALF = FIELD_Z / 2;

// Motion tuning — start gentle. Tune live in 7e.
const VERTICAL_SPEED = 0.15;        // world units per second
const HORIZONTAL_SPEED_MAX = 0.08;  // max sideways drift per particle

export default function AtmosphericParticles() {
  const particleColor = useThemeColor("--particle-color");
  const { theme } = useTheme();

  // Ref to the geometry's position attribute — lets us mutate it every frame.
  const pointsRef = useRef<THREE.Points>(null);

// Create the circle texture once, memoize it. Used as the sprite for every particle.
const circleTexture = useMemo(() => createCircleTexture(), []);

  // Compute initial positions AND per-particle velocities once, never again.
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * FIELD_X; // x — wide
      positions[i * 3 + 1] = (Math.random() - 0.5) * FIELD_Y; // y — narrow
      positions[i * 3 + 2] = (Math.random() - 0.5) * FIELD_Z; // z — depth

      velocities[i] = (Math.random() - 0.5) * 2 * HORIZONTAL_SPEED_MAX;
    }

    return { positions, velocities };
  }, []);

  // Per-frame motion update. delta = seconds since last frame (framerate-independent).
  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    // Clamp delta. After a tab-away or paused frame, delta can be huge (multi-second),
    // which sends particles flying out of the field. Cap to ~2 frames at 30fps.
    const safeDelta = Math.min(delta, 0.066);

    const geometry = pointsRef.current.geometry;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    // Direction: rise in Main (+Y), fall in Alt (-Y)
    const verticalDirection = theme === "alt" ? -1 : 1;
    const dy = VERTICAL_SPEED * verticalDirection * safeDelta;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Horizontal drift (per-particle velocity)
      arr[i * 3 + 0] += velocities[i] * safeDelta;

      // Vertical motion (theme-driven)
      arr[i * 3 + 1] += dy;

      // Wrap on Y: when a particle exits top or bottom, respawn at the opposite edge
      // AND randomize X to prevent vertical streams forming over time.
      if (arr[i * 3 + 1] > FIELD_Y_HALF) {
        arr[i * 3 + 1] = -FIELD_Y_HALF;
        arr[i * 3 + 0] = (Math.random() - 0.5) * FIELD_X;
      } else if (arr[i * 3 + 1] < -FIELD_Y_HALF) {
        arr[i * 3 + 1] = FIELD_Y_HALF;
        arr[i * 3 + 0] = (Math.random() - 0.5) * FIELD_X;
      }

      // Wrap on X (fallback for slow-falling particles drifting horizontally past the edge)
      if (arr[i * 3 + 0] > FIELD_X_HALF) {
        arr[i * 3 + 0] = -FIELD_X_HALF;
      } else if (arr[i * 3 + 0] < -FIELD_X_HALF) {
        arr[i * 3 + 0] = FIELD_X_HALF;
      }
    }  // ← closes the for loop

    // Critical: tell Three.js the buffer changed, please re-upload to GPU next frame.
    posAttr.needsUpdate = true;
  });  // ← closes the useFrame callback

  return (
    <group position={[RIGHT_OFFSET, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={PARTICLE_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
  color={particleColor}
  size={0.15}                  // slightly bigger now that texture is round + soft
  sizeAttenuation
  transparent
  opacity={0.8}
  map={circleTexture}          // ← stamps the circular gradient onto each particle
  alphaMap={circleTexture}     // ← uses the gradient's alpha for soft edges (no hard square)
  depthWrite={false}           // ← prevents particles from occluding each other in weird ways
/>
      </points>
    </group>
  );
}