import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import eloquaLogo from "@/assets/eloqua-title.svg";
import jellyfish from "@/assets/jellyfish.svg";
import backArrow from "@/assets/back-arrow.svg";
import seaweedLeft from "@/assets/seaweed-tall-left.svg";
import seaweedRight from "@/assets/seaweed-tall-right.svg";
import BackgroundFish from "@/components/BackgroundFish";
import { useVoiceDetection } from "@/hooks/useVoiceDetection";
import { useGameProgress } from "@/hooks/useGameProgress";

const Game = () => {
  const navigate = useNavigate();
  const { resetProgress } = useGameProgress();
  const { isListening, volume, error, startListening, stopListening } = useVoiceDetection();
  
  const [powerLevel, setPowerLevel] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [gameState, setGameState] = useState<"ready" | "listening" | "success">("ready");
  const [backgroundOffset, setBackgroundOffset] = useState(0);
  
  // Track if power should decay when not speaking loud enough
  const lastVolumeRef = useRef(0);

  const handleLogoClick = () => {
    resetProgress();
    navigate("/");
  };

  // Update power level based on voice volume
  useEffect(() => {
    if (!isListening || isCompleted) return;

    const VOLUME_THRESHOLD = 15; // Minimum volume to count as speaking
    const FILL_RATE = 2; // How fast the bar fills when speaking
    const DECAY_RATE = 1.5; // How fast it decays when quiet

    if (volume > VOLUME_THRESHOLD) {
      // Speaking loud enough - fill the bar
      setPowerLevel(prev => {
        const newLevel = Math.min(100, prev + FILL_RATE);
        if (newLevel >= 100 && !isCompleted) {
          setIsCompleted(true);
          setGameState("success");
          stopListening();
        }
        return newLevel;
      });
    } else {
      // Not speaking loud enough - slowly decay
      setPowerLevel(prev => Math.max(0, prev - DECAY_RATE));
    }

    lastVolumeRef.current = volume;
  }, [volume, isListening, isCompleted, stopListening]);

  // Animate background and jellyfish position based on power level
  useEffect(() => {
    setBackgroundOffset(powerLevel * 1.5); // Max 150px offset
  }, [powerLevel]);

  const handleStartListening = async () => {
    setPowerLevel(0);
    setBackgroundOffset(0);
    setGameState("listening");
    await startListening();
  };

  const handleNextLevel = () => {
    navigate("/game-level-2");
  };

  // Calculate jellyfish glow intensity based on volume when listening
  const glowIntensity = isListening ? 0.3 + (volume / 100) * 0.7 : 0.3;

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(195 45% 35%) 0%, hsl(195 55% 20%) 100%)" }}
    >
      {/* Animated background wave pattern */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-150"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ transform: `translateY(${backgroundOffset}px)` }}
      >
        <path 
          d="M-100 280 Q200 200 500 250 T1000 200 T1500 280 L1500 1000 L-100 1000 Z" 
          fill="hsl(195 50% 16%)"
        />
      </svg>

      {/* Background fish */}
      <BackgroundFish />

      {/* Seaweed decorations - move with background */}
      <img 
        src={seaweedLeft} 
        alt="" 
        className="absolute left-0 bottom-0 h-[50%] w-auto animate-sway origin-bottom opacity-90 transition-transform duration-150"
        style={{ transform: `translateY(${backgroundOffset * 0.5}px)` }}
      />
      <img 
        src={seaweedRight} 
        alt="" 
        className="absolute right-[2%] bottom-0 h-[25%] w-auto animate-sway-delayed origin-bottom opacity-80 transition-transform duration-150"
        style={{ transform: `translateY(${backgroundOffset * 0.5}px)` }}
      />

      {/* Header */}
      <header className="relative z-20 px-4 md:px-8 py-4 flex items-center justify-between">
        <button onClick={handleLogoClick} className="hover:opacity-80 transition-opacity">
          <img src={eloquaLogo} alt="ELOQUA" className="h-8 md:h-12 w-auto" />
        </button>
        <h1 className="font-fredoka font-bold text-xl md:text-2xl text-white italic">
          Jellyfish Jungle
        </h1>
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-accent border-4 border-[hsl(181_50%_40%)] shadow-lg" />
      </header>

      {/* Progress bar row */}
      <div className="relative z-20 px-4 md:px-8 py-2 flex items-center gap-4">
        <button 
          onClick={() => navigate("/exercise")}
          className="hover:scale-110 active:scale-95 transition-transform"
        >
          <img src={backArrow} alt="Back" className="w-12 h-12 md:w-14 md:h-14" />
        </button>
        <div className="flex-1 h-6 md:h-8 bg-[hsl(180_40%_75%)] rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-[hsl(181_69%_45%)] rounded-full transition-all duration-300"
            style={{ width: isCompleted ? '100%' : '35%' }}
          />
        </div>
      </div>

      {/* Instruction text */}
      <div className="relative z-20 px-4 md:px-8 py-4">
        <p className="font-fredoka text-lg md:text-xl text-white/90 italic">
          Say <span className="font-bold text-white text-2xl">LAAA</span> to lift the jellyfish up!
        </p>
        {error && (
          <p className="font-fredoka text-sm text-red-300 mt-2">{error}</p>
        )}
      </div>

      {/* Volume indicator when listening */}
      {isListening && (
        <div className="absolute top-44 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          <div className="flex gap-1 items-end h-8">
            {[20, 35, 50, 65, 80].map((threshold, i) => (
              <div 
                key={i}
                className={`w-2 rounded-full transition-all duration-100 ${
                  volume >= threshold ? 'bg-[hsl(181_69%_50%)]' : 'bg-white/30'
                }`}
                style={{ height: `${12 + i * 4}px` }}
              />
            ))}
          </div>
          <span className="font-fredoka text-white/80 text-sm ml-2">
            {volume > 15 ? "Keep going!" : "Speak up!"}
          </span>
        </div>
      )}

      {/* Star reward indicator */}
      <div 
        className="absolute top-[20%] right-[25%] z-20 transition-all duration-300"
        style={{ transform: `translateY(${-backgroundOffset * 0.3}px)` }}
      >
        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${isCompleted ? 'bg-yellow-400 scale-125' : 'bg-[hsl(180_30%_75%)]'}`}>
          <svg viewBox="0 0 24 24" className={`w-8 h-8 md:w-10 md:h-10 transition-colors ${isCompleted ? 'fill-white' : 'fill-yellow-300'}`}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      </div>

      {/* Main game area */}
      <div className="relative z-10 flex items-center justify-center" style={{ height: "calc(100vh - 250px)" }}>
        {/* Background jellyfish - smaller, faded, move with background */}
        <div 
          className="absolute left-[18%] top-[20%] opacity-30 transition-transform duration-150"
          style={{ transform: `translateY(${backgroundOffset * 0.8}px)` }}
        >
          <img src={jellyfish} alt="" className="w-24 h-auto" />
        </div>
        <div 
          className="absolute left-[25%] top-[35%] opacity-20 transition-transform duration-150"
          style={{ transform: `translateY(${backgroundOffset * 0.6}px)` }}
        >
          <img src={jellyfish} alt="" className="w-16 h-auto" />
        </div>

        {/* Main jellyfish - rises as power increases */}
        <div 
          className="relative transition-transform duration-150"
          style={{ transform: `translateY(${-powerLevel * 2}px)` }}
        >
          {/* Dynamic glow effect based on voice */}
          <div 
            className="absolute inset-0 blur-3xl rounded-full transition-opacity duration-150"
            style={{ 
              background: `radial-gradient(circle, hsl(200 60% 60% / ${glowIntensity}) 0%, transparent 70%)`,
              transform: "scale(2)",
            }}
          />
          <img 
            src={jellyfish} 
            alt="Jellyfish" 
            className={`relative w-52 h-auto md:w-72 lg:w-80 drop-shadow-2xl ${isListening && volume > 15 ? '' : 'animate-float'}`}
          />
        </div>
      </div>

      {/* Power meter - right side */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          {/* Label */}
          <p className="font-fredoka text-white/70 text-xs text-center mb-2">POWER</p>
          <div className="w-12 md:w-16 h-64 md:h-80 bg-[hsl(181_50%_25%)] rounded-full overflow-hidden shadow-lg border-4 border-[hsl(181_40%_35%)] flex flex-col-reverse">
            <div 
              className="w-full rounded-full transition-all duration-150"
              style={{ 
                height: `${powerLevel}%`,
                background: powerLevel >= 100 
                  ? 'linear-gradient(to top, hsl(50 90% 50%), hsl(40 100% 60%))' 
                  : 'linear-gradient(to top, hsl(181 60% 40%), hsl(181 70% 55%))'
              }}
            />
          </div>
          {/* Percentage */}
          <p className="font-fredoka text-white font-bold text-center mt-2">{Math.round(powerLevel)}%</p>
        </div>
      </div>

      {/* Start button */}
      {gameState === "ready" && (
        <button
          onClick={handleStartListening}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="relative">
            <div className="absolute top-2 left-0 right-0 h-14 bg-[#112C55] rounded-full" />
            <div className="relative bg-[hsl(181_69%_42%)] hover:bg-[hsl(181_69%_38%)] text-white font-fredoka font-bold text-xl px-10 py-4 rounded-full shadow-lg transition-colors flex items-center gap-3">
              🎤 Start Speaking
            </div>
          </div>
        </button>
      )}

      {/* Listening state */}
      {gameState === "listening" && !isCompleted && (
        <button
          onClick={stopListening}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="relative">
            <div className="absolute top-2 left-0 right-0 h-14 bg-[#112C55] rounded-full" />
            <div className="relative bg-[hsl(var(--coral))] text-white font-fredoka font-bold text-xl px-10 py-4 rounded-full shadow-lg flex items-center gap-3">
              <span className="w-4 h-4 bg-white rounded-full animate-pulse" />
              Say LAAA...
            </div>
          </div>
        </button>
      )}

      {/* Success state */}
      {isCompleted && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 animate-fade-in">
          <p className="font-fredoka text-2xl text-yellow-300 font-bold">🎉 Amazing!</p>
          <button onClick={handleNextLevel}>
            <div className="relative">
              <div className="absolute top-2 left-0 right-0 h-14 bg-[#112C55] rounded-full" />
              <div className="relative bg-accent hover:bg-accent/90 text-white font-fredoka font-bold text-xl px-10 py-4 rounded-full shadow-lg transition-colors flex items-center gap-3 animate-bounce">
                Next Level →
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Fish school bottom right */}
      <div 
        className="absolute bottom-[8%] right-[10%] z-10 flex gap-2 transition-transform duration-150"
        style={{ transform: `translateY(${backgroundOffset * 0.3}px)` }}
      >
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
