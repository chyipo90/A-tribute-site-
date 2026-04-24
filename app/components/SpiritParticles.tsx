"use client";

import { useEffect, useState } from "react";
import { initParticlesEngine, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "./ThemeContext";

export default function SpiritParticles() {
  const [ready, setReady] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  // Theme-aware configuration
  const isAlt = theme === "alt";

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      number: {
        value: 230,
        density: { enable: true },
      },
      color: {
        value: isAlt
          ? ["#b8312d", "#8a2521", "#5a1a18"]   // Alt: old blood, rust, scorched
          : ["#ffffff", "#b6d8f2", "#7cb9e8"],  // Main: white + soft blues
      },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.1, max: 0.7 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
          startValue: "min",
          destroy: "min",
        },
      },
      size: {
        value: { min: 1, max: 3 },
      },
      move: {
        enable: true,
        direction: isAlt ? "bottom" : "top",  // Alt: descending, Main: rising
        speed: { min: 0.3, max: 1.0 },
        straight: false,
        random: true,
        outModes: isAlt
          ? { default: "destroy", bottom: "destroy" }
          : { default: "destroy", top: "destroy" },
      },
    },
    emitters: [
      {
        direction: isAlt ? "bottom" : "top",
        rate: { delay: 0.05, quantity: 6 },
        position: isAlt
          ? { x: 50, y: 5 }   // Alt: spawn from top
          : { x: 50, y: 95 }, // Main: spawn from bottom
        size: { width: 90, height: 5 },
        particles: {
          move: {
            speed: { min: 0.4, max: 1.5 },
            direction: isAlt ? "bottom" : "top",
          },
        },
      },
    ],
    detectRetina: true,
  };

  if (!ready) return null;

  return (
    <Particles
      id="spirit-particles"
      options={options}
      options-key={theme}  // Force re-init when theme changes
      className="absolute inset-0 pointer-events-none"
    />
  );
}