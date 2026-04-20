import SpiritParticles from "./components/SpiritParticles";

export default function Home() {
  return (
    <main 
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
    >
      {/* Background image layer (placeholder for now — radial glow simulating dog) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center 75%, rgba(124, 185, 232, 0.25) 0%, rgba(10, 14, 26, 0) 50%)'
        }}
      />

      {/* Particle layer — rises from the dog area */}
      <div className="absolute inset-0 z-10">
        <SpiritParticles />
      </div>

      {/* Content layer — legend + button */}
      <div className="relative z-20 flex flex-col items-center">
        <p className="text-lg md:text-xl max-w-2xl text-center leading-relaxed mb-12 opacity-80">
          All the animals who die leave a light behind which forever stays in this world 
          while their souls are going to heaven, and the light can be seen only by those 
          who know where to look.
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