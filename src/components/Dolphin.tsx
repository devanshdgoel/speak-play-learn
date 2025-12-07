import dolphin from "@/assets/dolphin.svg";

interface DolphinProps {
  className?: string;
}

const Dolphin = ({ className = "" }: DolphinProps) => {
  return (
    <div className={`animate-swim ${className}`}>
      <img 
        src={dolphin} 
        alt="Friendly dolphin mascot" 
        className="w-64 md:w-80 lg:w-96 h-auto drop-shadow-lg"
      />
    </div>
  );
};

export default Dolphin;
