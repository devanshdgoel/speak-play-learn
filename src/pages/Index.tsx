import { useNavigate } from "react-router-dom";
import OceanBackground from "@/components/OceanBackground";
import EloquaTitle from "@/components/EloquaTitle";
import Dolphin from "@/components/Dolphin";
import PlayButton from "@/components/PlayButton";
import FishGroup from "@/components/FishGroup";
import SmallFish from "@/components/SmallFish";

const Index = () => {
  const navigate = useNavigate();

  const handlePlay = () => {
    // Will navigate to game selection in future
    console.log("Starting Eloqua!");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center">
      {/* Ocean decorations */}
      <OceanBackground />
      
      {/* Fish school in top right */}
      <div className="absolute top-1/4 right-10 md:right-20">
        <FishGroup count={5} />
      </div>
      
      {/* Small accent fish */}
      <SmallFish 
        className="absolute top-1/2 right-1/4 opacity-80" 
        color="orange" 
      />
      <SmallFish 
        className="absolute top-2/3 left-1/3 opacity-70" 
        color="yellow" 
      />
      
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 py-8">
        {/* Title */}
        <div className="mb-8 md:mb-12 animate-float">
          <EloquaTitle />
        </div>
        
        {/* Dolphin mascot */}
        <div className="absolute left-0 md:left-10 lg:left-20 bottom-20 md:bottom-32">
          <Dolphin />
        </div>
        
        {/* Play button */}
        <div className="mt-16 md:mt-24">
          <PlayButton onClick={handlePlay} />
        </div>
      </main>
      
      {/* Bubbles decoration */}
      <div className="absolute bottom-40 left-1/4 animate-bubble">
        <div className="w-3 h-3 rounded-full bg-primary-foreground/30" />
      </div>
      <div className="absolute bottom-52 left-1/3 animate-bubble" style={{ animationDelay: '0.5s' }}>
        <div className="w-2 h-2 rounded-full bg-primary-foreground/20" />
      </div>
      <div className="absolute bottom-36 right-1/3 animate-bubble" style={{ animationDelay: '1s' }}>
        <div className="w-4 h-4 rounded-full bg-primary-foreground/25" />
      </div>
    </div>
  );
};

export default Index;
