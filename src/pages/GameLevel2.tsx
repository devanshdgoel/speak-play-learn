import { useNavigate } from "react-router-dom";
import { useState } from "react";
import eloquaLogo from "@/assets/eloqua-title.svg";
import jellyfish from "@/assets/jellyfish.svg";
import backArrow from "@/assets/back-arrow.svg";
import seaweedLeft from "@/assets/seaweed-tall-left.svg";
import seaweedRight from "@/assets/seaweed-tall-right.svg";
import bubbleLeaf from "@/assets/bubble-leaf.png";
import bubbleLion from "@/assets/bubble-lion.png";
import bubbleLamp from "@/assets/bubble-lamp.png";
import bubbleLadybug from "@/assets/bubble-ladybug.png";
import BackgroundFish from "@/components/BackgroundFish";

const GameLevel2 = () => {
  const navigate = useNavigate();
  const [progress] = useState(70); // Progress increased from level 1

  const bubbles = [
    { id: 1, image: bubbleLeaf, word: "Leaf", position: { top: "25%", left: "12%" } },
    { id: 2, image: bubbleLadybug, word: "Ladybug", position: { top: "18%", left: "38%" } },
    { id: 3, image: bubbleLamp, word: "Lamp", position: { top: "25%", left: "65%" } },
    { id: 4, image: bubbleLion, word: "Lion", position: { top: "48%", left: "28%" } },
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
          onClick={() => navigate("/game")}
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
          Say the word to pop the bubble!
        </p>
      </div>

      {/* Bubbles area */}
      <div className="relative z-10 w-full" style={{ height: "calc(100vh - 220px)" }}>
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute animate-float cursor-pointer hover:scale-110 transition-transform"
            style={{ 
              top: bubble.position.top, 
              left: bubble.position.left,
            }}
          >
            <img 
              src={bubble.image} 
              alt={bubble.word}
              className="w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 drop-shadow-lg"
            />
          </div>
        ))}

        {/* Main jellyfish mascot - bottom right */}
        <div className="absolute bottom-[5%] right-[15%] z-10">
          <img 
            src={jellyfish} 
            alt="Jellyfish mascot" 
            className="w-36 h-auto md:w-44 lg:w-52 drop-shadow-2xl animate-float"
          />
        </div>
      </div>
    </div>
  );
};

export default GameLevel2;
