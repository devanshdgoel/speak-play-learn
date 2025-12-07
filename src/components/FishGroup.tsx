import fish from "@/assets/fish.svg";

interface FishGroupProps {
  count?: number;
  className?: string;
}

const FishGroup = ({ count = 5, className = "" }: FishGroupProps) => {
  // Different animation speeds for each fish
  const speeds = [4, 5.5, 3.5, 6, 4.5];
  
  return (
    <div className={`flex gap-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <img 
          key={i} 
          src={fish} 
          alt="" 
          className="w-10 h-5 md:w-12 md:h-6"
          style={{ 
            animation: `swim-fast ${speeds[i % speeds.length]}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
            transform: `translateY(${i % 2 === 0 ? -3 : 3}px)`
          }}
        />
      ))}
    </div>
  );
};

export default FishGroup;
