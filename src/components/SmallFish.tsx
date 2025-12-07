interface SmallFishProps {
  className?: string;
  color?: "orange" | "yellow";
}

const SmallFish = ({ className = "", color = "orange" }: SmallFishProps) => {
  const fishColor = color === "orange" ? "hsl(var(--coral))" : "hsl(45 90% 55%)";
  
  return (
    <svg 
      width="24" 
      height="16" 
      viewBox="0 0 24 16" 
      fill="none" 
      className={`animate-swim ${className}`}
    >
      {/* Body */}
      <ellipse cx="10" cy="8" rx="8" ry="5" fill={fishColor} />
      {/* Tail */}
      <path d="M18 8L24 3V13L18 8Z" fill={fishColor} />
      {/* Eye */}
      <circle cx="6" cy="7" r="1.5" fill="white" />
      <circle cx="6" cy="7" r="0.8" fill="black" />
    </svg>
  );
};

export default SmallFish;
