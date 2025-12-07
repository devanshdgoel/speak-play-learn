import { Play } from "lucide-react";

interface PlayButtonProps {
  onClick?: () => void;
}

const PlayButton = ({ onClick }: PlayButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="relative group animate-pulse-slow cursor-pointer"
      aria-label="Start playing"
    >
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-coral/30 blur-xl scale-150 group-hover:scale-175 transition-transform duration-300" />
      
      {/* Main button */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-coral to-coral-dark shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {/* Inner highlight */}
        <div className="absolute top-2 left-4 w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary-foreground/40" />
        <div className="absolute top-4 left-6 w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary-foreground/30" />
        
        {/* Play icon */}
        <Play 
          className="w-10 h-10 md:w-14 md:h-14 text-primary-foreground fill-primary-foreground ml-2" 
          strokeWidth={0}
        />
      </div>
    </button>
  );
};

export default PlayButton;
