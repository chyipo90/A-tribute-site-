"use client";

import { useMemo } from "react";
import { ExtrudeGeometry, Shape } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { GEORGIA_REGIONS, GEORGIA_VIEWBOX } from "./georgia-paths";

const EXTRUDE_SETTINGS = {
  depth: 20,
  bevelEnabled: false,
};

// Parse "0 0 792.50702 401.40411" into [minX, minY, width, height].
// Computed once at module load — viewBox never changes at runtime.
const VIEWBOX_PARTS = GEORGIA_VIEWBOX.split(" ").map(Number);
const VIEWBOX_WIDTH = VIEWBOX_PARTS[2];
const VIEWBOX_HEIGHT = VIEWBOX_PARTS[3];
const CENTER_X = VIEWBOX_WIDTH / 2;
const CENTER_Y = VIEWBOX_HEIGHT / 2;

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
      // Order of transforms (applied right-to-left visually):
      // 1. position offsets the entire group so SVG-space center sits at world origin
      // 2. scale shrinks SVG units (~800 wide) into 3D scene units (~16 wide)
      // 3. rotation lays the country flat on the XZ plane
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[0.02, 0.02, 0.02]}
      position={[-CENTER_X * 0.02, 0.01, CENTER_Y * 0.02]}
    >
      {shapes.map((shape, i) => (
        <mesh key={i}>
          <extrudeGeometry args={[shape, EXTRUDE_SETTINGS]} />
          <meshStandardMaterial color="#3a4a6a" />
        </mesh>
      ))}
    </group>
  );
}