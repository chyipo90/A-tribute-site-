"use client";

import { useMemo } from "react";
import { Shape } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { GEORGIA_REGIONS, GEORGIA_VIEWBOX } from "./georgia-paths";
import { useThemeColor } from "./useThemeColor";

const EXTRUDE_SETTINGS = {
  depth: 20,
  bevelEnabled: false,
};

// Parse "0 0 792.50702 401.40411" into [minX, minY, width, height].
const VIEWBOX_PARTS = GEORGIA_VIEWBOX.split(" ").map(Number);
const VIEWBOX_WIDTH = VIEWBOX_PARTS[2];
const VIEWBOX_HEIGHT = VIEWBOX_PARTS[3];
const CENTER_X = VIEWBOX_WIDTH / 2;
const CENTER_Y = VIEWBOX_HEIGHT / 2;

// Visual tuning constants. Locked via interactive arrow-key tuning (Chat 6b).
const SCALE = 0.032;
export const RIGHT_OFFSET = -3.25;
const FORWARD_OFFSET = 0;
const Y_LIFT = 0.01;

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
  const mapColor = useThemeColor("--map-color");

  return (
    <group
      // Order of transforms (applied right-to-left visually):
      // 1. position offsets the entire group
      // 2. scale shrinks SVG units into 3D scene units
      // 3. rotation lays the country flat on the XZ plane
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[SCALE, SCALE, SCALE]}
      position={[
        -CENTER_X * SCALE + RIGHT_OFFSET,
        Y_LIFT,
        CENTER_Y * SCALE + FORWARD_OFFSET,
      ]}
    >
      {shapes.map((shape, i) => (
        <mesh key={i}>
          <extrudeGeometry args={[shape, EXTRUDE_SETTINGS]} />
          <meshStandardMaterial color={mapColor} />
        </mesh>
      ))}
    </group>
  );
}