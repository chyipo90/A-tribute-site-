"use client";
import Link from "next/link";
import SpiritParticles from "./components/SpiritParticles";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  return (
    <main
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <ThemeToggle />

      {/* ===== Main Mode layers (shown by default, hidden in Alt) ===== */}
      <div
        className="absolute inset-0 z-0 theme-main-only"
        style={{
          backgroundImage: "url(/images/spirit-dog.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0 z-0 theme-main-only"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10, 14, 26, 0.2) 0%, rgba(10, 14, 26, 0.7) 90%)",
        }}
      />

      {/* ===== Alt Mode layers (hidden by default, shown in Alt) ===== */}
      <div
        className="absolute inset-0 z-0 theme-alt-only"
        style={{
          backgroundImage: "url(/images/alt-mode-figure.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0 z-0 theme-alt-only"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(10, 5, 5, 0.2) 0%, rgba(10, 5, 5, 0.7) 90%)",
        }}
      />

      {/* ===== Particles layer ===== */}
      <div className="absolute inset-0 z-10">
        <SpiritParticles />
      </div>

      {/* ===== Content layer ===== */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Main Mode legend + button */}
        <div className="theme-main-only flex flex-col items-center">
          <p
            className="text-lg md:text-xl max-w-2xl text-center leading-relaxed mb-12"
            style={{
              color: "var(--text-primary)",
              opacity: 0.85,
              textShadow:
                "0 0 20px var(--bg-primary), 0 2px 6px var(--bg-primary)",
              letterSpacing: "0.02em",
            }}
          >
            Every animal who leaves this world leaves a light behind — soft, eternal, woven into the air around us. Their souls rise to the heavens. Their light remains, seen only by those who know where to look.
          </p>
          <Link href="/see-the-light" style={{ display: "inline-block" }}>
  <button
    className="rounded-full transition-all duration-500 cursor-pointer spirit-button"
    style={{
      color: "var(--text-primary)",
      border: "2.5px solid var(--accent)",
      letterSpacing: "0.15em",
      opacity: 0.9,
      padding: "18px 56px",
      fontSize: "15px",
      fontWeight: 400,
      lineHeight: 1.2,
    }}
  >
    See the Light
  </button>
</Link>
        </div>

        {/* Alt Mode legend + button */}
        <div className="theme-alt-only flex flex-col items-center">
          <p
            className="text-lg md:text-xl max-w-2xl text-center leading-relaxed mb-12"
            style={{
              color: "var(--text-primary)",
              opacity: 0.85,
              textShadow:
                "0 0 20px var(--bg-primary), 0 2px 6px var(--bg-primary)",
              letterSpacing: "0.02em",
            }}
          >
            Every soul who breaks a light pays a weight behind — heavy, eternal, carved into the earth beneath us. Their souls descend to the depths. Their weight remains, felt only by those who know where to look.
          </p>
          <Link href="/see-the-light" style={{ display: "inline-block" }}>
  <button
    className="rounded-full transition-all duration-500 cursor-pointer spirit-button"
    style={{
      color: "var(--text-primary)",
      border: "2.5px solid var(--accent)",
      letterSpacing: "0.15em",
      opacity: 0.9,
      padding: "18px 56px",
      fontSize: "15px",
      fontWeight: 400,
      lineHeight: 1.2,
    }}
  >
    Serve the Justice
  </button>
</Link>
        </div>
      </div>
    </main>
  );
}