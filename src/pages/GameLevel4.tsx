import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import eloquaLogo from "@/assets/eloqua-title.svg";
import jellyfish from "@/assets/jellyfish.svg";
import backArrow from "@/assets/back-arrow.svg";
import coralPurple from "@/assets/coral-purple.png";
import coralTeal from "@/assets/coral-teal.png";
import coralOrange from "@/assets/coral-orange.png";
import coralPink from "@/assets/coral-pink.png";
import seaweedCurly from "@/assets/seaweed-curly.svg";
import BackgroundFish from "@/components/BackgroundFish";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useGameProgress } from "@/hooks/useGameProgress";

const CORAL_STOPS = [
  { id: 0, word: "FALL", x: "8%", bottom: "32%" },
  { id: 1, word: "BALL", x: "38%", bottom: "28%" },
  { id: 2, word: "SHELL", x: "68%", bottom: "35%" },
];

const GameLevel4 = () => {
  const navigate = useNavigate();
  const { resetProgress } = useGameProgress();
  const { isListening, transcript, error, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [gameState, setGameState] = useState<"ready" | "listening" | "complete">("ready");
  const [completedWords, setCompletedWords] = useState<Set<number>>(new Set());

  const handleLogoClick = () => {
    resetProgress();
    navigate("/");
  };

  // Check transcript for current word
  useEffect(() => {
    if (!transcript || !isListening || isJumping) return;

    const lowerTranscript = transcript.toLowerCase();
    const currentWord = CORAL_STOPS[currentPosition]?.word.toLowerCase();

    if (currentWord && lowerTranscript.includes(currentWord)) {
      // Word detected! Jump to next coral
      setIsJumping(true);
      setCompletedWords(prev => new Set([...prev, currentPosition]));
      resetTranscript();

      setTimeout(() => {
        if (currentPosition + 1 >= CORAL_STOPS.length) {
          // Last word - complete the game
          setGameState("complete");
          stopListening();
        } else {
          setCurrentPosition(prev => prev + 1);
        }
        setIsJumping(false);
      }, 600);
    }
  }, [transcript, isListening, currentPosition, isJumping, resetTranscript, stopListening]);

  const handleStartListening = () => {
    resetTranscript();
    setGameState("listening");
    startListening();
  };

  const progress = 35 + (completedWords.size / CORAL_STOPS.length) * 65;
  const currentStop = CORAL_STOPS[currentPosition];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(195 45% 35%) 0%, hsl(195 55% 20%) 100%)" }}
    >
      {/* Background wave pattern - ocean floor */}
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

      {/* Seaweed decorations - small */}
      <img 
        src={seaweedCurly} 
        alt="" 
        className="absolute left-[-1%] bottom-0 h-[25%] w-auto animate-sway origin-bottom opacity-70"
      />
      <img 
        src={seaweedCurly} 
        alt="" 
        className="absolute right-[-1%] bottom-0 h-[22%] w-auto animate-sway-delayed origin-bottom opacity-60 scale-x-[-1]"
      />

      {/* Coral decorations at bottom */}
      <img 
        src={coralPink} 
        alt="" 
        className="absolute left-[2%] bottom-[3%] w-12 h-auto opacity-90 z-[5]"
      />
      <img 
        src={coralOrange} 
        alt="" 
        className="absolute left-[22%] bottom-[2%] w-16 h-auto opacity-90 z-[5]"
      />
      <img 
        src={coralPurple} 
        alt="" 
        className="absolute right-[3%] bottom-[2%] w-20 h-auto opacity-90 z-[5]"
      />

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
          onClick={() => navigate("/game-level-3")}
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
          Say the word to make the jellyfish jump to the next coral!
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

      {/* Game area with coral platforms */}
      <div className="relative z-10 w-full" style={{ height: "calc(100vh - 260px)" }}>
        {/* Coral platforms with words */}
        {CORAL_STOPS.map((stop, index) => {
          const isCompleted = completedWords.has(index);
          const isCurrent = index === currentPosition;

          return (
            <div 
              key={stop.id} 
              className="absolute flex flex-col items-center"
              style={{ left: stop.x, bottom: stop.bottom }}
            >
              {/* Word label */}
              <span className={`font-fredoka font-bold text-xl md:text-2xl mb-2 transition-all duration-300 ${
                isCompleted 
                  ? 'text-green-400 line-through opacity-50' 
                  : isCurrent 
                    ? 'text-yellow-300 animate-pulse' 
                    : 'text-white/50'
              }`}>
                {stop.word}
              </span>
              
              {/* Star marker */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                isCompleted ? 'bg-yellow-400' : 'bg-[hsl(195_50%_30%)]'
              }`}>
                <span className={`text-lg ${isCompleted ? 'text-white' : 'text-yellow-400'}`}>★</span>
              </div>
              
              {/* Bounce path (dashed arc) - connects to next stop */}
              {index < CORAL_STOPS.length - 1 && (
                <svg 
                  className="absolute pointer-events-none"
                  style={{ 
                    left: "100%", 
                    top: "-20%",
                    width: "150px",
                    height: "100px"
                  }}
                  viewBox="0 0 150 100"
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M0 80 Q75 0 150 80" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeDasharray="6 6"
                    opacity={isCurrent ? "0.8" : "0.3"}
                  />
                </svg>
              )}
              
              {/* Coral platform */}
              <img 
                src={coralTeal} 
                alt="" 
                className="w-28 h-auto md:w-36 lg:w-40"
              />
            </div>
          );
        })}

        {/* Single jellyfish that jumps between corals */}
        {gameState !== "complete" && currentStop && (
          <div 
            className={`absolute transition-all duration-500 ease-out z-20 ${isJumping ? 'scale-110' : ''}`}
            style={{ 
              left: `calc(${currentStop.x} + 3%)`,
              bottom: `calc(${currentStop.bottom} + 12%)`,
              transform: isJumping ? 'translateY(-60px)' : 'translateY(0)',
            }}
          >
            <img 
              src={jellyfish} 
              alt="Jellyfish" 
              className={`w-20 h-auto md:w-24 drop-shadow-lg ${isJumping ? '' : 'animate-float'}`}
            />
          </div>
        )}

        {/* Jellyfish flying away animation when complete */}
        {gameState === "complete" && (
          <div 
            className="absolute z-20 animate-[flyAway_1s_ease-out_forwards]"
            style={{ 
              left: '75%',
              bottom: '50%',
            }}
          >
            <img 
              src={jellyfish} 
              alt="Jellyfish" 
              className="w-20 h-auto md:w-24 drop-shadow-lg"
            />
          </div>
        )}
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
      {gameState === "listening" && (
        <button
          onClick={stopListening}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="relative">
            <div className="absolute top-2 left-0 right-0 h-14 bg-[#112C55] rounded-full" />
            <div className="relative bg-[hsl(var(--coral))] text-white font-fredoka font-bold text-xl px-10 py-4 rounded-full shadow-lg flex items-center gap-3">
              <span className="w-4 h-4 bg-white rounded-full animate-pulse" />
              Say: {currentStop?.word}
            </div>
          </div>
        </button>
      )}

      {/* Complete state */}
      {gameState === "complete" && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 animate-fade-in">
          <p className="font-fredoka text-2xl text-yellow-300 font-bold">🎉 Level Complete!</p>
          <button onClick={() => navigate("/game-complete")}>
            <div className="relative">
              <div className="absolute top-2 left-0 right-0 h-14 bg-[#112C55] rounded-full" />
              <div className="relative bg-accent hover:bg-accent/90 text-white font-fredoka font-bold text-xl px-10 py-4 rounded-full shadow-lg transition-colors flex items-center gap-3 animate-bounce">
                Complete Game →
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Add keyframes for fly away animation */}
      <style>{`
        @keyframes flyAway {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(100px, -200px) scale(0.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default GameLevel4;
