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
    { id: 1, word: "FALL", x: "12%", bottom: "42%" },
    { id: 2, word: "BALL", x: "42%", bottom: "38%" },
    { id: 3, word: "SHELL", x: "72%", bottom: "44%" },
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
          d="M-100 600 Q200 530 500 570 T1000 530 T1500 600 L1500 1000 L-100 1000 Z" 
          fill="hsl(195 50% 18%)"
        />
      </svg>

      {/* Background fish */}
      <BackgroundFish />

      {/* Small fish group - right side */}
      <div className="absolute right-[18%] bottom-[45%] z-[3] flex gap-1">
        <div className="w-3 h-2 bg-[hsl(210_80%_45%)] rounded-full" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }} />
        <div className="w-3 h-2 bg-[hsl(210_80%_45%)] rounded-full" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }} />
        <div className="w-3 h-2 bg-[hsl(210_80%_45%)] rounded-full mt-1" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }} />
      </div>

      {/* Seaweed decorations - smaller and less intrusive */}
      <img 
        src={seaweedCurly} 
        alt="" 
        className="absolute left-[-2%] bottom-0 h-[45%] w-auto animate-sway origin-bottom opacity-80"
      />
      <img 
        src={seaweedCurly} 
        alt="" 
        className="absolute right-[-2%] bottom-0 h-[40%] w-auto animate-sway-delayed origin-bottom opacity-70 scale-x-[-1]"
      />

      {/* Coral decorations at bottom - matching reference positions */}
      <img 
        src={coralPink} 
        alt="" 
        className="absolute left-[2%] bottom-[3%] w-12 h-auto opacity-90 z-[5]"
      />
      <img 
        src={coralOrange} 
        alt="" 
        className="absolute left-[22%] bottom-[2%] w-16 h-auto opacity-90 z-[5]"
      />
      <img 
        src={coralPurple} 
        alt="" 
        className="absolute right-[3%] bottom-[2%] w-20 h-auto opacity-90 z-[5]"
      />

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
          <div key={stop.id} className="absolute flex flex-col items-center" style={{ left: stop.x, bottom: stop.bottom }}>
            {/* Word label */}
            <span className="font-fredoka font-bold text-xl md:text-2xl text-white whitespace-nowrap mb-1">
              {stop.word}
            </span>
            
            {/* Star marker */}
            <div className="w-7 h-7 rounded-full bg-[hsl(195_50%_30%)] flex items-center justify-center mb-1">
              <span className="text-yellow-400 text-sm">★</span>
            </div>
            
            {/* Bounce path (dashed arc) - connects to next stop */}
            {index < jellyfishStops.length - 1 && (
              <svg 
                className="absolute pointer-events-none"
                style={{ 
                  left: "100%", 
                  top: "15%",
                  width: index === 0 ? "180px" : "200px",
                  height: "80px"
                }}
                viewBox="0 0 180 80"
                preserveAspectRatio="none"
              >
                <path 
                  d="M0 70 Q90 0 180 70" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeDasharray="6 6"
                  opacity="0.5"
                />
              </svg>
            )}
            
            {/* Jellyfish */}
            <img 
              src={jellyfish} 
              alt="Jellyfish" 
              className="w-16 h-auto md:w-20 animate-float drop-shadow-lg"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
            
            {/* Coral platform - larger and properly positioned */}
            <img 
              src={coralTeal} 
              alt="" 
              className="w-24 h-auto md:w-28 mt-2"
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
