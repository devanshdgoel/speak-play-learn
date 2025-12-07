import fish from "@/assets/fish.svg";

interface FishGroupProps {
  count?: number;
  className?: string;
}

const FishGroup = ({ count = 5, className = "" }: FishGroupProps) => {
  return (
    <div className={`flex gap-2 animate-swim-fast ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <img 
          key={i} 
          src={fish} 
          alt="" 
          className="w-6 h-3 md:w-8 md:h-4"
          style={{ 
            animationDelay: `${i * 0.1}s`,
            transform: `translateY(${i % 2 === 0 ? -2 : 2}px)`
          }}
        />
      ))}
    </div>
  );
};

export default FishGroup;
