import { useNavigate } from "react-router-dom";
import { useState } from "react";
import eloquaLogo from "@/assets/eloqua-title.svg";
import jellyfish from "@/assets/jellyfish.svg";
import backArrow from "@/assets/back-arrow.svg";
import seaweedLeft from "@/assets/seaweed-tall-left.svg";
import seaweedRight from "@/assets/seaweed-tall-right.svg";
import jellyfishTreasure from "@/assets/jellyfish-treasure.png";
import bubbleSmall from "@/assets/bubble-small.png";
import BackgroundFish from "@/components/BackgroundFish";

const GameLevel3 = () => {
  const navigate = useNavigate();
  const [progress] = useState(85); // Progress increased from level 2

  // Floating bubbles with one having a word
  const bubbles = [
    { id: 1, position: { top: "35%", left: "50%" }, hasWord: false },
    { id: 2, position: { top: "50%", left: "60%" }, hasWord: true, word: "Balloon" },
    { id: 3, position: { top: "55%", left: "65%" }, hasWord: false },
    { id: 4, position: { top: "30%", left: "25%" }, hasWord: false },
    { id: 5, position: { top: "45%", left: "80%" }, hasWord: false },
    { id: 6, position: { top: "60%", left: "35%" }, hasWord: false },
  ];

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
          d="M-100 450 Q200 380 500 420 T1000 380 T1500 450 L1500 1000 L-100 1000 Z" 
          fill="hsl(195 50% 16%)"
        />
      </svg>

      {/* Background fish */}
      <BackgroundFish />

      {/* Seaweed decorations */}
      <img 
        src={seaweedLeft} 
        alt="" 
        className="absolute left-0 bottom-0 h-[55%] w-auto animate-sway origin-bottom opacity-90"
      />
      <img 
        src={seaweedRight} 
        alt="" 
        className="absolute right-[2%] bottom-0 h-[30%] w-auto animate-sway-delayed origin-bottom opacity-80"
      />

      {/* Background jellyfish decorations - left side */}
      <div className="absolute left-[3%] bottom-[25%] opacity-40 z-[2]">
        <img src={jellyfish} alt="" className="w-12 h-auto" />
      </div>
      <div className="absolute left-[6%] bottom-[35%] opacity-30 z-[2]">
        <img src={jellyfish} alt="" className="w-10 h-auto" />
      </div>
      <div className="absolute left-[2%] bottom-[42%] opacity-25 z-[2]">
        <img src={jellyfish} alt="" className="w-8 h-auto" />
      </div>

      {/* Header */}
      <header className="relative z-20 px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => navigate("/")} className="hover:opacity-80 transition-opacity">
          <img 
            src={eloquaLogo} 
            alt="ELOQUA" 
            className="h-8 md:h-12 w-auto"
          />
        </button>

        {/* Title */}
        <h1 className="font-fredoka font-bold text-xl md:text-2xl text-white italic">
          Jellyfish Jungle
        </h1>

        {/* Profile circle with dots */}
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
        {/* Back button */}
        <button 
          onClick={() => navigate("/game-level-2")}
          className="hover:scale-110 active:scale-95 transition-transform"
        >
          <img src={backArrow} alt="Back" className="w-12 h-12 md:w-14 md:h-14" />
        </button>

        {/* Progress bar */}
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
          Help jellyfish lift the treasure! Say the word that comes up for the jellyfish to collect the pearl.
        </p>
      </div>

      {/* Game area */}
      <div className="relative z-10 w-full" style={{ height: "calc(100vh - 260px)" }}>
        {/* Floating bubbles */}
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute animate-float"
            style={{ 
              top: bubble.position.top, 
              left: bubble.position.left,
              animationDelay: `${bubble.id * 0.3}s`
            }}
          >
            <img 
              src={bubbleSmall} 
              alt=""
              className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg"
            />
            {bubble.hasWord && (
              <span className="absolute -right-16 top-1/2 -translate-y-1/2 font-fredoka font-bold text-lg md:text-xl text-[hsl(210_90%_50%)]">
                {bubble.word}
              </span>
            )}
          </div>
        ))}

        {/* Main jellyfish with treasure chest - center */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-10">
          <img 
            src={jellyfishTreasure} 
            alt="Jellyfish with treasure" 
            className="w-48 h-auto md:w-56 lg:w-64 drop-shadow-2xl animate-float"
          />
        </div>
      </div>

      {/* Test button - Next Level */}
      <button
        onClick={() => navigate("/game-level-4")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-6 py-3 bg-accent text-white font-fredoka font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        Next Level →
      </button>
    </div>
  );
};

export default GameLevel3;
