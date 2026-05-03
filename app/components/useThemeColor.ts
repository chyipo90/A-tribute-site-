"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

/**
 * Reads a CSS custom property and returns its current value.
 * Re-reads when the theme changes, so consumers get fresh colors.
 *
 * Uses a lazy initializer to read CSS synchronously on first render,
 * avoiding the "flash of default color" before useEffect runs.
 *
 * Usage:
 *   const mapColor = useThemeColor("--map-color");
 */
export function useThemeColor(cssVarName: string): string {
  const { theme } = useTheme();

  // Lazy initializer: runs once on mount, reads CSS synchronously.
  // typeof check protects server-side rendering (no document on server).
  const [color, setColor] = useState<string>(() => {
    if (typeof document === "undefined") return "#000000";
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue(cssVarName)
        .trim() || "#000000"
    );
  });

  useEffect(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(cssVarName)
      .trim();

    if (value) {
      setColor(value);
    } else {
      console.warn(`useThemeColor: CSS variable ${cssVarName} not found`);
    }
  }, [theme, cssVarName]);

  return color;
}