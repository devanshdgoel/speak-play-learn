import { useNavigate } from "react-router-dom";
import trophyIcon from "@/assets/trophy-icon.svg";
import lightbulbIcon from "@/assets/lightbulb-icon.svg";
import settingsIcon from "@/assets/settings-icon.svg";
import fireStreak from "@/assets/fire-streak.svg";
import checkCircle from "@/assets/check-circle.svg";
import playButtonHome from "@/assets/play-button-home.svg";
import lockedJellyfish from "@/assets/locked-jellyfish.svg";
import lockedSignpost from "@/assets/locked-signpost.svg";
import seaweedLeft from "@/assets/seaweed-left.svg";
import seaweedRight from "@/assets/seaweed-right.svg";
import FishGroup from "@/components/FishGroup";
import SmallFish from "@/components/SmallFish";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background wave patterns */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Light wave background */}
        <path 
          d="M-100 400 Q200 200 400 350 T800 300 T1200 400 T1600 350 L1600 1000 L-100 1000 Z" 
          fill="hsl(168 45% 72% / 0.4)"
        />
        {/* Second wave layer */}
        <path 
          d="M-100 500 Q300 350 500 450 T900 400 T1300 500 T1700 450 L1700 1000 L-100 1000 Z" 
          fill="hsl(168 45% 68% / 0.3)"
        />
      </svg>

      {/* Progress path wave - curved line connecting nodes */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <path 
          d="M150 650 Q250 500 300 350 T450 300 T600 450 T750 550 T950 400 T1100 350 T1250 500" 
          stroke="hsl(181 69% 36% / 0.15)"
          strokeWidth="25"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Header bar */}
      <header className="absolute top-0 left-0 right-0 z-20 px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-[hsl(var(--ocean-deep))] font-fredoka font-bold text-3xl md:text-4xl tracking-tight">
          ELOQUA
        </div>

        {/* Nav bar */}
        <nav className="flex items-center gap-2 bg-[hsl(181_69%_40%)] rounded-full px-4 md:px-8 py-2 md:py-3 shadow-lg">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <img src={trophyIcon} alt="Trophies" className="w-8 h-8 md:w-10 md:h-10" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <img src={lightbulbIcon} alt="Tips" className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <img src={settingsIcon} alt="Settings" className="w-8 h-8 md:w-10 md:h-10" />
          </button>
          <div className="flex items-center gap-1 ml-2">
            <img src={fireStreak} alt="Streak" className="w-6 h-6 md:w-8 md:h-8" />
            <span className="text-white font-bold text-lg md:text-xl">13</span>
          </div>
        </nav>

        {/* Profile circle */}
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent border-4 border-white/30 shadow-lg" />
      </header>

      {/* Progress nodes - positioned along the wave path */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Completed node 1 - bottom left */}
        <div className="absolute left-[8%] bottom-[32%] pointer-events-auto">
          <img src={checkCircle} alt="Completed" className="w-14 h-14 md:w-20 md:h-20 drop-shadow-lg" />
        </div>

        {/* Completed node 2 - ascending */}
        <div className="absolute left-[18%] bottom-[52%] pointer-events-auto">
          <img src={checkCircle} alt="Completed" className="w-14 h-14 md:w-20 md:h-20 drop-shadow-lg" />
        </div>

        {/* Completed node 3 - peak */}
        <div className="absolute left-[32%] bottom-[60%] pointer-events-auto">
          <img src={checkCircle} alt="Completed" className="w-14 h-14 md:w-20 md:h-20 drop-shadow-lg" />
        </div>

        {/* Completed node 4 - descending */}
        <div className="absolute left-[42%] bottom-[48%] pointer-events-auto">
          <img src={checkCircle} alt="Completed" className="w-14 h-14 md:w-20 md:h-20 drop-shadow-lg" />
        </div>

        {/* Current node - Play button */}
        <div className="absolute left-[52%] bottom-[28%] -translate-x-1/2 pointer-events-auto">
          <button className="transition-transform hover:scale-110 active:scale-95">
            <img src={playButtonHome} alt="Play" className="w-20 h-20 md:w-28 md:h-28 drop-shadow-xl" />
          </button>
        </div>

        {/* Locked node 1 - jellyfish */}
        <div className="absolute right-[28%] bottom-[42%] pointer-events-auto">
          <img src={lockedJellyfish} alt="Locked" className="w-12 h-12 md:w-16 md:h-16 drop-shadow-lg opacity-90" />
        </div>

        {/* Locked node 2 - signpost */}
        <div className="absolute right-[15%] bottom-[55%] pointer-events-auto">
          <img src={lockedSignpost} alt="Locked" className="w-12 h-12 md:w-16 md:h-16 drop-shadow-lg opacity-90" />
        </div>
      </div>

      {/* Seaweed decorations */}
      <img 
        src={seaweedLeft} 
        alt="" 
        className="absolute left-[12%] bottom-0 w-12 md:w-20 h-auto animate-sway"
      />
      <img 
        src={seaweedRight} 
        alt="" 
        className="absolute right-[8%] bottom-0 w-24 md:w-40 h-auto animate-sway-delayed"
      />

      {/* Fish school */}
      <div className="absolute bottom-[35%] -left-20">
        <FishGroup />
      </div>

      {/* Small accent fish */}
      <SmallFish 
        className="absolute bottom-[38%] right-[22%]" 
        color="orange" 
        speed={18}
        size="medium"
      />
    </div>
  );
};

export default Home;
