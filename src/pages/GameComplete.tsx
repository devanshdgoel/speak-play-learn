import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import eloquaLogo from "@/assets/eloqua-title.svg";
import jellyfish from "@/assets/jellyfish.svg";
import backArrow from "@/assets/back-arrow.svg";
import seaweedCurly from "@/assets/seaweed-curly.svg";
import BackgroundFish from "@/components/BackgroundFish";
import { useGameProgress } from "@/hooks/useGameProgress";

const GameComplete = () => {
  const navigate = useNavigate();
  const { completeCurrentLevel } = useGameProgress();

  // Mark current level as complete when this page loads
  useEffect(() => {
    completeCurrentLevel();
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(195 45% 35%) 0%, hsl(195 55% 20%) 100%)" }}
    >
      {/* Background wave pattern */}
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

      {/* Seaweed decorations - smaller */}
      <img 
        src={seaweedCurly} 
        alt="" 
        className="absolute left-[-2%] bottom-0 h-[40%] w-auto animate-sway origin-bottom opacity-80"
      />
      <img 
        src={seaweedCurly} 
        alt="" 
        className="absolute right-[-2%] bottom-0 h-[35%] w-auto animate-sway-delayed origin-bottom opacity-70 scale-x-[-1]"
      />

      {/* Background jellyfish decorations - left side */}
      <div className="absolute left-[4%] bottom-[22%] opacity-25 z-[2]">
        <img src={jellyfish} alt="" className="w-10 h-auto" />
      </div>
      <div className="absolute left-[6%] bottom-[32%] opacity-20 z-[2]">
        <img src={jellyfish} alt="" className="w-8 h-auto" />
      </div>
      <div className="absolute left-[3%] bottom-[40%] opacity-15 z-[2]">
        <img src={jellyfish} alt="" className="w-7 h-auto" />
      </div>

      {/* Small fish group - right side */}
      <div className="absolute right-[15%] bottom-[25%] z-[3] flex gap-1">
        <div className="w-4 h-3 bg-[hsl(210_80%_45%)] rounded-full transform rotate-180" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }} />
        <div className="w-4 h-3 bg-[hsl(210_80%_45%)] rounded-full transform rotate-180" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }} />
        <div className="w-4 h-3 bg-[hsl(210_80%_45%)] rounded-full transform rotate-180 mt-2" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }} />
      </div>

      {/* Floating bubbles on right */}
      <div className="absolute right-[12%] bottom-[35%] opacity-40 z-[2]">
        <div className="w-3 h-3 rounded-full bg-white/40" />
      </div>
      <div className="absolute right-[10%] bottom-[40%] opacity-30 z-[2]">
        <div className="w-2 h-2 rounded-full bg-white/40" />
      </div>
      <div className="absolute right-[14%] bottom-[45%] opacity-35 z-[2]">
        <div className="w-2 h-2 rounded-full bg-white/40" />
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

      {/* Progress bar row - 100% complete */}
      <div className="relative z-20 px-4 md:px-8 py-2 flex items-center gap-4">
        <button 
          onClick={() => navigate("/game-level-4")}
          className="hover:scale-110 active:scale-95 transition-transform"
        >
          <img src={backArrow} alt="Back" className="w-12 h-12 md:w-14 md:h-14" />
        </button>
        <div className="flex-1 h-6 md:h-8 bg-[hsl(180_40%_75%)] rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-[hsl(181_69%_45%)] rounded-full transition-all duration-500"
            style={{ width: "100%" }}
          />
        </div>
      </div>

      {/* Completion card - centered in viewport */}
      <div className="relative z-20 flex items-center justify-center px-4" style={{ height: "calc(100vh - 220px)" }}>
        <div 
          className="w-full max-w-sm rounded-[2rem] p-10 flex flex-col items-center"
          style={{ background: "hsl(195 35% 38%)" }}
        >
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-white mb-10">
            Great job!
          </h2>
          
          <button
            onClick={() => navigate("/home")}
            className="w-full py-4 rounded-xl font-fredoka font-bold text-xl text-white hover:scale-105 active:scale-95 transition-transform"
            style={{ 
              background: "hsl(25 85% 55%)",
              boxShadow: "0 5px 0 hsl(220 50% 35%)"
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameComplete;
