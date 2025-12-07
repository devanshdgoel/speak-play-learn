import { useState } from "react";
import { useNavigate } from "react-router-dom";
import eloquaLogo from "@/assets/eloqua-title.svg";
import backArrow from "@/assets/back-arrow.svg";
import lampImage from "@/assets/lamp.png";
import tableImage from "@/assets/table.png";
import seaweedLeft from "@/assets/seaweed-tall-left.svg";
import seaweedRight from "@/assets/seaweed-tall-right.svg";
import BackgroundFish from "@/components/BackgroundFish";
import { useGameProgress } from "@/hooks/useGameProgress";

type GameState = "ready" | "listening" | "feedback" | "completed";

const DescribeExercise = () => {
  const navigate = useNavigate();
  const { completeCurrentLevel, resetProgress } = useGameProgress();
  
  const handleLogoClick = () => {
    resetProgress();
    navigate("/");
  };
  const [gameState, setGameState] = useState<GameState>("ready");
  const [feedbackText, setFeedbackText] = useState("");
  const [describedObject, setDescribedObject] = useState("");

  const handleStartSpeaking = () => {
    setGameState("listening");
    
    // Simulate AI evaluation after 3 seconds
    setTimeout(() => {
      // Random chance of success or feedback
      const isSuccess = Math.random() > 0.3;
      
      if (isSuccess) {
        setDescribedObject("bottle");
        setGameState("completed");
      } else {
        setFeedbackText('Try that again with emphasis on the "r" sounds');
        setGameState("feedback");
      }
    }, 3000);
  };

  const handleContinue = () => {
    completeCurrentLevel();
    navigate("/home");
  };

  const handleTryAgain = () => {
    setGameState("ready");
    setFeedbackText("");
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(180deg, hsl(175 35% 75%) 0%, hsl(175 40% 70%) 100%)" }}
    >
      {/* Background wave pattern */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <path 
          d="M-100 350 Q200 280 500 320 T1000 280 T1500 350 L1500 1000 L-100 1000 Z" 
          fill="hsl(175 35% 68%)"
        />
      </svg>

      {/* Background fish */}
      <BackgroundFish />

      {/* Seaweed decorations */}
      <img 
        src={seaweedLeft} 
        alt="" 
        className="absolute left-0 bottom-0 h-[50%] w-auto animate-sway origin-bottom z-10"
      />
      <img 
        src={seaweedRight} 
        alt="" 
        className="absolute right-0 bottom-0 h-[45%] w-auto animate-sway-delayed origin-bottom z-10"
      />

      {/* Top progress bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-[hsl(181_69%_42%)] rounded-b-full" />

      {/* Header */}
      <header className="relative z-20 px-4 md:px-8 py-4 flex items-center justify-between">
        <button onClick={handleLogoClick} className="hover:opacity-80 transition-opacity">
          <img src={eloquaLogo} alt="ELOQUA" className="h-8 md:h-10 w-auto" />
        </button>
        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-accent border-4 border-white/20 shadow-lg" />
      </header>

      {/* Progress bar with back button */}
      <div className="relative z-20 px-4 md:px-8 flex items-center gap-4 mt-2">
        <button 
          onClick={() => navigate("/home")}
          className="hover:scale-110 transition-transform"
        >
          <img src={backArrow} alt="Back" className="w-10 h-10 md:w-12 md:h-12" />
        </button>
        <div className="flex-1 h-4 md:h-5 bg-[hsl(175_30%_65%)] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[hsl(181_69%_42%)] rounded-full transition-all duration-500"
            style={{ width: "50%" }}
          />
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 pt-4 pb-8">
        {/* Instruction text - positioned at top with padding */}
        <p className="font-fredoka text-lg md:text-xl text-[hsl(200_50%_25%)] mb-4 italic max-w-lg text-center">
          Look for an object around you and describe it in one sentence.
        </p>
        
        {/* Spacer to push content down */}
        <div className="flex-1 flex flex-col items-center justify-center">

        {/* Object illustration with feedback bubble */}
        <div className="relative mb-8">
          {/* Table and lamp */}
          <div className="relative">
            <img 
              src={lampImage} 
              alt="Lamp" 
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-16 h-auto z-10"
            />
            <img 
              src={tableImage} 
              alt="Table" 
              className="w-40 h-auto"
            />
            {/* Bubbles decoration */}
            <div className="absolute -right-4 top-0 flex flex-col gap-1">
              <div className="w-3 h-3 rounded-full bg-white/40" />
              <div className="w-2 h-2 rounded-full bg-white/30 ml-2" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/35 ml-1" />
            </div>
          </div>

          {/* Feedback bubble - only show when in feedback state */}
          {gameState === "feedback" && (
            <div className="absolute -right-48 md:-right-64 top-0 animate-fade-in">
              <div className="relative bg-white rounded-3xl px-4 py-3 shadow-lg max-w-[200px] md:max-w-[240px]">
                <p className="font-fredoka text-sm md:text-base text-[hsl(200_50%_25%)] text-center">
                  {feedbackText}
                </p>
                {/* Bubble tail */}
                <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="M20 10 L0 0 L5 10 L0 20 Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Start Speaking button */}
        {gameState !== "completed" && (
          <button
            onClick={gameState === "feedback" ? handleTryAgain : handleStartSpeaking}
            disabled={gameState === "listening"}
            className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="relative">
              {/* Button shadow */}
              <div className="absolute top-2 left-0 right-0 h-12 md:h-14 bg-[#112C55] rounded-full" />
              {/* Button body */}
              <div className="relative bg-[hsl(181_69%_42%)] hover:bg-[hsl(181_69%_38%)] text-white font-fredoka font-bold text-xl md:text-2xl px-12 md:px-16 py-3 md:py-4 rounded-full shadow-lg transition-colors">
                {gameState === "listening" ? "Listening..." : "Start Speaking"}
                {/* Bubble decoration */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <div className="w-1 h-1 rounded-full bg-white/30 ml-0.5" />
                </div>
              </div>
            </div>
          </button>
        )}
        </div>

        {/* Completed modal */}
        {gameState === "completed" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
            <div className="bg-[hsl(200_30%_70%)] rounded-3xl px-8 py-6 shadow-xl max-w-sm mx-4 animate-scale-in">
              <h2 className="font-fredoka font-bold text-3xl text-[hsl(200_50%_25%)] text-center mb-2">
                Completed!
              </h2>
              <p className="font-fredoka text-lg text-[hsl(200_50%_35%)] text-center mb-6">
                You described your "{describedObject}" really well!
              </p>
              <button
                onClick={handleContinue}
                className="relative group cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 w-full"
              >
                <div className="relative">
                  {/* Button shadow */}
                  <div className="absolute top-2 left-0 right-0 h-12 bg-[#112C55] rounded-full" />
                  {/* Button body */}
                  <div className="relative bg-[hsl(var(--coral))] hover:bg-[hsl(22_73%_52%)] text-white font-fredoka font-bold text-2xl px-8 py-3 rounded-full shadow-lg transition-colors flex items-center justify-center gap-3">
                    Continue
                    {/* Bubble decoration */}
                    <div className="flex flex-col gap-0.5">
                      <div className="w-2 h-2 rounded-full bg-white/40" />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DescribeExercise;
