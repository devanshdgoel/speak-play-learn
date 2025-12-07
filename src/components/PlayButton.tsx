import playButton from "@/assets/play-button.svg";

interface PlayButtonProps {
  onClick?: () => void;
}

const PlayButton = ({ onClick }: PlayButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="relative group cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
      aria-label="Start playing"
    >
      <img 
        src={playButton} 
        alt="Play" 
        className="w-24 h-24 md:w-32 md:h-32 drop-shadow-lg"
      />
    </button>
  );
};

export default PlayButton;
