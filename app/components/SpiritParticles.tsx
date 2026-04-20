"use client";

import { useEffect, useState } from "react";
import { initParticlesEngine, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function SpiritParticles() {
  const [ready, setReady] = useState(false);

  // Initialize the particle engine once on component mount
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  // Particle configuration — this is where the "spirit" look is defined
  const options: ISourceOptions = {
    fullScreen: { enable: false }, // We control the container size ourselves
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      number: {
        value: 60, // How many particles on screen at once
        density: { enable: true }
      },
      color: {
        value: ["#ffffff", "#b6d8f2", "#7cb9e8"] // White + soft blues
      },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.1, max: 0.7 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
          startValue: "min",
          destroy: "min"
        }
      },
      size: {
        value: { min: 1, max: 3 } // Small, subtle
      },
      move: {
        enable: true,
        direction: "top", // Rise upward
        speed: { min: 0.3, max: 1.2 }, // Slow, gentle
        straight: false, // Allow slight wobble
        random: true,
        outModes: { default: "destroy", top: "destroy" } // Disappear when leaving screen
      }
    },
    emitters: [
      {
        direction: "top",
        rate: { delay: 0.2, quantity: 2 }, // Spawn rate
        position: { x: 50, y: 80 }, // Spawn from bottom-center (where dog will be)
        size: { width: 30, height: 10 }, // Spawn area size
        particles: {
          move: { speed: { min: 0.3, max: 1.2 } }
        }
      }
    ],
    detectRetina: true
  };

  if (!ready) return null;

  return (
    <Particles
      id="spirit-particles"
      options={options}
      className="absolute inset-0 pointer-events-none"
    />
  );
}