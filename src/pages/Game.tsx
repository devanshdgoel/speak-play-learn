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

    const VOLUME_THRESHOLD = 15;
    const FILL_RATE = 2;
    const DECAY_RATE = 1.5;

    if (volume > VOLUME_THRESHOLD) {
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
      setPowerLevel(prev => Math.max(0, prev - DECAY_RATE));
    }

    lastVolumeRef.current = volume;
  }, [volume, isListening, isCompleted, stopListening]);

  // Animate background and jellyfish position based on power level
  useEffect(() => {
    setBackgroundOffset(powerLevel * 1.5);
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Rich gradient background with depth */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `
            radial-gradient(ellipse 120% 60% at 50% 0%, hsl(190 55% 42%) 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at 20% 80%, hsl(200 60% 18%) 0%, transparent 40%),
            radial-gradient(ellipse 80% 50% at 80% 90%, hsl(185 50% 22%) 0%, transparent 40%),
            linear-gradient(180deg, hsl(195 50% 38%) 0%, hsl(200 60% 22%) 50%, hsl(205 65% 14%) 100%)
          `
        }}
      />

      {/* Subtle light rays from top */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `
            linear-gradient(170deg, hsl(180 60% 70% / 0.3) 0%, transparent 30%),
            linear-gradient(190deg, hsl(180 60% 70% / 0.2) 0%, transparent 25%)
          `
        }}
      />

      {/* Animated background wave pattern with better styling */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-200 ease-out"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ transform: `translateY(${backgroundOffset}px)` }}
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(200 55% 16%)" />
            <stop offset="100%" stopColor="hsl(205 60% 10%)" />
          </linearGradient>
        </defs>
        <path 
          d="M-100 300 Q200 220 500 270 T1000 220 T1500 300 L1500 1000 L-100 1000 Z" 
          fill="url(#waveGradient)"
        />
      </svg>

      {/* Background fish */}
      <BackgroundFish />

      {/* Seaweed decorations with improved shadows */}
      <img 
        src={seaweedLeft} 
        alt="" 
        className="absolute left-0 bottom-0 h-[50%] w-auto animate-sway origin-bottom transition-transform duration-200"
        style={{ 
          transform: `translateY(${backgroundOffset * 0.5}px)`,
          filter: 'drop-shadow(0 0 20px hsl(180 50% 20% / 0.5))'
        }}
      />
      <img 
        src={seaweedRight} 
        alt="" 
        className="absolute right-[2%] bottom-0 h-[25%] w-auto animate-sway-delayed origin-bottom transition-transform duration-200"
        style={{ 
          transform: `translateY(${backgroundOffset * 0.5}px)`,
          filter: 'drop-shadow(0 0 15px hsl(180 50% 20% / 0.4))'
        }}
      />

      {/* Header with glass effect */}
      <header className="relative z-20 px-4 md:px-8 py-4 flex items-center justify-between">
        <button onClick={handleLogoClick} className="hover:opacity-80 transition-opacity hover:scale-105 active:scale-95">
          <img 
            src={eloquaLogo} 
            alt="ELOQUA" 
            className="h-8 md:h-12 w-auto drop-shadow-lg"
            style={{ filter: 'drop-shadow(0 2px 8px hsl(200 60% 10% / 0.4))' }}
          />
        </button>
        <h1 
          className="font-fredoka font-bold text-xl md:text-2xl lg:text-3xl text-white italic tracking-wide"
          style={{ 
            textShadow: '0 2px 10px hsl(200 60% 10% / 0.5), 0 0 40px hsl(180 60% 50% / 0.2)'
          }}
        >
          Jellyfish Jungle
        </h1>
        <div 
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-accent to-[hsl(15_70%_45%)] border-4 border-white/30 shadow-xl"
          style={{ boxShadow: '0 4px 20px hsl(22 73% 40% / 0.4), inset 0 2px 10px hsl(0 0% 100% / 0.2)' }}
        />
      </header>

      {/* Progress bar row with refined styling */}
      <div className="relative z-20 px-4 md:px-8 py-2 flex items-center gap-4">
        <button 
          onClick={() => navigate("/exercise")}
          className="hover:scale-110 active:scale-95 transition-transform"
          style={{ filter: 'drop-shadow(0 2px 6px hsl(200 60% 10% / 0.3))' }}
        >
          <img src={backArrow} alt="Back" className="w-12 h-12 md:w-14 md:h-14" />
        </button>
        <div 
          className="flex-1 h-5 md:h-6 bg-gradient-to-b from-[hsl(180_35%_65%)] to-[hsl(180_40%_55%)] rounded-full overflow-hidden shadow-inner border border-white/20"
          style={{ boxShadow: 'inset 0 2px 8px hsl(200 50% 20% / 0.3), 0 2px 8px hsl(200 60% 10% / 0.2)' }}
        >
          <div 
            className="h-full rounded-full transition-all duration-300 relative overflow-hidden"
            style={{ 
              width: isCompleted ? '100%' : '35%',
              background: 'linear-gradient(180deg, hsl(175 70% 55%) 0%, hsl(181 69% 42%) 50%, hsl(181 65% 35%) 100%)'
            }}
          >
            <div 
              className="absolute inset-0 opacity-40"
              style={{ background: 'linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.4) 50%, transparent 100%)' }}
            />
          </div>
        </div>
      </div>

      {/* Instruction text with refined typography */}
      <div className="relative z-20 px-4 md:px-8 py-4">
        <p 
          className="font-fredoka text-lg md:text-xl text-white/90 italic"
          style={{ textShadow: '0 2px 6px hsl(200 60% 10% / 0.3)' }}
        >
          Say <span 
            className="font-bold text-2xl md:text-3xl not-italic"
            style={{ 
              background: 'linear-gradient(180deg, hsl(50 100% 75%) 0%, hsl(40 100% 60%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 4px hsl(40 100% 30% / 0.5))'
            }}
          >LAAA</span> to lift the jellyfish up!
        </p>
        {error && (
          <p className="font-fredoka text-sm text-red-300 mt-2 bg-red-500/20 px-3 py-1 rounded-lg inline-block">{error}</p>
        )}
      </div>

      {/* Volume indicator when listening - refined */}
      {isListening && (
        <div className="absolute top-44 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
          <div className="flex gap-1 items-end h-8">
            {[20, 35, 50, 65, 80].map((threshold, i) => (
              <div 
                key={i}
                className="rounded-full transition-all duration-100"
                style={{ 
                  height: `${12 + i * 4}px`,
                  width: '6px',
                  background: volume >= threshold 
                    ? `linear-gradient(180deg, hsl(175 70% 60%) 0%, hsl(181 69% 45%) 100%)`
                    : 'hsl(0 0% 100% / 0.2)',
                  boxShadow: volume >= threshold ? '0 0 8px hsl(175 70% 50% / 0.6)' : 'none'
                }}
              />
            ))}
          </div>
          <span className="font-fredoka text-white/90 text-sm font-medium">
            {volume > 15 ? "Keep going!" : "Speak up!"}
          </span>
        </div>
      )}

      {/* Star reward indicator - refined with glow */}
      <div 
        className="absolute top-[18%] right-[22%] z-20 transition-all duration-300"
        style={{ transform: `translateY(${-backgroundOffset * 0.3}px)` }}
      >
        <div 
          className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
            isCompleted ? 'scale-125' : ''
          }`}
          style={{ 
            background: isCompleted 
              ? 'linear-gradient(135deg, hsl(45 100% 60%) 0%, hsl(35 100% 50%) 100%)'
              : 'linear-gradient(135deg, hsl(180 30% 70%) 0%, hsl(180 35% 55%) 100%)',
            boxShadow: isCompleted 
              ? '0 0 40px hsl(45 100% 50% / 0.6), 0 0 80px hsl(45 100% 50% / 0.3), inset 0 2px 10px hsl(0 0% 100% / 0.3)'
              : '0 4px 20px hsl(200 50% 15% / 0.3), inset 0 2px 8px hsl(0 0% 100% / 0.2)'
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-9 h-9 md:w-11 md:h-11 transition-all"
            style={{ 
              filter: isCompleted ? 'drop-shadow(0 0 6px hsl(0 0% 100% / 0.8))' : 'none'
            }}
          >
            <defs>
              <linearGradient id="starGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={isCompleted ? "hsl(0 0% 100%)" : "hsl(50 100% 75%)"} />
                <stop offset="100%" stopColor={isCompleted ? "hsl(45 50% 90%)" : "hsl(45 100% 55%)"} />
              </linearGradient>
            </defs>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#starGradient)" />
          </svg>
        </div>
      </div>

      {/* Main game area */}
      <div className="relative z-10 flex items-center justify-center" style={{ height: "calc(100vh - 250px)" }}>
        {/* Background jellyfish with depth effect */}
        <div 
          className="absolute left-[15%] top-[18%] transition-transform duration-200"
          style={{ 
            transform: `translateY(${backgroundOffset * 0.8}px)`,
            opacity: 0.25,
            filter: 'blur(1px)'
          }}
        >
          <img src={jellyfish} alt="" className="w-28 h-auto" />
        </div>
        <div 
          className="absolute left-[22%] top-[38%] transition-transform duration-200"
          style={{ 
            transform: `translateY(${backgroundOffset * 0.6}px)`,
            opacity: 0.15,
            filter: 'blur(2px)'
          }}
        >
          <img src={jellyfish} alt="" className="w-18 h-auto" />
        </div>

        {/* Main jellyfish with enhanced glow */}
        <div 
          className="relative transition-transform duration-200 ease-out"
          style={{ transform: `translateY(${-powerLevel * 2}px)` }}
        >
          {/* Multi-layered glow effect */}
          <div 
            className="absolute inset-0 blur-3xl rounded-full transition-all duration-200"
            style={{ 
              background: `radial-gradient(circle, hsl(190 70% 65% / ${glowIntensity * 0.8}) 0%, hsl(200 60% 50% / ${glowIntensity * 0.4}) 40%, transparent 70%)`,
              transform: "scale(2.5)",
            }}
          />
          <div 
            className="absolute inset-0 blur-xl rounded-full transition-all duration-200"
            style={{ 
              background: `radial-gradient(circle, hsl(180 80% 75% / ${glowIntensity * 0.6}) 0%, transparent 50%)`,
              transform: "scale(1.8)",
            }}
          />
          <img 
            src={jellyfish} 
            alt="Jellyfish" 
            className={`relative w-56 h-auto md:w-72 lg:w-80 ${isListening && volume > 15 ? '' : 'animate-float'}`}
            style={{ 
              filter: `drop-shadow(0 10px 30px hsl(200 60% 20% / 0.4)) drop-shadow(0 0 20px hsl(180 60% 50% / ${glowIntensity * 0.5}))`
            }}
          />
        </div>
      </div>

      {/* Power meter - refined with glass effect */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <p 
            className="font-fredoka text-white/80 text-xs font-semibold text-center mb-2 tracking-widest uppercase"
            style={{ textShadow: '0 1px 4px hsl(200 60% 10% / 0.4)' }}
          >
            Power
          </p>
          <div 
            className="w-14 md:w-16 h-64 md:h-80 rounded-full overflow-hidden flex flex-col-reverse relative"
            style={{ 
              background: 'linear-gradient(180deg, hsl(200 50% 20%) 0%, hsl(205 55% 15%) 100%)',
              boxShadow: 'inset 0 4px 20px hsl(200 60% 10% / 0.5), 0 4px 20px hsl(200 60% 10% / 0.3), 0 0 0 3px hsl(180 40% 30% / 0.5)',
              border: '1px solid hsl(180 30% 40% / 0.3)'
            }}
          >
            {/* Meter fill with glow */}
            <div 
              className="w-full rounded-full transition-all duration-150 relative overflow-hidden"
              style={{ 
                height: `${powerLevel}%`,
                background: powerLevel >= 100 
                  ? 'linear-gradient(180deg, hsl(50 100% 70%) 0%, hsl(45 100% 55%) 50%, hsl(35 100% 45%) 100%)' 
                  : 'linear-gradient(180deg, hsl(175 70% 60%) 0%, hsl(181 65% 45%) 50%, hsl(185 60% 35%) 100%)',
                boxShadow: powerLevel >= 100 
                  ? '0 0 20px hsl(45 100% 50% / 0.5), inset 0 0 20px hsl(50 100% 70% / 0.3)'
                  : '0 0 15px hsl(175 60% 50% / 0.4), inset 0 0 15px hsl(175 70% 60% / 0.2)'
              }}
            >
              {/* Shine effect */}
              <div 
                className="absolute inset-0"
                style={{ 
                  background: 'linear-gradient(90deg, transparent 0%, hsl(0 0% 100% / 0.25) 30%, hsl(0 0% 100% / 0.25) 40%, transparent 100%)',
                  width: '50%'
                }}
              />
            </div>
            {/* Glass reflection */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{ 
                background: 'linear-gradient(90deg, hsl(0 0% 100% / 0.08) 0%, transparent 30%, transparent 70%, hsl(0 0% 100% / 0.05) 100%)'
              }}
            />
          </div>
          <p 
            className="font-fredoka text-white font-bold text-center mt-3 text-lg"
            style={{ textShadow: '0 2px 6px hsl(200 60% 10% / 0.4)' }}
          >
            {Math.round(powerLevel)}%
          </p>
        </div>
      </div>

      {/* Start button - premium styling */}
      {gameState === "ready" && (
        <button
          onClick={handleStartListening}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 group"
        >
          <div className="relative">
            <div 
              className="absolute top-2 left-0 right-0 h-14 rounded-full"
              style={{ background: 'hsl(200 70% 15%)' }}
            />
            <div 
              className="relative text-white font-fredoka font-bold text-xl px-10 py-4 rounded-full transition-all duration-200 flex items-center gap-3 group-hover:scale-105 group-active:scale-95"
              style={{ 
                background: 'linear-gradient(180deg, hsl(175 65% 50%) 0%, hsl(181 69% 42%) 50%, hsl(185 65% 35%) 100%)',
                boxShadow: '0 4px 20px hsl(181 60% 30% / 0.4), inset 0 2px 10px hsl(0 0% 100% / 0.2), 0 0 30px hsl(175 60% 50% / 0.2)'
              }}
            >
              <span className="text-2xl">🎤</span> Start Speaking
            </div>
          </div>
        </button>
      )}

      {/* Listening state - premium styling */}
      {gameState === "listening" && !isCompleted && (
        <button
          onClick={stopListening}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 group"
        >
          <div className="relative">
            <div 
              className="absolute top-2 left-0 right-0 h-14 rounded-full"
              style={{ background: 'hsl(15 70% 25%)' }}
            />
            <div 
              className="relative text-white font-fredoka font-bold text-xl px-10 py-4 rounded-full flex items-center gap-3"
              style={{ 
                background: 'linear-gradient(180deg, hsl(22 80% 60%) 0%, hsl(22 73% 52%) 50%, hsl(20 70% 42%) 100%)',
                boxShadow: '0 4px 20px hsl(22 70% 35% / 0.4), inset 0 2px 10px hsl(0 0% 100% / 0.2), 0 0 30px hsl(22 70% 50% / 0.3)'
              }}
            >
              <span 
                className="w-4 h-4 rounded-full animate-pulse"
                style={{ 
                  background: 'linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(0 0% 90%) 100%)',
                  boxShadow: '0 0 10px hsl(0 0% 100% / 0.6)'
                }}
              />
              Say LAAA...
            </div>
          </div>
        </button>
      )}

      {/* Success state - premium styling */}
      {isCompleted && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 animate-fade-in">
          <p 
            className="font-fredoka text-2xl md:text-3xl font-bold"
            style={{ 
              background: 'linear-gradient(180deg, hsl(50 100% 75%) 0%, hsl(40 100% 55%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 10px hsl(45 100% 50% / 0.5))'
            }}
          >
            🎉 Amazing!
          </p>
          <button onClick={handleNextLevel} className="group">
            <div className="relative">
              <div 
                className="absolute top-2 left-0 right-0 h-14 rounded-full"
                style={{ background: 'hsl(15 70% 25%)' }}
              />
              <div 
                className="relative text-white font-fredoka font-bold text-xl px-10 py-4 rounded-full transition-all duration-200 flex items-center gap-3 animate-bounce group-hover:scale-105"
                style={{ 
                  background: 'linear-gradient(180deg, hsl(22 80% 60%) 0%, hsl(22 73% 52%) 50%, hsl(20 70% 42%) 100%)',
                  boxShadow: '0 4px 20px hsl(22 70% 35% / 0.4), inset 0 2px 10px hsl(0 0% 100% / 0.2), 0 0 40px hsl(22 70% 50% / 0.4)'
                }}
              >
                Next Level →
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Fish school bottom right - enhanced */}
      <div 
        className="absolute bottom-[8%] right-[10%] z-10 flex gap-2 transition-transform duration-200"
        style={{ transform: `translateY(${backgroundOffset * 0.3}px)` }}
      >
        {[0, 1, 2, 3].map((i) => (
          <svg
            key={i}
            viewBox="0 0 24 16"
            className="w-7 h-5 md:w-9 md:h-6"
            style={{ 
              transform: `translateY(${i % 2 === 0 ? 0 : 5}px) scaleX(-1)`,
              opacity: 0.95 - i * 0.1,
              filter: 'drop-shadow(0 2px 4px hsl(200 60% 10% / 0.3))'
            }}
          >
            <defs>
              <linearGradient id={`fishGrad${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(205 70% 45%)" />
                <stop offset="100%" stopColor="hsl(210 75% 30%)" />
              </linearGradient>
            </defs>
            <ellipse cx="10" cy="8" rx="8" ry="5" fill={`url(#fishGrad${i})`} />
            <path d="M18 8L24 3V13L18 8Z" fill={`url(#fishGrad${i})`} />
            <circle cx="6" cy="7" r="1.5" fill="white" />
            <circle cx="6" cy="7" r="0.8" fill="#1a1a2e" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default Game;
