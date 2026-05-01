"use client";

import { useTheme } from "./ThemeContext";
import { GEORGIA_REGIONS, GEORGIA_VIEWBOX } from "./georgia-paths";

export default function GeorgiaMap() {
  const { theme } = useTheme();
  const isAlt = theme === "alt";

  return (
    <svg
      viewBox={GEORGIA_VIEWBOX}
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Map of Georgia"
    >
     <g
  fill="var(--accent)"
  fillOpacity={isAlt ? 0.07 : 0.06}
  stroke="var(--accent)"
  strokeWidth={0.4}
  strokeOpacity={isAlt ? 0.04 : 0.03}
  strokeLinejoin="round"
  strokeLinecap="round"
                       >
        {GEORGIA_REGIONS.map((region) => (
          <path key={region.id} d={region.d} />
        ))}
      </g>
    </svg>
  );
}