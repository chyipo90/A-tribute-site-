import SpiritParticles from "./components/SpiritParticles";

export default function Home() {
  return (
    <main 
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* Background image layer — spirit dog */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/spirit-dog.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Dark overlay gradient — fades image edges, improves text readability */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(10, 14, 26, 0.2) 0%, rgba(10, 14, 26, 0.7) 90%)'
        }}
      />

      {/* Particle layer — rises from the dog area */}
      <div className="absolute inset-0 z-10">
        <SpiritParticles />
      </div>

      {/* Content layer — legend + button */}
      <div className="relative z-20 flex flex-col items-center">
      <p 
  className="text-lg md:text-xl max-w-2xl text-center leading-relaxed mb-12"
  style={{
    color: '#c4dcf0',
    opacity: 0.85,
    textShadow: '0 0 20px rgba(10, 14, 26, 0.8), 0 2px 6px rgba(10, 14, 26, 0.6)',
    letterSpacing: '0.02em'
  }}
>
Every animal who leaves this world leaves a light behind — soft, eternal, woven into the air around us. Their souls rise to the heavens. Their light remains, seen only by those who know where to look
</p>
        <button 
          className="px-8 py-4 rounded-full text-lg font-medium tracking-wide transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{ 
            backgroundColor: 'var(--accent)', 
            color: 'var(--bg-primary)',
            boxShadow: '0 0 30px var(--accent-glow)' 
          }}
        >
          See the Light
        </button>
      </div>
    </main>
  );
}