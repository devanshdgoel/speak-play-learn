import { useNavigate } from "react-router-dom";
import eloquaLogo from "@/assets/eloqua-title.svg";
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
import seaweedTallLeft from "@/assets/seaweed-tall-left.svg";
import seaweedTallRight from "@/assets/seaweed-tall-right.svg";
import seaweedCurly from "@/assets/seaweed-curly.svg";
import BackgroundFish from "@/components/BackgroundFish";
import { useGameProgress } from "@/hooks/useGameProgress";

// Node positions along the path (x%, y% from top)
// Index 4 is the Jellyfish Jungle level (level 5)
const baseNodes = [
  { x: 7, y: 70, level: 1 },
  { x: 14, y: 50, level: 2 },
  { x: 24, y: 34, level: 3 },
  { x: 36, y: 44, level: 4 },
  { x: 48, y: 60, level: 5, icon: "jellyfish" },  // Jellyfish Jungle
  { x: 62, y: 48, level: 6, icon: "signpost" },
  { x: 76, y: 34, level: 7 },
  { x: 90, y: 48, level: 8 },
];

const Home = () => {
  const navigate = useNavigate();
  const { completedLevels, resetProgress } = useGameProgress();
  
  const handleLogoClick = () => {
    resetProgress();
    navigate("/");
  };

  // Determine node types based on progress
  // completedLevels = 5 means levels 1-5 are complete, so current is level 6
  const getNodeType = (level: number, icon?: string) => {
    if (level <= completedLevels) {
      return "completed";
    } else if (level === completedLevels + 1) {
      return "current";
    } else {
      // Locked - use icon if specified
      if (icon === "jellyfish") return "locked-jellyfish";
      if (icon === "signpost") return "locked-signpost";
      return "locked";
    }
  };

  // Get route for current level
  const getCurrentLevelRoute = () => {
    const currentLevel = completedLevels + 1;
    if (currentLevel === 5) return "/exercise"; // Jellyfish Jungle starts at exercise
    if (currentLevel === 6) return "/describe-exercise"; // Describe object exercise
    // For future levels, return appropriate routes
    return "/describe-exercise";
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-auto overflow-y-hidden">
      {/* Scrollable content wrapper - wider than viewport */}
      <div className="relative min-w-[1600px] w-[150vw] h-screen">
        
        {/* Background wave patterns */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 2400 900"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Light wave background */}
          <path 
            d="M-100 450 Q300 250 600 400 T1200 350 T1800 450 T2400 400 T3000 450 L3000 1000 L-100 1000 Z" 
            fill="hsl(168 45% 72% / 0.4)"
          />
          {/* Second wave layer */}
          <path 
            d="M-100 550 Q400 400 700 500 T1300 450 T1900 550 T2500 500 L3000 1000 L-100 1000 Z" 
            fill="hsl(168 45% 68% / 0.3)"
          />
        </svg>

        {/* Progress path - curved line connecting all nodes */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path 
            d="M -5 70 
               Q 10 70 14 50 
               T 24 34 
               T 36 44 
               T 48 60 
               T 62 48 
               T 76 34 
               T 90 48
               T 110 55" 
            stroke="hsl(181 69% 36% / 0.18)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ strokeWidth: '22px' }}
          />
        </svg>

        {/* Progress nodes */}
        {baseNodes.map((node, index) => {
          const nodeType = getNodeType(node.level, node.icon);
          
          return (
            <div
              key={index}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {nodeType === "completed" && (
                <img 
                  src={checkCircle} 
                  alt="Completed" 
                  className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg cursor-pointer hover:scale-110 transition-transform" 
                />
              )}
              {nodeType === "current" && (
                <button 
                  onClick={() => navigate(getCurrentLevelRoute())}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <img 
                    src={playButtonHome} 
                    alt="Play" 
                    className="w-20 h-20 md:w-28 md:h-28 drop-shadow-xl" 
                  />
                </button>
              )}
              {nodeType === "locked-jellyfish" && (
                <img 
                  src={lockedJellyfish} 
                  alt="Locked" 
                  className="w-14 h-14 md:w-16 md:h-16 drop-shadow-lg opacity-90" 
                />
              )}
              {nodeType === "locked-signpost" && (
                <img 
                  src={lockedSignpost} 
                  alt="Locked" 
                  className="w-14 h-14 md:w-16 md:h-16 drop-shadow-lg opacity-90" 
                />
              )}
              {nodeType === "locked" && (
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[hsl(200_10%_75%)] border-4 border-[hsl(200_10%_65%)] drop-shadow-lg opacity-80" />
              )}
            </div>
          );
        })}

        {/* Seaweed decorations - multiple across the bottom */}
        <img 
          src={seaweedTallLeft} 
          alt="" 
          className="absolute left-[2%] bottom-0 w-12 md:w-20 h-auto animate-sway origin-bottom z-10"
        />
        <img 
          src={seaweedCurly} 
          alt="" 
          className="absolute left-[12%] bottom-0 w-8 md:w-14 h-auto animate-sway-delayed origin-bottom z-10"
        />
        <img 
          src={seaweedLeft} 
          alt="" 
          className="absolute left-[22%] bottom-0 w-10 md:w-16 h-auto animate-sway origin-bottom z-10"
        />
        <img 
          src={seaweedRight} 
          alt="" 
          className="absolute left-[35%] bottom-0 w-14 md:w-24 h-auto animate-sway-delayed origin-bottom z-10"
        />
        <img 
          src={seaweedTallRight} 
          alt="" 
          className="absolute left-[48%] bottom-0 w-10 md:w-18 h-auto animate-sway origin-bottom z-10"
        />
        <img 
          src={seaweedCurly} 
          alt="" 
          className="absolute left-[60%] bottom-0 w-12 md:w-20 h-auto animate-sway-delayed origin-bottom z-10"
        />
        <img 
          src={seaweedLeft} 
          alt="" 
          className="absolute left-[72%] bottom-0 w-8 md:w-12 h-auto animate-sway origin-bottom z-10"
        />
        <img 
          src={seaweedTallLeft} 
          alt="" 
          className="absolute left-[82%] bottom-0 w-14 md:w-24 h-auto animate-sway-delayed origin-bottom z-10"
        />
        <img 
          src={seaweedRight} 
          alt="" 
          className="absolute right-[3%] bottom-0 w-16 md:w-28 h-auto animate-sway origin-bottom z-10"
        />
      </div>

      {/* Background fish - behind everything */}
      <BackgroundFish />

      {/* Fixed Header bar */}
      <header className="fixed top-0 left-0 right-0 z-20 px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Logo - clickable to reset and go back to start */}
        <button onClick={handleLogoClick} className="hover:opacity-80 transition-opacity">
          <img 
            src={eloquaLogo} 
            alt="ELOQUA" 
            className="h-8 md:h-10 w-auto"
          />
        </button>

        {/* Nav bar - smaller, more compact */}
        <nav className="flex items-center gap-1 md:gap-3 bg-[hsl(181_69%_42%)] rounded-full px-3 md:px-6 py-1.5 md:py-2 shadow-lg">
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <img src={trophyIcon} alt="Trophies" className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <img src={lightbulbIcon} alt="Tips" className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
            <img src={settingsIcon} alt="Settings" className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <div className="flex items-center gap-0.5 ml-1 md:ml-2">
            <img src={fireStreak} alt="Streak" className="w-5 h-7 md:w-6 md:h-9" />
            <span className="text-white font-bold text-base md:text-lg">13</span>
          </div>
        </nav>

        {/* Profile circle */}
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-accent border-4 border-white/20 shadow-lg" />
      </header>
    </div>
  );
};

export default Home;
