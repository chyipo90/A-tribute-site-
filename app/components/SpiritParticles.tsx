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
        value: 150, // How many particles on screen at once
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
        direction: "top",
        speed: { min: 0.3, max: 1.0 },
        straight: false,
        random: true,
        outModes: { default: "destroy", top: "destroy" }
      },
    },
    emitters: [
        {
          direction: "top",
          rate: { delay: 0.05, quantity: 6 },
          position: { x: 50, y: 95 },
          size: { width: 90, height: 5 },
          particles: {
            move: { speed: { min: 0.4, max: 1.5 } }
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