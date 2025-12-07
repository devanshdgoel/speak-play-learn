import OceanBackground from "@/components/OceanBackground";
import EloquaTitle from "@/components/EloquaTitle";
import Dolphin from "@/components/Dolphin";
import PlayButton from "@/components/PlayButton";
import FishGroup from "@/components/FishGroup";
import SmallFish from "@/components/SmallFish";

const Index = () => {
  const handlePlay = () => {
    console.log("Starting Eloqua!");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center">
      {/* Ocean decorations */}
      <OceanBackground />
      
      {/* Fish school in top right - bigger and different speeds */}
      <div className="absolute top-1/4 right-16 md:right-24">
        <FishGroup count={5} />
      </div>
      
      {/* Small accent fish near center - different speeds */}
      <SmallFish 
        className="absolute top-[55%] right-[35%] opacity-90" 
        color="orange" 
        speed={6}
      />
      <SmallFish 
        className="absolute top-[62%] left-[40%] opacity-80" 
        color="yellow" 
        speed={10}
      />
      
      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 py-8">
        {/* Title - no animation */}
        <div className="mb-8 md:mb-12">
          <EloquaTitle />
        </div>
        
        {/* Play button */}
        <div className="mt-8 md:mt-12">
          <PlayButton onClick={handlePlay} />
        </div>
      </main>
      
      {/* Dolphin mascot - positioned bottom left */}
      <div className="absolute left-4 md:left-16 lg:left-24 bottom-16 md:bottom-24">
        <Dolphin />
      </div>
      
      {/* Bubbles decoration near play button */}
      <div className="absolute top-[52%] left-[48%] animate-bubble">
        <div className="w-3 h-3 rounded-full bg-primary-foreground/30" />
      </div>
      <div className="absolute top-[48%] left-[52%] animate-bubble" style={{ animationDelay: '0.5s' }}>
        <div className="w-2 h-2 rounded-full bg-primary-foreground/20" />
      </div>
    </div>
  );
};

export default Index;
