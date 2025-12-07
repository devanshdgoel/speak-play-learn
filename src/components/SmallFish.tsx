interface SmallFishProps {
  className?: string;
  color?: "orange" | "yellow";
  speed?: number;
  size?: "small" | "medium" | "large";
}

const SmallFish = ({ className = "", color = "orange", speed = 8, size = "medium" }: SmallFishProps) => {
  const fishColor = color === "orange" ? "hsl(var(--coral))" : "hsl(45 90% 55%)";
  
  const sizeMap = {
    small: { width: 28, height: 18 },
    medium: { width: 36, height: 24 },
    large: { width: 48, height: 32 },
  };
  
  const { width, height } = sizeMap[size];
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 16" 
      fill="none" 
      className={className}
      style={{ animation: `swim-across ${speed}s linear infinite` }}
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
