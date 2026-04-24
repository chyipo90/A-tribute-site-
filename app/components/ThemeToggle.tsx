"use client";

import { useTheme } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="fixed top-5 right-5 z-50 inline-flex p-1 rounded-full backdrop-blur-sm"
      style={{
        backgroundColor: "rgba(10, 14, 26, 0.6)",
        border: "0.5px solid rgba(196, 220, 240, 0.25)",
      }}
    >
      {/* Main Mode button — spirit dog */}
      <button
        onClick={() => setTheme("main")}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
        style={{
          backgroundColor:
            theme === "main" ? "rgba(124, 185, 232, 0.15)" : "transparent",
          boxShadow:
            theme === "main"
              ? "inset 0 0 0 1px #7cb9e8, 0 0 10px rgba(124, 185, 232, 0.35)"
              : "none",
        }}
        aria-label="Switch to Main Mode"
      >
        <img
          src="/images/icon-main.png"
          alt=""
          className="w-6 h-6 object-contain transition-all duration-300"
          style={{
            opacity: theme === "main" ? 1 : 0.45,
            filter:
              theme === "main"
                ? "brightness(1.3) drop-shadow(0 0 2px rgba(182, 216, 242, 0.8))"
                : "brightness(0.9)",
          }}
        />
      </button>

      {/* Alt Mode button — kneeling figure */}
      <button
        onClick={() => setTheme("alt")}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
        style={{
          backgroundColor:
            theme === "alt" ? "rgba(184, 49, 45, 0.2)" : "transparent",
          boxShadow:
            theme === "alt"
              ? "inset 0 0 0 1px #d93d3a, 0 0 12px rgba(217, 61, 58, 0.5)"
              : "none",
        }}
        aria-label="Switch to Alt Mode"
      >
        <img
          src="/images/icon-alt.png"
          alt=""
          className="w-6 h-6 object-contain transition-all duration-300"
          style={{
            opacity: theme === "alt" ? 1 : 0.5,
            filter:
              theme === "alt"
                ? "brightness(2) saturate(1.5) drop-shadow(0 0 3px rgba(255, 100, 95, 0.9))"
                : "brightness(1.3) saturate(1.2)",
          }}
        />
      </button>
    </div>
  );
}