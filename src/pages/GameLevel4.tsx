import { useNavigate } from "react-router-dom";
import { useState } from "react";
import eloquaLogo from "@/assets/eloqua-title.svg";
import jellyfish from "@/assets/jellyfish.svg";
import backArrow from "@/assets/back-arrow.svg";
import coralPurple from "@/assets/coral-purple.png";
import coralTeal from "@/assets/coral-teal.png";
import coralOrange from "@/assets/coral-orange.png";
import coralPink from "@/assets/coral-pink.png";
import seaweedCurly from "@/assets/seaweed-curly.svg";
import BackgroundFish from "@/components/BackgroundFish";

const GameLevel4 = () => {
  const navigate = useNavigate();
  const [progress] = useState(95);

  const jellyfishStops = [
    { id: 1, word: "FALL", x: "15%", bottom: "35%" },
    { id: 2, word: "BALL", x: "40%", bottom: "30%" },
    { id: 3, word: "SHELL", x: "75%", bottom: "38%" },
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(195 45% 35%) 0%, hsl(195 55% 20%) 100%)" }}
    >
      {/* Background wave pattern - ocean floor */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <path 
          d="M-100 550 Q200 480 500 520 T1000 480 T1500 550 L1500 1000 L-100 1000 Z" 
          fill="hsl(195 50% 18%)"
        />
      </svg>

      {/* Background fish */}
      <BackgroundFish />

      {/* Seaweed decorations */}
      <img 
        src={seaweedCurly} 
        alt="" 
        className="absolute left-0 bottom-0 h-[60%] w-auto animate-sway origin-bottom opacity-90"
      />
      <img 
        src={seaweedCurly} 
        alt="" 
        className="absolute right-0 bottom-0 h-[55%] w-auto animate-sway-delayed origin-bottom opacity-80 scale-x-[-1]"
      />

      {/* Coral decorations at bottom */}
      <img 
        src={coralPink} 
        alt="" 
        className="absolute left-[5%] bottom-[8%] w-16 h-auto opacity-90 z-[5]"
      />
      <img 
        src={coralOrange} 
        alt="" 
        className="absolute left-[25%] bottom-[5%] w-20 h-auto opacity-90 z-[5]"
      />
      <img 
        src={coralPurple} 
        alt="" 
        className="absolute right-[8%] bottom-[5%] w-24 h-auto opacity-90 z-[5]"
      />

      {/* Background jellyfish decorations */}
      <div className="absolute left-[3%] bottom-[45%] opacity-30 z-[2]">
        <img src={jellyfish} alt="" className="w-10 h-auto" />
      </div>
      <div className="absolute left-[5%] bottom-[55%] opacity-25 z-[2]">
        <img src={jellyfish} alt="" className="w-8 h-auto" />
      </div>

      {/* Header */}
      <header className="relative z-20 px-4 md:px-8 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
          <img src={eloquaLogo} alt="ELOQUA" className="h-8 md:h-12 w-auto" />
        </button>
        <h1 className="font-fredoka font-bold text-xl md:text-2xl text-white italic">
          Jellyfish Jungle
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <div className="w-2 h-2 rounded-full bg-gray-400" />
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent border-4 border-[hsl(181_50%_40%)] shadow-lg" />
        </div>
      </header>

      {/* Progress bar row */}
      <div className="relative z-20 px-4 md:px-8 py-2 flex items-center gap-4">
        <button 
          onClick={() => navigate("/game-level-3")}
          className="hover:scale-110 active:scale-95 transition-transform"
        >
          <img src={backArrow} alt="Back" className="w-12 h-12 md:w-14 md:h-14" />
        </button>
        <div className="flex-1 h-6 md:h-8 bg-[hsl(180_40%_75%)] rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-[hsl(181_69%_45%)] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Instruction text */}
      <div className="relative z-20 px-4 md:px-8 py-4">
        <p className="font-fredoka text-lg md:text-xl text-white/90 italic">
          Say the 'LL' word to make the jelly fish bounce on the coral!
        </p>
      </div>

      {/* Game area with jellyfish and bounce paths */}
      <div className="relative z-10 w-full" style={{ height: "calc(100vh - 260px)" }}>
        {jellyfishStops.map((stop, index) => (
          <div key={stop.id} className="absolute" style={{ left: stop.x, bottom: stop.bottom }}>
            {/* Word label */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 font-fredoka font-bold text-xl md:text-2xl text-white whitespace-nowrap">
              {stop.word}
            </span>
            
            {/* Star marker */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[hsl(195_50%_30%)] flex items-center justify-center">
              <span className="text-yellow-400 text-lg">★</span>
            </div>
            
            {/* Bounce path (dashed arc) */}
            {index < jellyfishStops.length - 1 && (
              <svg 
                className="absolute -right-32 top-0 w-40 h-24 pointer-events-none"
                viewBox="0 0 160 96"
              >
                <path 
                  d="M0 80 Q80 0 160 80" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="3" 
                  strokeDasharray="8 8"
                  opacity="0.6"
                />
              </svg>
            )}
            
            {/* Jellyfish */}
            <img 
              src={jellyfish} 
              alt="Jellyfish" 
              className="w-20 h-auto md:w-24 animate-float drop-shadow-lg"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
            
            {/* Coral platform */}
            <img 
              src={coralTeal} 
              alt="" 
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-28 h-auto"
            />
          </div>
        ))}
      </div>

      {/* Test button - Complete */}
      <button
        onClick={() => navigate("/game-complete")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-6 py-3 bg-accent text-white font-fredoka font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        Complete →
      </button>
    </div>
  );
};

export default GameLevel4;
