import { useNavigate } from "react-router-dom";
import eloquaLogo from "@/assets/eloqua-title.svg";
import jellyfish from "@/assets/jellyfish.svg";
import backArrow from "@/assets/back-arrow.svg";
import seaweedCurly from "@/assets/seaweed-curly.svg";
import BackgroundFish from "@/components/BackgroundFish";

const GameComplete = () => {
  const navigate = useNavigate();

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
        className="absolute left-0 bottom-0 h-[55%] w-auto animate-sway origin-bottom opacity-90"
      />
      <img 
        src={seaweedCurly} 
        alt="" 
        className="absolute right-0 bottom-0 h-[50%] w-auto animate-sway-delayed origin-bottom opacity-80 scale-x-[-1]"
      />

      {/* Background jellyfish decorations */}
      <div className="absolute left-[5%] bottom-[30%] opacity-30 z-[2]">
        <img src={jellyfish} alt="" className="w-12 h-auto" />
      </div>
      <div className="absolute left-[8%] bottom-[40%] opacity-25 z-[2]">
        <img src={jellyfish} alt="" className="w-10 h-auto" />
      </div>
      <div className="absolute left-[3%] bottom-[50%] opacity-20 z-[2]">
        <img src={jellyfish} alt="" className="w-8 h-auto" />
      </div>

      {/* Floating bubbles on right */}
      <div className="absolute right-[10%] bottom-[25%] opacity-40 z-[2]">
        <div className="w-3 h-3 rounded-full bg-white/30" />
      </div>
      <div className="absolute right-[8%] bottom-[30%] opacity-30 z-[2]">
        <div className="w-2 h-2 rounded-full bg-white/30" />
      </div>
      <div className="absolute right-[12%] bottom-[35%] opacity-35 z-[2]">
        <div className="w-2 h-2 rounded-full bg-white/30" />
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

      {/* Completion card */}
      <div className="relative z-20 flex items-center justify-center mt-12 md:mt-20 px-4">
        <div 
          className="w-full max-w-md rounded-3xl p-8 md:p-12 flex flex-col items-center"
          style={{ background: "hsl(195 40% 35%)" }}
        >
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-white mb-8">
            Great job!
          </h2>
          
          <button
            onClick={() => navigate("/home")}
            className="w-full max-w-xs py-4 rounded-2xl font-fredoka font-bold text-xl text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
            style={{ 
              background: "hsl(25 90% 55%)",
              boxShadow: "0 6px 0 hsl(220 60% 40%)"
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
