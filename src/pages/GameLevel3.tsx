import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import eloquaLogo from "@/assets/eloqua-title.svg";
import jellyfish from "@/assets/jellyfish.svg";
import backArrow from "@/assets/back-arrow.svg";
import seaweedLeft from "@/assets/seaweed-tall-left.svg";
import seaweedRight from "@/assets/seaweed-tall-right.svg";
import jellyfishTreasure from "@/assets/jellyfish-treasure.png";
import bubbleSmall from "@/assets/bubble-small.png";
import BackgroundFish from "@/components/BackgroundFish";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useGameProgress } from "@/hooks/useGameProgress";

// Words with "ll" in the middle
const WORDS = ["Balloon", "Pillow", "Yellow", "Jello", "Mellow"];

// Pearl positions - on sides only, not behind center jellyfish
const PEARL_POSITIONS = [
  { top: "25%", left: "8%" },
  { top: "35%", left: "75%" },
  { top: "45%", left: "12%" },
  { top: "30%", left: "82%" },
  { top: "55%", left: "5%" },
];

const GameLevel3 = () => {
  const navigate = useNavigate();
  const { resetProgress } = useGameProgress();
  const { isListening, transcript, error, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [collectedPearls, setCollectedPearls] = useState<number[]>([]);
  const [animatingPearl, setAnimatingPearl] = useState<number | null>(null);
  const [gameState, setGameState] = useState<"ready" | "listening" | "complete">("ready");
  
  const treasureRef = useRef<HTMLDivElement>(null);

  const currentWord = WORDS[currentWordIndex];
  const isComplete = collectedPearls.length >= WORDS.length;

  const handleLogoClick = () => {
    resetProgress();
    navigate("/");
  };

  // Check transcript for current word
  useEffect(() => {
    if (!transcript || !isListening || animatingPearl !== null || isComplete) return;

    const lowerTranscript = transcript.toLowerCase();
    const targetWord = currentWord.toLowerCase();

    if (lowerTranscript.includes(targetWord)) {
      // Word detected! Start animation
      setAnimatingPearl(currentWordIndex);
      resetTranscript();

      // After animation, collect the pearl and show next word
      setTimeout(() => {
        setCollectedPearls(prev => [...prev, currentWordIndex]);
        setAnimatingPearl(null);
        
        if (currentWordIndex + 1 >= WORDS.length) {
          setGameState("complete");
          stopListening();
        } else {
          setCurrentWordIndex(prev => prev + 1);
        }
      }, 800);
    }
  }, [transcript, isListening, currentWord, currentWordIndex, animatingPearl, isComplete, resetTranscript, stopListening]);

  const handleStartListening = () => {
    resetTranscript();
    setGameState("listening");
    startListening();
  };

  const progress = 35 + (collectedPearls.length / WORDS.length) * 65;

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

      {/* Background jellyfish decorations */}
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
        <button onClick={handleLogoClick} className="hover:opacity-80 transition-opacity">
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
          onClick={() => navigate("/game-level-2")}
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
          Say the word to send the pearl to the treasure chest!
        </p>
        {error && (
          <p className="font-fredoka text-sm text-red-300 mt-2">{error}</p>
        )}
      </div>

      {/* Live transcript display */}
      {isListening && transcript && (
        <div className="absolute top-44 left-1/2 -translate-x-1/2 z-30 bg-white/90 rounded-2xl px-6 py-3 max-w-md animate-fade-in">
          <p className="font-fredoka text-base text-[hsl(200_50%_25%)] text-center">
            "{transcript}"
          </p>
        </div>
      )}

      {/* Game area */}
      <div className="relative z-10 w-full" style={{ height: "calc(100vh - 260px)" }}>
        {/* Pearls with words */}
        {WORDS.map((word, index) => {
          const isCollected = collectedPearls.includes(index);
          const isAnimating = animatingPearl === index;
          const isCurrent = index === currentWordIndex && !isCollected && !isAnimating;
          const position = PEARL_POSITIONS[index % PEARL_POSITIONS.length];

          if (isCollected) return null;

          return (
            <div
              key={index}
              className={`absolute transition-all duration-700 ${
                isAnimating 
                  ? 'opacity-0 scale-50' 
                  : isCurrent 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-30 scale-75'
              }`}
              style={{ 
                top: isAnimating ? '70%' : position.top, 
                left: isAnimating ? '50%' : position.left,
                transform: isAnimating ? 'translate(-50%, -50%)' : undefined,
              }}
            >
              {/* Pearl bubble */}
              <div className={`relative ${isCurrent ? 'animate-float' : ''}`}>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white via-pink-100 to-pink-200 shadow-lg flex items-center justify-center border-4 border-white/50">
                  <div className="w-3 h-3 rounded-full bg-white/80 absolute top-2 left-3" />
                </div>
                {/* Word label */}
                {isCurrent && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="font-fredoka font-bold text-xl md:text-2xl text-yellow-300 drop-shadow-lg animate-pulse">
                      {word}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Collected pearls counter */}
        <div className="absolute top-4 right-4 bg-white/20 rounded-full px-4 py-2 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-white to-pink-200" />
          <span className="font-fredoka text-white font-bold">
            {collectedPearls.length}/{WORDS.length}
          </span>
        </div>

        {/* Main jellyfish with treasure chest */}
        <div 
          ref={treasureRef}
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-10"
        >
          <img 
            src={jellyfishTreasure} 
            alt="Jellyfish with treasure" 
            className={`w-48 h-auto md:w-56 lg:w-64 drop-shadow-2xl ${
              animatingPearl !== null ? 'animate-bounce' : 'animate-float'
            }`}
          />
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
      {gameState === "listening" && !isComplete && (
        <button
          onClick={stopListening}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="relative">
            <div className="absolute top-2 left-0 right-0 h-14 bg-[#112C55] rounded-full" />
            <div className="relative bg-[hsl(var(--coral))] text-white font-fredoka font-bold text-xl px-10 py-4 rounded-full shadow-lg flex items-center gap-3">
              <span className="w-4 h-4 bg-white rounded-full animate-pulse" />
              Say: {currentWord}
            </div>
          </div>
        </button>
      )}

      {/* Complete state */}
      {gameState === "complete" && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 animate-fade-in">
          <p className="font-fredoka text-2xl text-yellow-300 font-bold">🎉 All pearls collected!</p>
          <button onClick={() => navigate("/game-level-4")}>
            <div className="relative">
              <div className="absolute top-2 left-0 right-0 h-14 bg-[#112C55] rounded-full" />
              <div className="relative bg-accent hover:bg-accent/90 text-white font-fredoka font-bold text-xl px-10 py-4 rounded-full shadow-lg transition-colors flex items-center gap-3 animate-bounce">
                Next Level →
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default GameLevel3;
