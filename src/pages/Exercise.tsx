import { useNavigate } from "react-router-dom";
import jellyfish from "@/assets/jellyfish.svg";
import seaweedLeft from "@/assets/seaweed-tall-left.svg";
import seaweedRight from "@/assets/seaweed-tall-right.svg";
import BackgroundFish from "@/components/BackgroundFish";

const Exercise = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/game");
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(180deg, hsl(195 50% 30%) 0%, hsl(195 55% 22%) 100%)" }}
    >
      {/* Background wave pattern */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <path 
          d="M-100 350 Q200 280 500 320 T1000 280 T1500 350 L1500 1000 L-100 1000 Z" 
          fill="hsl(195 45% 18%)"
        />
      </svg>

      {/* Background fish */}
      <BackgroundFish />

      {/* Seaweed decorations */}
      <img 
        src={seaweedLeft} 
        alt="" 
        className="absolute left-0 bottom-0 h-[70%] w-auto animate-sway origin-bottom"
      />
      <img 
        src={seaweedRight} 
        alt="" 
        className="absolute right-0 bottom-0 h-[65%] w-auto animate-sway-delayed origin-bottom"
      />

      {/* Small background jellyfish */}
      <div className="absolute left-[15%] bottom-[25%] opacity-40">
        <img src={jellyfish} alt="" className="w-16 h-auto" />
      </div>
      <div className="absolute left-[22%] bottom-[18%] opacity-30">
        <img src={jellyfish} alt="" className="w-12 h-auto" />
      </div>
      <div className="absolute left-[12%] bottom-[12%] opacity-25">
        <img src={jellyfish} alt="" className="w-10 h-auto" />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 py-8 text-center">
        {/* Jellyfish character with glow */}
        <div className="relative mb-4">
          {/* Glow effect */}
          <div 
            className="absolute inset-0 blur-3xl opacity-40 rounded-full"
            style={{ 
              background: "radial-gradient(circle, hsl(300 60% 85% / 0.6) 0%, transparent 70%)",
              transform: "scale(1.5)"
            }}
          />
          <img 
            src={jellyfish} 
            alt="Jellyfish character" 
            className="relative w-48 h-auto md:w-64 lg:w-72 drop-shadow-2xl animate-float"
          />
        </div>

        {/* Title */}
        <h1 className="font-fredoka font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-lg italic">
          Jellyfish Jungle
        </h1>

        {/* Description */}
        <p className="font-fredoka text-lg md:text-xl text-white/90 mb-8 max-w-md">
          You are entering Jellyfish Jungle to practice the <span className="font-bold">/L/</span> sound
        </p>

        {/* Enter button */}
        <button
          onClick={handleEnter}
          className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <div className="relative">
            {/* Button shadow */}
            <div className="absolute top-2 left-0 right-0 h-14 md:h-16 bg-[#112C55] rounded-full" />
            {/* Button body */}
            <div className="relative bg-[hsl(var(--coral))] hover:bg-[hsl(22_73%_52%)] text-white font-fredoka font-bold text-2xl md:text-3xl px-16 md:px-24 py-3 md:py-4 rounded-full shadow-lg transition-colors">
              Enter
              {/* Bubble decoration */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/30 ml-1" />
              </div>
            </div>
          </div>
        </button>
      </main>
    </div>
  );
};

export default Exercise;
