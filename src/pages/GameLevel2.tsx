import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useGameProgress } from "@/hooks/useGameProgress";

const GameLevel2 = () => {
  const navigate = useNavigate();
  const { resetProgress } = useGameProgress();
  const { isListening, transcript, error, startListening, stopListening, resetTranscript } = useSpeechRecognition();
  
  const [poppedBubbles, setPoppedBubbles] = useState<Set<string>>(new Set());
  const [gameState, setGameState] = useState<"ready" | "listening" | "complete">("ready");

  const bubbles = [
    { id: "leaf", image: bubbleLeaf, word: "Leaf", position: { top: "25%", left: "12%" } },
    { id: "ladybug", image: bubbleLadybug, word: "Ladybug", position: { top: "18%", left: "38%" } },
    { id: "lamp", image: bubbleLamp, word: "Lamp", position: { top: "25%", left: "65%" } },
    { id: "lion", image: bubbleLion, word: "Lion", position: { top: "48%", left: "28%" } },
  ];

  const handleLogoClick = () => {
    resetProgress();
    navigate("/");
  };

  // Check transcript for target words
  useEffect(() => {
    if (!transcript || !isListening) return;

    const lowerTranscript = transcript.toLowerCase();
    const newPopped = new Set(poppedBubbles);
    let changed = false;

    bubbles.forEach(bubble => {
      if (!poppedBubbles.has(bubble.id)) {
        // Check for the word or similar sounding words
        const word = bubble.word.toLowerCase();
        if (lowerTranscript.includes(word)) {
          newPopped.add(bubble.id);
          changed = true;
        }
      }
    });

    if (changed) {
      setPoppedBubbles(newPopped);
      resetTranscript(); // Clear to detect next word fresh
      
      // Check if all bubbles are popped
      if (newPopped.size === bubbles.length) {
        setGameState("complete");
        stopListening();
      }
    }
  }, [transcript, isListening, poppedBubbles, resetTranscript, stopListening]);

  const handleStartListening = () => {
    resetTranscript();
    setGameState("listening");
    startListening();
  };

  const progress = 35 + (poppedBubbles.size / bubbles.length) * 65; // 35% to 100%
  const remainingBubbles = bubbles.filter(b => !poppedBubbles.has(b.id));

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
          onClick={() => navigate("/game")}
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
          Say the word to pop the bubble!
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

      {/* Words remaining indicator */}
      {isListening && remainingBubbles.length > 0 && (
        <div className="absolute top-56 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {remainingBubbles.map(bubble => (
            <span 
              key={bubble.id}
              className="bg-white/20 text-white font-fredoka text-sm px-3 py-1 rounded-full"
            >
              {bubble.word}
            </span>
          ))}
        </div>
      )}

      {/* Bubbles area */}
      <div className="relative z-10 w-full" style={{ height: "calc(100vh - 220px)" }}>
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={`absolute transition-all duration-500 ${
              poppedBubbles.has(bubble.id) 
                ? 'opacity-0 scale-150 pointer-events-none' 
                : 'animate-float opacity-100'
            }`}
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
            {/* Word label below bubble */}
            <p className="font-fredoka text-white text-center mt-1 text-shadow-lg font-bold">
              {bubble.word}
            </p>
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
              Listening... ({poppedBubbles.size}/4)
            </div>
          </div>
        </button>
      )}

      {/* Complete state */}
      {gameState === "complete" && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 animate-fade-in">
          <p className="font-fredoka text-2xl text-yellow-300 font-bold">🎉 All bubbles popped!</p>
          <button onClick={() => navigate("/game-level-3")}>
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

export default GameLevel2;
