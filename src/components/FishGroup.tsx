import fish from "@/assets/fish.svg";

interface FishGroupProps {
  className?: string;
}

const FishGroup = ({ className = "" }: FishGroupProps) => {
  // Different positions and speeds for each fish - staggered formation
  const fishData = [
    { delay: 0, speed: 4, offsetY: 0 },
    { delay: 0.3, speed: 5.5, offsetY: 12 },
    { delay: 0.1, speed: 3.5, offsetY: -8 },
    { delay: 0.5, speed: 6, offsetY: 18 },
    { delay: 0.2, speed: 4.5, offsetY: 5 },
  ];
  
  return (
    <div className={`relative w-48 h-20 ${className}`}>
      {fishData.map((f, i) => (
        <img 
          key={i} 
          src={fish} 
          alt="" 
          className="absolute w-10 h-5 md:w-12 md:h-6"
          style={{ 
            animation: `swim-across ${f.speed + 8}s linear infinite`,
            animationDelay: `${f.delay + i * 0.4}s`,
            top: `${30 + f.offsetY}%`,
            left: `${i * 18}%`,
          }}
        />
      ))}
    </div>
  );
};

export default FishGroup;
