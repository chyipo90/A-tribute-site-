"use client";

import { useMemo } from "react";
import { ExtrudeGeometry, Shape } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { GEORGIA_REGIONS } from "./georgia-paths";

// Extrusion settings — controls how the 2D path becomes a 3D slab.
const EXTRUDE_SETTINGS = {
  depth: 20,        // how thick the slab is (in SVG path units, will scale down later)
  bevelEnabled: false,
};

// Convert all 12 region paths into Three.js Shape objects.
// useMemo so we only do this work once, not on every re-render.
function useGeorgiaShapes(): Shape[] {
    return useMemo(() => {
      const loader = new SVGLoader();
      const allShapes: Shape[] = [];
  
      for (const region of GEORGIA_REGIONS) {
        const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg"><path d="${region.d}" /></svg>`;
        const data = loader.parse(svgMarkup);
  
        for (const shapePath of data.paths) {
          const shapes = SVGLoader.createShapes(shapePath);
          allShapes.push(...shapes);
        }
      }
  
      return allShapes;
    }, []);
  }
export default function GeorgiaMesh3D() {
  const shapes = useGeorgiaShapes();

  return (
    <group
      // The math:
      // - rotation X = -90° lays the country flat (same trick as the ground plane)
      // - scale 0.02 shrinks SVG-pixel units into our scene's units
      // - position Y = 0.01 lifts it just barely above the ground to avoid z-fighting
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[0.02, 0.02, 0.02]}
      position={[0, 0.01, 0]}
    >
      {shapes.map((shape, i) => (
        <mesh key={i}>
          <extrudeGeometry args={[shape, EXTRUDE_SETTINGS]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
      ))}
    </group>
  );
}