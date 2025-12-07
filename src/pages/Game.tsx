import { useNavigate } from "react-router-dom";
import { useState } from "react";
import eloquaLogo from "@/assets/eloqua-title.svg";
import jellyfish from "@/assets/jellyfish.svg";
import backArrow from "@/assets/back-arrow.svg";
import seaweedLeft from "@/assets/seaweed-tall-left.svg";
import seaweedRight from "@/assets/seaweed-tall-right.svg";
import BackgroundFish from "@/components/BackgroundFish";

const Game = () => {
  const navigate = useNavigate();
  const [progress] = useState(35); // Progress percentage
  const [powerLevel] = useState(20); // Power meter percentage

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
          d="M-100 280 Q200 200 500 250 T1000 200 T1500 280 L1500 1000 L-100 1000 Z" 
          fill="hsl(195 50% 16%)"
        />
      </svg>

      {/* Background fish */}
      <BackgroundFish />

      {/* Seaweed decorations */}
      <img 
        src={seaweedLeft} 
        alt="" 
        className="absolute left-0 bottom-0 h-[50%] w-auto animate-sway origin-bottom opacity-90"
      />
      <img 
        src={seaweedRight} 
        alt="" 
        className="absolute right-[2%] bottom-0 h-[25%] w-auto animate-sway-delayed origin-bottom opacity-80"
      />

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

        {/* Profile circle */}
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent border-4 border-[hsl(181_50%_40%)] shadow-lg" />
      </header>

      {/* Progress bar row */}
      <div className="relative z-20 px-4 md:px-8 py-2 flex items-center gap-4">
        {/* Back button */}
        <button 
          onClick={() => navigate("/exercise")}
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
          Say <span className="font-bold text-white">LAAA</span> to lift the jellyfish up!
        </p>
      </div>

      {/* Star reward indicator */}
      <div className="absolute top-[28%] right-[25%] z-20">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[hsl(180_30%_75%)] flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 fill-yellow-300">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      </div>

      {/* Main game area */}
      <div className="relative z-10 flex items-center justify-center" style={{ height: "calc(100vh - 200px)" }}>
        {/* Background jellyfish - smaller, faded */}
        <div className="absolute left-[18%] top-[20%] opacity-30">
          <img src={jellyfish} alt="" className="w-24 h-auto" />
        </div>
        <div className="absolute left-[25%] top-[35%] opacity-20">
          <img src={jellyfish} alt="" className="w-16 h-auto" />
        </div>
        <div className="absolute left-[15%] top-[45%] opacity-15">
          <img src={jellyfish} alt="" className="w-14 h-auto" />
        </div>

        {/* Main jellyfish with glow */}
        <div className="relative">
          {/* Glow effect */}
          <div 
            className="absolute inset-0 blur-3xl opacity-50 rounded-full"
            style={{ 
              background: "radial-gradient(circle, hsl(200 60% 60% / 0.5) 0%, transparent 70%)",
              transform: "scale(1.8)"
            }}
          />
          <img 
            src={jellyfish} 
            alt="Jellyfish" 
            className="relative w-52 h-auto md:w-72 lg:w-80 drop-shadow-2xl animate-float"
          />
        </div>
      </div>

      {/* Power meter - right side */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20">
        <div className="w-12 md:w-16 h-64 md:h-80 bg-[hsl(181_50%_35%)] rounded-full overflow-hidden shadow-lg border-4 border-[hsl(181_40%_45%)] flex flex-col-reverse">
          <div 
            className="w-full bg-[hsl(181_60%_50%)] rounded-full transition-all duration-300"
            style={{ height: `${powerLevel}%` }}
          />
        </div>
      </div>

      {/* Test button - Next Level */}
      <button
        onClick={() => navigate("/game-level-2")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-6 py-3 bg-accent text-white font-fredoka font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        Next Level →
      </button>

      {/* Fish school bottom right */}
      <div className="absolute bottom-[8%] right-[10%] z-10 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <svg
            key={i}
            viewBox="0 0 24 16"
            className="w-6 h-4 md:w-8 md:h-5"
            style={{ 
              transform: `translateY(${i % 2 === 0 ? 0 : 4}px) scaleX(-1)`,
              opacity: 0.9 - i * 0.1
            }}
          >
            <ellipse cx="10" cy="8" rx="8" ry="5" fill="#1e5f8a" />
            <path d="M18 8L24 3V13L18 8Z" fill="#1e5f8a" />
            <circle cx="6" cy="7" r="1.5" fill="white" />
            <circle cx="6" cy="7" r="0.8" fill="#333" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default Game;
